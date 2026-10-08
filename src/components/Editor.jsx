import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowLeft, Check, Eye, Pencil, Tag } from "lucide-react";
import { colorDot } from "../lib/notes.js";
const MarkdownContent = lazy(() => import("./MarkdownContent.jsx").then(module => ({ default: module.MarkdownContent })));

export function Editor({ note, defaultSubject = "", onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [subject, setSubject] = useState(note?.subject || defaultSubject);
  const [color, setColor] = useState(note?.color || "sage");
  const [mode, setMode] = useState(note ? "preview" : "edit");

  const finish = () => {
    if (!title.trim() && !body.trim()) return onClose();
    onSave({ title: title.trim() || "Untitled note", body, subject: subject.trim() || defaultSubject || "DSA", color });
  };

  useEffect(() => {
    const keydown = event => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        document.getElementById("finish-note")?.click();
      }
      if (event.key === "Escape") document.getElementById("finish-note")?.click();
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  return <div onMouseDown={event => { if (event.target === event.currentTarget) finish(); }} className="fixed inset-0 z-40 flex justify-end bg-[#252a24]/55 backdrop-blur-[2px]">
    <section className="flex h-full w-full flex-col bg-[#fbfbf8] shadow-2xl sm:max-w-[720px]">
      <header className="flex h-[59px] shrink-0 items-center gap-4 border-b border-[#e9eae4] px-4 sm:px-6">
        <button onClick={finish} className="flex items-center gap-2 text-[10px] text-[#757a70] hover:text-[#4e604b]"><ArrowLeft size={16}/>Back to your notes</button>
        <button id="finish-note" onClick={finish} disabled={!title.trim()&&!body.trim()} className="ml-auto flex h-8 items-center gap-2 rounded-md bg-[#526650] px-3 text-[10px] font-semibold text-white hover:bg-[#425440] disabled:cursor-not-allowed disabled:opacity-50"><Check size={15}/>Done</button>
      </header>
      <div className="mx-auto flex w-full max-w-[620px] min-h-0 flex-1 flex-col px-5 pb-7 pt-7 sm:px-8 sm:pt-9">
        <p className="mb-4 flex shrink-0 items-center gap-2 text-[8px] font-semibold tracking-[1.1px] text-[#91958a]"><i className="size-1.5 rounded-full bg-[#82947b]"/>{note ? "YOUR NOTE" : "A NEW NOTE"}<span className="text-[#c8cac2]">·</span><span>Just for you</span></p>
        {mode === "edit" ? <input value={title} onChange={event=>setTitle(event.target.value)} autoFocus placeholder="Give this note a name…" className="mb-4 w-full shrink-0 border-0 bg-transparent font-serif text-3xl leading-tight tracking-[-1px] text-[#353a33] outline-none placeholder:text-[#d0d2ca] sm:text-[38px]"/> : <h1 className="mb-4 w-full shrink-0 break-words font-serif text-3xl leading-tight tracking-[-1px] text-[#353a33] sm:text-[38px]">{title || "Untitled note"}</h1>}
        <div className="flex shrink-0 items-center justify-between gap-3">
          {mode === "edit" ? <label className="flex min-w-0 items-center gap-2 text-[#a2a59b]"><Tag size={14}/><input value={subject} onChange={event=>setSubject(event.target.value)} placeholder="Add a subject" className="w-[180px] bg-transparent text-[11px] text-[#71776c] outline-none placeholder:text-[#afb2aa]"/></label> : <span className="flex items-center gap-2 rounded-full bg-[#f1f4ee] px-3 py-1.5 text-[10px] text-[#66735f]"><Tag size={13}/>{subject || defaultSubject || "Unsorted"}</span>}
          {mode === "edit" && <div className="flex items-center gap-2">{Object.keys(colorDot).map(item=><button key={item} aria-label={`${item} note color`} onClick={()=>setColor(item)} className={`size-[13px] rounded-full ${colorDot[item]} ${color===item?"outline outline-1 outline-offset-2 outline-[#667960]":""}`}/>)}</div>}
        </div>
        <div className="my-5 h-px shrink-0 bg-[#e9eae4]"/>
        <div className="mb-3 flex shrink-0 items-center justify-between"><span className="text-[9px] font-semibold uppercase tracking-[1.2px] text-[#a0a398]">Note content</span><div className="flex items-center rounded-lg border border-[#e8eae3] bg-white p-0.5"><button onClick={()=>setMode("preview")} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[9px] font-medium ${mode==="preview"?"bg-[#edf2e9] text-[#526650]":"text-[#969a90] hover:text-[#596452]"}`}><Eye size={12}/>Read</button><button onClick={()=>setMode("edit")} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[9px] font-medium ${mode==="edit"?"bg-[#edf2e9] text-[#526650]":"text-[#969a90] hover:text-[#596452]"}`}><Pencil size={12}/>Edit</button></div></div>
        {mode === "edit" ? <textarea value={body} onChange={event=>setBody(event.target.value)} placeholder="Write your note here…" className="min-h-0 flex-1 resize-none rounded-xl border border-[#e8eae3] bg-white px-4 py-3 text-xs leading-[1.9] text-[#666b62] outline-none placeholder:text-[#b1b3aa] focus:border-[#cbd5c4]"/> : <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-[#eeefe9] bg-white px-5 py-4 sm:px-7 sm:py-6"><Suspense fallback={<p className="text-xs text-[#8b9086]">Opening your note…</p>}><MarkdownContent content={body || "_No content yet. Choose **Edit** to add your note._"}/></Suspense></div>}
      </div>
    </section>
  </div>;
}
