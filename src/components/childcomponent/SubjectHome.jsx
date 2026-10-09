import { Link } from "react-router-dom";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { curriculum } from "../../data/curriculum.js";

export function SubjectHome({ notes }) {
  const subject = curriculum[0];
  const topicCount = subject.groups.reduce((total, group) => total + group.topics.length, 0);

  return (
    <div className="mx-auto max-w-270 px-5 pb-12 pt-9 sm:px-9 sm:pt-12">
      <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[1.8px] text-[#87917f]">
        <Sparkles size={13} /> Your learning space
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-4xl tracking-[-1.5px] text-[#2f342e] sm:text-5xl">
            Make room for
            <br />
            <em className="font-normal text-[#7c9076]">what you’re learning.</em>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#81877d]">A considered home for your notes, organized around the subjects you want to understand.</p>
        </div>
        <span className="text-[11px] text-[#9a9e94]">
          {notes.length} saved {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>
      <div className="mb-3 mt-11 flex items-center justify-between">
        <h2 className="font-serif text-[25px] text-[#363b34]">Your subjects</h2>
        <span className="text-[10px] text-[#a0a398]">{curriculum.length} subject</span>
      </div>
      <Link to={subject.path} className="group relative block overflow-hidden rounded-2xl border border-[#e4e8df] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#394632]/[0.07] sm:p-7">
        <div className="absolute -right-10 -top-24 size-72 rounded-full border border-[#eaf0e6]" />
        <div className="absolute -right-2 -top-16 size-56 rounded-full border border-[#eaf0e6]" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[14px] bg-[#edf2e9] text-[#647b5e]">
                <Code2 size={23} />
              </span>
              <span className="rounded-full bg-[#f5f7f2] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[1.1px] text-[#829078]">Subject 01</span>
            </div>
            <h3 className="font-serif text-3xl text-[#323830]">{subject.name}</h3>
            <p className="mt-2 text-xs text-[#92968c]">{subject.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {subject.groups.map((group) => (
                <span key={group.id} className="rounded-full border border-[#ecefe9] bg-white/90 px-3 py-1.5 text-[10px] text-[#72796d]">
                  {group.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-[#eff1ec] pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
            <div className="text-right">
              <span className="block font-serif text-3xl text-[#526650]">{topicCount}</span>
              <span className="text-[9px] uppercase tracking-[1px] text-[#a0a398]">learning paths</span>
            </div>
            <span className="flex items-center gap-2 rounded-lg bg-[#526650] px-4 py-3 text-[10px] font-semibold text-white transition group-hover:bg-[#425440]">
              Open subject <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
