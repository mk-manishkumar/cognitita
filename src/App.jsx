import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { ensureChapterOne, getNotes, KEY, day } from "./lib/notes.js";
import { findTopic, topics } from "./data/curriculum.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { AppHeader } from "./components/AppHeader.jsx";
import { SubjectHome, ComputerScience } from "./components/Curriculum.jsx";
import { TopicPage } from "./components/TopicPage.jsx";
import { NotePage } from "./components/NotePage.jsx";
import { Library } from "./components/Library.jsx";
import { Review } from "./components/Review.jsx";
import { Settings } from "./components/Settings.jsx";
import { Editor } from "./components/Editor.jsx";

export default function App() {
  const [notes, setNotes] = useState(getNotes);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [newSubject, setNewSubject] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [menu, setMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const due = useMemo(() => notes.filter((note) => new Date(note.dueAt).getTime() <= Date.now()), [notes]);
  const page = location.pathname.split("/")[1] || "home";

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    const normalized = ensureChapterOne(notes);
    if (normalized.length !== notes.length || normalized.some((note, index) => note.id !== notes[index]?.id)) setNotes(normalized);
  }, [notes]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);
  const newNote = (subject = topics[0].name) => {
    setEditing(null);
    setNewSubject(subject);
    setEditorOpen(true);
  };
  const editNote = (note) => {
    setEditing(note);
    setEditorOpen(true);
  };
  const openNote = (note) => navigate(`/note/${note.id}`);
  const saveNote = (draft) => {
    if (editing) {
      setNotes((current) => current.map((note) => (note.id === editing.id ? { ...note, ...draft, updatedAt: new Date().toISOString() } : note)));
      setToast("Note saved");
    } else {
      const now = new Date().toISOString();
      setNotes((current) => [...current, { id: crypto.randomUUID(), ...draft, subject: draft.subject || newSubject || "Unsorted", createdAt: now, updatedAt: now, dueAt: now, interval: 1, reps: 0 }]);
      setToast("Note added to your library");
    }
    setEditorOpen(false);
    setEditing(null);
  };
  const removeNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id));
    setMenu(null);
    setToast("Note moved out of your library");
  };
  const rateNote = (note, rating) => {
    const interval = rating === "again" ? 1 : rating === "got" ? Math.max(2, note.interval * 2) : Math.max(4, note.interval * 3);
    setNotes((current) => current.map((item) => (item.id === note.id ? { ...item, interval, reps: item.reps + 1, dueAt: new Date(Date.now() + interval * day).toISOString(), updatedAt: new Date().toISOString() } : item)));
    setToast(rating === "again" ? "We’ll bring this back tomorrow" : `Next review in ${interval} days`);
  };
  const filtered = notes.filter((note) => `${note.title} ${note.body} ${note.subject}`.toLowerCase().includes(query.toLowerCase()));
  const topic = page === "computer-science" ? findTopic(location.pathname.split("/")[2]) : null;
  const pageName = location.pathname === "/" ? "Your subjects" : location.pathname === "/computer-science" ? "Computer Science" : topic?.name || ({ notes: "All notes", review: "Review queue", settings: "Settings", note: "Note" }[page] || "Your subjects");

  return (
    <div className="min-h-screen bg-[#f7f7f4] font-sans text-[#292b27]">
      <Sidebar notes={notes} due={due} onNew={newNote}/>
      <main className="ml-[68px] min-h-screen sm:ml-[220px] lg:ml-[244px]">
        <AppHeader page={pageName} query={query} onQueryChange={setQuery}/>
        <Routes>
          <Route path="/" element={<SubjectHome notes={notes}/>} />
          <Route path="/computer-science" element={<ComputerScience notes={notes}/>} />
          <Route path="/computer-science/:topic" element={<TopicPage notes={notes} query={query} setQuery={setQuery} onNew={newNote} onOpen={openNote} onRemove={removeNote} menu={menu} setMenu={setMenu}/>} />
          <Route path="/note/:noteId" element={<NotePage notes={notes} onEdit={editNote}/>} />
          <Route path="/notes" element={<Library notes={filtered} total={notes.length} query={query} setQuery={setQuery} onNew={newNote} onOpen={openNote} onRemove={removeNote} menu={menu} setMenu={setMenu} />} />
          <Route path="/review" element={<Review notes={due} onRate={rateNote} onEdit={editNote} onNew={newNote} />} />
          <Route
            path="/settings"
            element={
              <Settings
                notes={notes}
                onImport={(items) => {
                  setNotes(items);
                  setToast("Your notes are ready");
                }}
              />
            }
          />
          <Route path="*" element={<SubjectHome notes={notes}/>} />
        </Routes>
      </main>
      {editorOpen && (
        <Editor
          note={editing}
          defaultSubject={newSubject}
          onClose={() => {
            setEditorOpen(false);
            setEditing(null);
          }}
          onSave={saveNote}
        />
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-[#313b30] px-3.5 py-2.5 text-[10px] text-white shadow-xl sm:left-[calc(50%+122px)]">
          <span className="grid size-[18px] place-items-center rounded-full bg-[#71876c]">
            <Check size={14} />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}
