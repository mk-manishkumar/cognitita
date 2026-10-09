import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { colorDot, markdownExcerpt } from "../lib/notes.js";

export function NoteCard({ note, onOpen }) {
  return (
    <Link to={`/note/${note.id}`} onClick={(event) => { event.preventDefault(); onOpen(note); }} className="group flex min-h-47.5 flex-col rounded-lg border border-[#eaeae4] bg-white p-3.5 text-left transition hover:-translate-y-0.5 hover:border-[#dddfd6] hover:shadow-lg hover:shadow-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82947b]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f8f5] px-2 py-1 text-[9px] text-[#85897f]">
          <i className={`size-1.5 rounded-full ${colorDot[note.color] || colorDot.sage}`} />
          {note.subject}
        </span>
        <FileText size={15} className="text-[#acafa7]" />
      </div>
      <h3 className="mb-1 mt-3 font-serif text-lg font-medium text-[#3e423b]">{note.title || "Untitled note"}</h3>
      <p className="line-clamp-3 whitespace-pre-line text-[10px] leading-relaxed text-[#92958c]">{markdownExcerpt(note.body) || "A blank page, ready when you are."}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#f1f1ec] pt-3 text-[9px] text-[#adb0a7]">
        <span>Markdown file</span>
        <span className="flex items-center gap-1 font-semibold text-[#82917d]">
          Read note <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
