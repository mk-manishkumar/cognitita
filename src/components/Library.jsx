import { useState } from "react";
import { Archive, ArrowDown, Search } from "lucide-react";
import { NoteCard } from "./NoteCard.jsx";

export function Library({ notes, total, query, setQuery, onOpen, showHeading = true, showFilters = true }) {
  const [active, setActive] = useState("Everything");
  const subjects = ["Everything", ...new Set(notes.map((note) => note.subject))];
  const visible = active === "Everything" ? notes : notes.filter((note) => note.subject === active);
  const noteLabel = notes.length === 1 ? "note" : "notes";
  const headingDescription = query ? `${notes.length} matching ${noteLabel} across all subjects.` : "Every thought worth keeping, all in one place.";

  return (
    <div className="mx-auto max-w-265 px-4 pb-8 pt-8 sm:px-8 sm:pt-10 lg:px-11">
      {showHeading && (
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
              <i className="size-1.5 rounded-full bg-[#82947b]" />A home for your ideas
            </p>
            <h1 className="mt-3 font-serif text-[39px] tracking-[-1.5px] text-[#30332e]">
              {query ? (
                <>
                  Search <em className="text-[#788b73]">results.</em>
                </>
              ) : (
                <>
                  Your <em className="text-[#788b73]">library.</em>
                </>
              )}
            </h1>
            <p className="mt-2 text-xs text-[#898c83]">{headingDescription}</p>
          </div>
        </div>
      )}
      {showFilters && (
        <div className="mb-4 flex flex-col gap-2 border-b border-[#e7e8e1] pb-3">
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
              Chapter order
            </span>
          </div>
        </div>
      )}
      {visible.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((note) => (
            <NoteCard key={note.id} note={note} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-75 flex-col items-center justify-center text-center">
          <span className="mb-3 grid size-10.5 place-items-center rounded-xl bg-[#edf1e9] text-[#74866c]">
            <Search size={20} />
          </span>
          <h3 className="font-serif text-[22px]">{query ? "Nothing found just yet" : "A fresh page"}</h3>
          <p className="mb-4 mt-1 max-w-xs text-[11px] leading-relaxed text-[#969990]">{query ? "Try another word or clear your search." : "Add Markdown files to the matching folder in src/data to see them here."}</p>
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setActive("Everything");
              }}
              className="flex h-9 items-center gap-2 rounded-md border border-[#e7e9e1] bg-white px-3 text-[10px] font-semibold text-[#697562]"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
