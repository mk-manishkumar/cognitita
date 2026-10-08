import { ArrowUpRight, MoreHorizontal, Trash2 } from 'lucide-react'
import { colorDot, dateLabel, markdownExcerpt } from '../lib/notes.js'

export function NoteCard({ note, onOpen, onRemove, menu, setMenu }) {
  return (
    <article onClick={() => onOpen(note)} className="group flex min-h-[190px] cursor-pointer flex-col rounded-lg border border-[#eaeae4] bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-[#dddfd6] hover:shadow-lg hover:shadow-black/5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f8f5] px-2 py-1 text-[9px] text-[#85897f]">
          <i className={`size-1.5 rounded-full ${colorDot[note.color] || colorDot.sage}`} />
          {note.subject}
        </span>
        <div className="relative">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setMenu(menu === note.id ? null : note.id);
            }}
            aria-label="Note options"
            className="grid size-6 place-items-center rounded-md text-[#acafa7] hover:bg-[#f5f6f2]"
          >
            <MoreHorizontal size={18} />
          </button>
          {menu === note.id && (
            <div className="absolute right-0 top-6 z-10 w-32 rounded-lg border border-[#e9eae4] bg-white p-1 shadow-xl">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMenu(null);
                  onOpen(note);
                }}
                className="w-full rounded px-2 py-2 text-left text-[10px] text-[#6f736b] hover:bg-[#f6f7f3]"
              >
                Open note
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(note.id);
                }}
                className="flex w-full items-center gap-1.5 rounded px-2 py-2 text-left text-[10px] text-[#b05f53] hover:bg-[#f6f7f3]"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <h3 className="mb-1 mt-3 font-serif text-lg font-medium text-[#3e423b]">{note.title || "Untitled note"}</h3>
      <p className="line-clamp-3 whitespace-pre-line text-[10px] leading-relaxed text-[#92958c]">{markdownExcerpt(note.body) || "A blank page, ready when you are."}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#f1f1ec] pt-3 text-[9px] text-[#adb0a7]">
        <span>Edited {dateLabel(note.updatedAt)}</span>
        <span className="flex items-center gap-1 font-semibold text-[#82917d]">
          Read note <ArrowUpRight size={13} />
        </span>
      </div>
    </article>
  );
}
