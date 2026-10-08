import { useState } from 'react'
import { Archive, ArrowDown, Plus, Search } from 'lucide-react'
import { EmptyState } from './EmptyState.jsx'
import { NoteCard } from './NoteCard.jsx'

export function Library({ notes, total, query, setQuery, onNew, onOpen, onRemove, menu, setMenu, showHeading = true, showFilters = true }) {
  const [active, setActive] = useState("Everything");
  const subjects = ["Everything", ...new Set(notes.map((note) => note.subject))];
  const visible = active === "Everything" ? notes : notes.filter((note) => note.subject === active);
  return (
    <div className="mx-auto max-w-[1060px] px-4 pb-8 pt-8 sm:px-8 sm:pt-10 lg:px-11">
      {showHeading && <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
            <i className="size-1.5 rounded-full bg-[#82947b]" />A home for your ideas
          </p>
          <h1 className="mt-3 font-serif text-[39px] tracking-[-1.5px] text-[#30332e]">
            Your <em className="text-[#788b73]">library.</em>
          </h1>
          <p className="mt-2 text-xs text-[#898c83]">Every thought worth keeping, all in one place.</p>
        </div>
        <button onClick={onNew} className="flex h-[38px] items-center gap-2 rounded-md bg-[#526650] px-3 text-[11px] font-semibold text-white">
          <Plus size={17} />
          New note
        </button>
      </div>}
      {showFilters && <div className="mb-4 flex flex-col gap-2 border-b border-[#e7e8e1] pb-3">
        <div className="flex flex-wrap gap-1">
          {subjects.map((subject) => (
            <button key={subject} onClick={() => setActive(subject)} className={`h-7 rounded-md px-2.5 text-[10px] ${active === subject ? "bg-[#e9eee6] font-semibold text-[#566a53]" : "text-[#95988f]"}`}>
              {subject}
              {subject === "Everything" && <span className="ml-1.5 text-[#8a9584]">{total}</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-[9px] text-[#a0a299]">
          <span className="flex items-center gap-1">
            <Archive size={14} />
            {visible.length} notes
          </span>
          <span className="flex items-center gap-1 text-[#85887f]">
            <ArrowDown size={13} />
            Recently edited
          </span>
        </div>
      </div>}
      {visible.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((note) => (
            <NoteCard key={note.id} note={note} onOpen={onOpen} onRemove={onRemove} menu={menu} setMenu={setMenu} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <span className="mb-3 grid size-[42px] place-items-center rounded-xl bg-[#edf1e9] text-[#74866c]">
            <Search size={20} />
          </span>
          <h3 className="font-serif text-[22px]">{query ? "Nothing found just yet" : "A fresh page"}</h3>
          <p className="mb-4 mt-1 max-w-xs text-[11px] leading-relaxed text-[#969990]">{query ? "Try another word or browse all of your notes." : "Save the little things you want to remember later."}</p>
          <button
            onClick={
              query
                ? () => {
                    setQuery("");
                    setActive("Everything");
                  }
                : onNew
            }
            className="flex h-9 items-center gap-2 rounded-md border border-[#e7e9e1] bg-white px-3 text-[10px] font-semibold text-[#697562]"
          >
            {query ? (
              "Clear search"
            ) : (
              <>
                <Plus size={15} />
                Write a note
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
