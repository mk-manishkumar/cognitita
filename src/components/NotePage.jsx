import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock3, PencilLine } from "lucide-react";
import { topics } from "../data/curriculum.js";
import { dateLabel } from "../lib/notes.js";

const MarkdownContent = lazy(() => import("./MarkdownContent.jsx").then(module => ({ default: module.MarkdownContent })));

export function NotePage({ notes, onEdit }) {
  const { noteId } = useParams();
  const note = notes.find(item => item.id === noteId);
  if (!note) return <div className="mx-auto max-w-2xl px-6 py-20 text-center"><h1 className="font-serif text-3xl text-[#30352e]">This note isn’t here.</h1><Link to="/notes" className="mt-5 inline-flex items-center gap-2 text-sm text-[#63795f]"><ArrowLeft size={15}/>Back to all notes</Link></div>;
  const topic = topics.find(item => item.name === note.subject);
  const backTo = topic?.path || "/notes";
  const wordCount = note.body.trim().split(/\s+/).filter(Boolean).length;
  return <article className="mx-auto max-w-[900px] px-5 pb-20 pt-8 sm:px-10 sm:pt-11">
    <div className="mb-9 flex flex-wrap items-center gap-2 text-[10px] text-[#969a90]"><Link to="/" className="hover:text-[#526650]">Subjects</Link><span>/</span>{topic?<><Link to="/computer-science" className="hover:text-[#526650]">Computer Science</Link><span>/</span><Link to={topic.path} className="hover:text-[#526650]">{topic.name}</Link></>:<Link to="/notes" className="hover:text-[#526650]">All notes</Link>}<span>/</span><span className="max-w-[230px] truncate text-[#5d6658]">{note.title}</span></div>
    <div className="mb-8 flex items-start justify-between gap-4"><Link to={backTo} className="inline-flex items-center gap-2 rounded-md py-2 text-[10px] text-[#7e8579] hover:text-[#4e604b]"><ArrowLeft size={15}/>Back to {topic?.name || "all notes"}</Link><button onClick={()=>onEdit(note)} className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#e4e8df] bg-white px-3 text-[10px] font-semibold text-[#65745f] transition hover:bg-[#f5f7f2]"><PencilLine size={14}/>Edit note</button></div>
    <header className="border-b border-[#e8ebe4] pb-7"><span className="inline-flex items-center gap-2 rounded-full bg-[#eef2e9] px-3 py-1.5 text-[10px] font-medium text-[#66745f]"><i className="size-1.5 rounded-full bg-[#82947b]"/>{note.subject}</span><h1 className="mt-5 break-words font-serif text-[38px] leading-[1.08] tracking-[-1.4px] text-[#30352e] sm:text-[48px]">{note.title}</h1><div className="mt-4 flex items-center gap-4 text-[10px] text-[#9a9e94]"><span className="flex items-center gap-1.5"><Clock3 size={13}/>Edited {dateLabel(note.updatedAt)}</span><span>{wordCount.toLocaleString()} words</span></div></header>
    <div className="mt-5 rounded-2xl border border-[#eceee8] bg-white px-5 py-5 shadow-sm shadow-[#313b30]/[0.025] sm:px-9 sm:py-8"><Suspense fallback={<p className="text-xs text-[#8b9086]">Opening your note…</p>}><MarkdownContent content={note.body}/></Suspense></div>
    <div className="mt-5 flex justify-end"><Link to={backTo} className="inline-flex items-center gap-2 text-[10px] font-medium text-[#7c8976] hover:text-[#526650]">Back to {topic?.name || "all notes"}<ArrowUpRight size={13}/></Link></div>
  </article>;
}
