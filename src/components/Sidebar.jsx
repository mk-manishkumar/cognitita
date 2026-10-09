import { Link, NavLink } from "react-router-dom";
import { BookOpen, Braces, Clock3, Code2, Database, FileText, Server } from "lucide-react";
import { curriculum } from "../data/curriculum.js";

// Match each topic to an icon while keeping the curriculum data presentation-free.
const topicIcons = {
  dsa: Braces,
  mongodb: Database,
  "backend-from-first-principles": Server,
  "nodejs-expressjs": Code2,
};

// A link in the sidebar that can optionally show a count of notes for the topic.
function SideLink({ to, end, icon: Icon, label, count }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `relative flex items-center justify-center gap-2.5 rounded-lg px-0 py-3 text-[#74786f] transition hover:bg-[#f7f8f5] sm:justify-start sm:px-3 sm:py-2.5 sm:text-xs ${isActive ? "bg-[#eff3ed] font-semibold text-[#405643]" : ""}`}>
      <Icon size={17} />
      <span className="hidden sm:inline">{label}</span>
      {count !== undefined && <span className="hidden text-[10px] text-[#9da197] sm:ml-auto sm:inline">{count}</span>}
    </NavLink>
  );
}

export function Sidebar({ notes }) {
  const subject = curriculum[0];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-17 flex-col border-r border-[#efefe9] bg-white px-2 py-5 sm:w-55 sm:px-4 lg:w-61 lg:px-4.25">
      {/* The rail collapses to icons on narrow screens and expands to labels on larger ones. */}
      <Link to="/" className="flex items-center justify-center gap-2.5 text-[21px] font-bold tracking-[-1px] sm:justify-start sm:px-2">
        <span className="grid size-8.5 place-items-center rounded-[10px] bg-[#536953] text-white sm:size-7.5">
          <BookOpen size={17} />
        </span>
        <span className="hidden sm:inline">
          Cognitia<span className="text-[#799078]">.</span>
        </span>
      </Link>

      <p className="mb-2 mt-8 hidden px-2.5 text-[9px] font-bold tracking-[1.3px] text-[#a0a198] sm:block">YOUR SPACE</p>
      <nav className="mt-9 grid gap-1.5 sm:mt-0" aria-label="Main navigation">
        <SideLink to="/" end icon={BookOpen} label="My subjects" />
        <SideLink to={subject.path} icon={Code2} label={subject.name} />
        <SideLink to="/notes" icon={FileText} label="All notes" count={notes.length} />
        <SideLink to="/review" icon={Clock3} label="Revise notes" />
      </nav>

      <div className="mt-6 hidden sm:block">
        <p className="mb-3 px-2.5 text-[9px] font-bold tracking-[1.3px] text-[#a0a198]">COMPUTER SCIENCE</p>
        {subject.groups.map((group) => (
          <div key={group.id} className="mb-4">
            <p className="mb-1 px-2.5 text-[9px] font-semibold text-[#a4a69e]">{group.name}</p>
            {group.topics.map((topic) => {
              const Icon = topicIcons[topic.id] || Code2;
              const topicNoteCount = notes.filter((note) => note.subject === topic.name).length;

              return (
                <NavLink key={topic.id} to={topic.path} className={({ isActive }) => `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[10px] transition hover:bg-[#f7f8f5] ${isActive ? "bg-[#eff3ed] font-semibold text-[#405643]" : "text-[#70766c]"}`}>
                  <Icon size={14} />
                  <span className="min-w-0 flex-1 truncate">{topic.name}</span>
                  <span className="text-[9px] text-[#a2a59c]">{topicNoteCount}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
