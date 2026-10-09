import { lazy, Suspense, useState } from "react";
import { ArrowDown, ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
import { colorDot } from "../lib/notes.js";

// Keep the Markdown renderer out of the initial bundle until a note is revealed.
const MarkdownContent = lazy(() => import("./MarkdownContent.jsx").then((module) => ({ default: module.MarkdownContent })));

// Component for displaying the end of a revision session.
function SessionEnd({ hasNotes, onRestart }) {
  const status = hasNotes ? "Revision session complete" : "Your Markdown library is empty";
  const description = hasNotes ? "Your progress is session-only. Notes are read directly from the Markdown files in your project." : "Add a Markdown file under src/data/Computer Science to see it here.";

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-162.5 flex-col items-center justify-center px-5 text-center">
      <span className="mb-4 text-3xl text-[#96a58a]">✳</span>
      <p className="text-[10px] text-[#8b8e84]">{status}</p>
      <h1 className="my-5 font-serif text-[42px] leading-none text-[#30332e]">
        {hasNotes ? (
          <>
            That’s enough
            <br />
            for <em className="text-[#788b73]">today.</em>
          </>
        ) : (
          <>
            A fresh page
            <br />
            for <em className="text-[#788b73]">learning.</em>
          </>
        )}
      </h1>
      <p className="mb-5 max-w-sm text-xs leading-relaxed text-[#898c83]">{description}</p>
      {hasNotes && (
        <button onClick={onRestart} className="flex h-9.5 items-center gap-2 rounded-md border border-[#e7e8e1] bg-white px-3.5 text-[11px] font-semibold text-[#65745f]">
          <RotateCcw size={15} />
          Review again
        </button>
      )}
    </div>
  );
}

export function Review({ notes, onOpen }) {
  // This tracks only the current browser session; Markdown files remain the source of truth.
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const note = notes[index];

  const restart = () => {
    setIndex(0);
    setRevealed(false);
  };

  const advance = () => {
    setIndex(index + 1);
    setRevealed(false);
  };

  if (!note) return <SessionEnd hasNotes={notes.length > 0} onRestart={restart} />;

  const isLastNote = index === notes.length - 1;
  const progress = `${((index + 1) / notes.length) * 100}%`;

  return (
    <div className="mx-auto w-full max-w-165 px-5 pb-10 pt-8 sm:pt-10">
      <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
        <i aria-hidden="true" className="size-1.5 rounded-full bg-[#82947b]" />
        <span>A quiet minute for your memory</span>
      </p>

      <h1 className="mb-6 mt-4 font-serif text-[40px] leading-[.98] tracking-[-1.5px] text-[#30332e] sm:text-[46px]">
        Let’s bring it
        <br />
        <em className="text-[#788b73]">back to mind.</em>
      </h1>

      <div className="mb-2 flex justify-between text-[10px] text-[#96998f]">
        <span>Revision session</span>
        <b className="text-[#62695d]">
          {index + 1} <i className="mx-1 text-[#c0c2bb]">/</i> {notes.length}
        </b>
      </div>
      <div className="mb-5 h-0.75 rounded bg-[#e9ebe4]">
        <span className="block h-0.75 rounded bg-[#82947b] transition-all" style={{ width: progress }} />
      </div>

      <section className="flex min-h-65 flex-col rounded-[11px] border border-[#e9eae4] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f8f5] px-2 py-1 text-[9px] text-[#85897f]">
            <i className={`size-1.5 rounded-full ${colorDot[note.color] || colorDot.sage}`} />
            {note.subject}
          </span>
          <span className="text-[8px] tracking-[1.2px] text-[#b1b3ab]">NOTE {String(index + 1).padStart(2, "0")}</span>
        </div>

        <h2 className="mb-2 mt-6 font-serif text-[27px] text-[#3e423b]">{note.title}</h2>
        {revealed ? (
          <div className="mb-3 max-h-77.5 overflow-y-auto text-[11px]">
            <Suspense fallback={<p>Opening your note…</p>}>
              <MarkdownContent content={note.body} />
            </Suspense>
          </div>
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

        {revealed && (
          <button onClick={() => onOpen(note)} className="mt-auto flex items-center gap-1 self-end pt-3 text-[9px] font-semibold text-[#758570]">
            Open full note <ArrowUpRight size={13} />
          </button>
        )}
      </section>

      {revealed ? (
        <button onClick={advance} className="mx-auto mt-3 flex h-9.5 items-center gap-2 rounded-md bg-[#526650] px-4 text-[10px] font-semibold text-white">
          {isLastNote ? "Finish session" : "Next note"}
          <ArrowDown size={15} />
        </button>
      ) : (
        <button onClick={() => setRevealed(true)} className="mx-auto mt-3 flex h-9.5 items-center gap-2 rounded-md border border-[#e7e8e1] bg-white px-4 text-[10px] font-semibold text-[#70786b]">
          Show me the note <ArrowDown size={15} />
        </button>
      )}

      <p className="mt-5 flex items-center justify-center gap-1.5 text-[9px] text-[#aaada4]">
        <span className="text-[13px] text-[#a7b294]">✳</span>{" "}
        Learning takes time. You’re doing just fine.
      </p>
    </div>
  );
}
