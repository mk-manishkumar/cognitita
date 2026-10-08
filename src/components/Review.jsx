import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Plus, Sparkles } from 'lucide-react'
import { colorDot } from '../lib/notes.js'
const MarkdownContent = lazy(() => import('./MarkdownContent.jsx').then(module => ({ default: module.MarkdownContent })))

export function Review({ notes, onRate, onEdit, onNew }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [notes.length]);
  const advance = () => {
    if (index < notes.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    } else setIndex(notes.length);
  };
  const note = notes[index];
  if (!note)
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-[650px] flex-col items-center justify-center px-5 text-center">
        <span className="mb-4 text-3xl text-[#96a58a]">✳</span>
        <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
          <i className="size-1.5 rounded-full bg-[#82947b]" />
          You’re all caught up
        </p>
        <h1 className="my-5 font-serif text-[42px] leading-none text-[#30332e]">
          That’s enough
          <br />
          for <em className="text-[#788b73]">today.</em>
        </h1>
        <p className="mb-5 text-xs leading-relaxed text-[#898c83]">
          Give your brain a little room to breathe.
          <br />
          You can come back whenever you like.
        </p>
        <button onClick={onNew} className="flex h-[38px] items-center gap-2 rounded-md bg-[#526650] px-3.5 text-[11px] font-semibold text-white">
          <Plus size={16} />
          Add a new note
        </button>
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-[660px] px-5 pb-10 pt-8 sm:pt-10">
      <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
        <i className="size-1.5 rounded-full bg-[#82947b]" />A quiet minute for your memory
      </p>
      <h1 className="mb-6 mt-4 font-serif text-[40px] leading-[.98] tracking-[-1.5px] text-[#30332e] sm:text-[46px]">
        Let’s bring it
        <br />
        <em className="text-[#788b73]">back to mind.</em>
      </h1>
      <div className="mb-2 flex justify-between text-[10px] text-[#96998f]">
        <span>Today’s session</span>
        <b className="text-[#62695d]">
          {Math.min(index + 1, notes.length)} <i className="mx-1 text-[#c0c2bb]">/</i> {notes.length}
        </b>
      </div>
      <div className="mb-5 h-[3px] rounded bg-[#e9ebe4]">
        <span className="block h-[3px] rounded bg-[#82947b] transition-all" style={{ width: `${Math.max(6, (index / notes.length) * 100)}%` }} />
      </div>
      <section className="flex min-h-[260px] flex-col rounded-[11px] border border-[#e9eae4] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f8f5] px-2 py-1 text-[9px] text-[#85897f]">
            <i className={`size-1.5 rounded-full ${colorDot[note.color] || colorDot.sage}`} />
            {note.subject}
          </span>
          <span className="text-[8px] tracking-[1.2px] text-[#b1b3ab]">NOTE {String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2 className="mb-2 mt-6 font-serif text-[27px] text-[#3e423b]">{note.title}</h2>
        {flipped ? (
          <div className="mb-3 max-h-[310px] overflow-y-auto text-[11px]"><Suspense fallback={<p>Opening your note…</p>}><MarkdownContent content={note.body}/></Suspense></div>
        ) : (
          <div className="m-auto py-4 text-center">
            <Sparkles size={17} className="mx-auto mb-2 text-[#9ca98e]" />
            <p className="font-serif text-[19px] leading-snug text-[#888d82]">
              Take a breath.
              <br />
              <b className="font-medium text-[#596452]">What can you remember?</b>
            </p>
            <span className="mt-2 block text-[9px] text-[#b0b2aa]">Say it out loud, or just think it through.</span>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-[#f0f0eb] pt-3 text-[9px] text-[#a5a79f]">
          {flipped ? (
            <>
              <span>How well did that come back?</span>
              <button onClick={() => onEdit(note)} className="flex items-center gap-1 font-semibold text-[#758570]">
                Edit note <ArrowUpRight size={13} />
              </button>
            </>
          ) : (
            <span>Give yourself a moment before revealing</span>
          )}
        </div>
      </section>
      {flipped ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Rating
            label="Again"
            hint="Tomorrow"
            onClick={() => {
              onRate(note, "again");
              advance();
            }}
          />
          <Rating
            label="Got it"
            hint={`${Math.max(2, note.interval * 2)} days`}
            onClick={() => {
              onRate(note, "got");
              advance();
            }}
          />
          <Rating
            label="Easy"
            hint={`${Math.max(4, note.interval * 3)} days`}
            onClick={() => {
              onRate(note, "easy");
              advance();
            }}
          />
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} className="mx-auto mt-3 flex h-[38px] items-center gap-2 rounded-md border border-[#e7e8e1] bg-white px-4 text-[10px] font-semibold text-[#70786b]">
          Show me the note <ArrowDown size={15} />
        </button>
      )}
      <p className="mt-5 flex items-center justify-center gap-1.5 text-[9px] text-[#aaada4]">
        <span className="text-[13px] text-[#a7b294]">✳</span>Learning takes time. You’re doing just fine.
      </p>
    </div>
  );
}

function Rating({ label, hint, onClick }) {
  return <button onClick={onClick} className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-md border border-[#e8e9e3] bg-white hover:bg-[#f7f8f5]"><span className="text-[10px] font-semibold text-[#6c7067]">{label}</span><small className="text-[8px] text-[#a2a49c]">{hint}</small></button>
}
