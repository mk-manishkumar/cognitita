import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Braces, Check, ChevronDown, Clock3, Code2, Database, FileText, Flame, Plus, Server, Settings2, Sparkles } from "lucide-react";
import { curriculum } from "../data/curriculum.js";

function SideLink({ to, end, icon: Icon, label, count, dot }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `relative flex items-center justify-center gap-2.5 rounded-lg px-0 py-3 text-[#74786f] transition hover:bg-[#f7f8f5] sm:justify-start sm:px-3 sm:py-2.5 sm:text-xs ${isActive ? "bg-[#eff3ed] font-semibold text-[#405643]" : ""}`}>
      <Icon size={17} />
      <span className="hidden sm:inline">{label}</span>
      {count !== undefined && <span className="hidden text-[10px] text-[#9da197] sm:ml-auto sm:inline">{count}</span>}
      {dot && <i className="absolute right-2 top-2 size-1.5 rounded-full bg-[#c08b61] sm:static sm:ml-auto" />}
    </NavLink>
  );
}

export function Sidebar({ notes, due, onNew }) {
  const navigate = useNavigate();
  const subject = curriculum[0];
  const icons = { dsa: Braces, mongodb: Database, "backend-from-first-principles": Server };
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[68px] flex-col border-r border-[#efefe9] bg-white px-2 py-5 sm:w-[220px] sm:px-4 lg:w-[244px] lg:px-[17px]">
      <Link to="/" className="flex items-center justify-center gap-2.5 text-[21px] font-bold tracking-[-1px] sm:justify-start sm:px-2">
        <span className="grid size-[34px] place-items-center rounded-[10px] bg-[#536953] text-white sm:size-[30px]">
          <BookOpen size={17} />
        </span>
        <span className="hidden sm:inline">
          Cognitia<span className="text-[#799078]">.</span>
        </span>
      </Link>
      <button className="mt-8 hidden items-center gap-2.5 rounded-[10px] border border-[#efefe9] p-2.5 text-left sm:mt-[34px] sm:flex">
        <span className="grid size-[31px] place-items-center rounded-full bg-[#e5ece2] text-xs font-bold text-[#596c56]">M</span>
        <span className="flex-1">
          <b className="block text-[11px] font-semibold">My learning space</b>
          <small className="text-[10px] text-[#969990]">Personal library</small>
        </span>
        <ChevronDown size={15} className="text-[#a6a99f]" />
      </button>
      <p className="mb-2 mt-8 hidden px-2.5 text-[9px] font-bold tracking-[1.3px] text-[#a0a198] sm:block">YOUR SPACE</p>
      <nav className="mt-9 grid gap-1.5 sm:mt-0">
        <SideLink to="/" end icon={BookOpen} label="My subjects" />
        <SideLink to={subject.path} icon={Code2} label={subject.name} />
        <SideLink to="/notes" icon={FileText} label="All notes" count={notes.length} />
        <SideLink to="/review" icon={Clock3} label="Review queue" dot={due.length > 0} />
      </nav>
      <div className="mt-6 hidden sm:block">
        <p className="mb-3 px-2.5 text-[9px] font-bold tracking-[1.3px] text-[#a0a198]">COMPUTER SCIENCE</p>
        {subject.groups.map((group) => (
          <div key={group.id} className="mb-4">
            <p className="mb-1 px-2.5 text-[9px] font-semibold text-[#a4a69e]">{group.name}</p>
            {group.topics.map((topic) => {
              const Icon = icons[topic.id] || Code2;
              return (
                <NavLink key={topic.id} to={topic.path} className={({ isActive }) => `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[10px] transition hover:bg-[#f7f8f5] ${isActive ? "bg-[#eff3ed] font-semibold text-[#405643]" : "text-[#70766c]"}`}>
                  <Icon size={14} />
                  <span className="min-w-0 flex-1 truncate">{topic.name}</span>
                  <span className="text-[9px] text-[#a2a59c]">{notes.filter((note) => note.subject === topic.name).length}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="mb-3 hidden rounded-[11px] border border-[#eef0e9] bg-[#f7f8f4] p-3 sm:block">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#555e51]">
            <Flame size={15} className="text-[#be855e]" />A steady rhythm
            <Sparkles size={14} className="ml-auto text-[#a5b19c]" />
          </div>
          <p className="my-2.5 text-[10px] leading-relaxed text-[#8a8d84]">
            You’ve reviewed <b className="text-[#62675d]">{notes.reduce((sum, note) => sum + note.reps, 0)} notes</b> so far.
          </p>
          <div className="flex justify-between">
            {["M", "T", "W", "T", "F", "S", "S"].map((label, index) => (
              <span key={index} className={`grid size-[22px] place-items-center rounded-full text-[9px] ${index < 4 ? "bg-[#e3eade] text-[#687e65]" : "bg-white text-[#b4b7af]"}`}>
                {index < 4 ? <Check size={11} /> : label}
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => navigate("/settings")} className="flex w-full items-center justify-center gap-2.5 rounded-lg px-0 py-3 text-[#74786f] hover:bg-[#f7f8f5] sm:justify-start sm:px-3">
          <Settings2 size={17} />
          <span className="hidden text-xs sm:inline">Settings</span>
        </button>
        <button onClick={onNew} className="mt-1 hidden w-full items-center gap-2 rounded-lg border border-[#e7e9e1] px-3 py-2.5 text-left text-[10px] font-semibold text-[#677a61] hover:bg-[#f7f8f5] sm:flex">
          <Plus size={14} />
          New note
        </button>
      </div>
    </aside>
  );
}
