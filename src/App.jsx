import { useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getNotes } from "./lib/notes.js";
import { findTopic } from "./data/curriculum.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { AppHeader } from "./components/AppHeader.jsx";
import { TopicPage } from "./components/TopicPage.jsx";
import { NotePage } from "./components/NotePage.jsx";
import { Library } from "./components/Library.jsx";
import { Review } from "./components/Review.jsx";
import { SubjectHome } from "./components/childcomponent/SubjectHome.jsx";
import { ComputerScience } from "./components/childcomponent/ComputerScience.jsx";

export default function App() {
  const notes = useMemo(getNotes, []);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname.split("/")[1] || "home";

  // The openNote function is used to navigate to a specific note page when a note is selected from the library or review queue. It resets the search query and navigates to the note's detail page using its unique ID.
  const openNote = (note) => {
    setQuery("");
    void navigate(`/note/${note.id}`);
  };

  // The filtered variable holds the notes that match the current search query. It filters the notes array by checking if the note's title, body, or subject includes the search term (case-insensitive). The topic variable is determined based on the current path, specifically for the "computer-science" page, by extracting the topic ID from the URL and finding the corresponding topic in the curriculum. The pageName variable is set based on the current page or topic, with special handling for search results and specific pages like "computer-science".
  const filtered = notes.filter((note) => `${note.title} ${note.body} ${note.subject}`.toLowerCase().includes(query.toLowerCase()));

  // The topic variable is determined based on the current path, specifically for the "computer-science" page, by extracting the topic ID from the URL and finding the corresponding topic in the curriculum. The pageName variable is set based on the current page or topic, with special handling for search results and specific pages like "computer-science".
  const topic = page === "computer-science" ? findTopic(location.pathname.split("/")[2]) : null;

  // The pageName variable is set based on the current page or topic, with special handling for search results and specific pages like "computer-science". It uses a mapping of page labels to determine the appropriate name to display in the header. If a search query is present, it overrides the page name to indicate that search results are being shown.
  const pageLabels = { notes: "All notes", review: "Review queue", note: "Note" };
  let pageName = pageLabels[page] || "Your subjects";
  if (location.pathname === "/computer-science") pageName = "Computer Science";
  else if (topic) pageName = topic.name;
  if (query.trim()) pageName = "Search results";

  return (
    <div className="min-h-screen bg-[#f7f7f4] font-sans text-[#292b27]">
      <Sidebar notes={notes}/>
      <main className="ml-17 min-h-screen sm:ml-55 lg:ml-61">
        <AppHeader page={pageName} query={query} onQueryChange={setQuery}/>
        {query.trim() ? (
          <Library notes={filtered} total={filtered.length} query={query} setQuery={setQuery} onOpen={openNote}/>
        ) : (
          <Routes>
            <Route path="/" element={<SubjectHome notes={notes}/>} />
            <Route path="/computer-science" element={<ComputerScience notes={notes}/>} />
            <Route path="/computer-science/:topic" element={<TopicPage notes={notes} query={query} setQuery={setQuery} onOpen={openNote}/>} />
            <Route path="/note/:noteId" element={<NotePage notes={notes}/>} />
            <Route path="/notes" element={<Library notes={filtered} total={notes.length} query={query} setQuery={setQuery} onOpen={openNote}/>} />
            <Route path="/review" element={<Review notes={notes} onOpen={openNote}/>} />
            <Route path="*" element={<SubjectHome notes={notes}/>} />
          </Routes>
        )}
      </main>
    </div>
  );
}
