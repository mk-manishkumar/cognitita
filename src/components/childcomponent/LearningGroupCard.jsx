import { Braces, FolderOpen, Layers3 } from "lucide-react";
import { TopicLink } from "./TopicLink.jsx";

const groupIcons = {
  "core-subjects": Layers3,
  "web-development": Braces,
};

export function LearningGroupCard({ group, index, notes }) {
  const Icon = groupIcons[group.id] || FolderOpen;
  const iconStyle = index === 0 ? "bg-[#eef2e9] text-[#71866a]" : "bg-[#eef2f4] text-[#6f8d9c]";

  return (
    <section className="rounded-2xl border border-[#e7e9e2] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <span className={`grid size-11 place-items-center rounded-[13px] ${iconStyle}`}>
          <Icon size={20} />
        </span>
        <span className="text-[9px] uppercase tracking-[1.2px] text-[#a5a89f]">
          {group.topics.length} {group.topics.length === 1 ? "topic" : "topics"}
        </span>
      </div>
      <h2 className="mt-5 font-serif text-[25px] text-[#343a32]">{group.name}</h2>
      <p className="mt-1 text-[11px] text-[#93978d]">{group.description}</p>
      <div className="mt-5 grid gap-2">
        {group.topics.map((topic) => {
          const noteCount = notes.filter((note) => note.subject === topic.name).length;
          return <TopicLink key={topic.id} topic={topic} noteCount={noteCount} />;
        })}
      </div>
    </section>
  );
}
