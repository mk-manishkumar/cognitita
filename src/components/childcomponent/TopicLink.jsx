import { ArrowUpRight, Braces, Code2, Database, Server } from "lucide-react";
import { Link } from "react-router-dom";

const topicIcons = {
  dsa: Braces,
  mongodb: Database,
  "nodejs-expressjs": Code2,
  "backend-from-first-principles": Server,
};

const topicColors = {
  sage: "bg-[#edf2e9] text-[#74876d]",
  blue: "bg-[#eef2f4] text-[#718e9d]",
  peach: "bg-[#f7eee8] text-[#b38160]",
};

export function TopicLink({ topic, noteCount }) {
  const Icon = topicIcons[topic.id] || Server;
  const colorClass = topicColors[topic.color] || topicColors.sage;

  return (
    <Link to={topic.path} className="group/topic flex items-center gap-3 rounded-xl border border-[#f0f1ed] bg-[#fcfcfa] p-3.5 transition hover:border-[#dce3d7] hover:bg-[#f8faf6]">
      <span className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${colorClass}`}>
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-[12px] font-semibold text-[#4b5148]">{topic.name}</b>
        <small className="mt-1 block text-[9px] text-[#a0a398]">{topic.description}</small>
      </span>
      <span className="hidden text-[9px] text-[#a0a398] sm:block">{noteCount} notes</span>
      <ArrowUpRight size={15} className="text-[#9ba692] transition group-hover/topic:translate-x-0.5 group-hover/topic:-translate-y-0.5" />
    </Link>
  );
}
