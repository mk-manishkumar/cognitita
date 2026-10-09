import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Code2 } from "lucide-react";
import { curriculum } from "../../data/curriculum.js";
import { LearningGroupCard } from "./LearningGroupCard.jsx";

export function ComputerScience({ notes }) {
  const subject = curriculum[0];

  return (
    <div className="mx-auto max-w-270 px-5 pb-12 pt-8 sm:px-9 sm:pt-11">
      <Link to="/" className="mb-7 inline-flex items-center gap-2 text-[10px] text-[#858d80] hover:text-[#51664f]">
        <ArrowLeft size={14} /> All subjects
      </Link>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[1.6px] text-[#87917f]"><Code2 size={13} /> Your subject</p>
          <h1 className="font-serif text-4xl tracking-[-1.4px] text-[#2f342e] sm:text-5xl">Computer Science<span className="text-[#8ca084">.</span></h1>
          <p className="mt-3 text-xs text-[#858a80]">Choose a learning path and pick up where curiosity takes you.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#9a9e94]"><BookOpen size={14} />{notes.length} notes saved</div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {subject.groups.map((group, index) => <LearningGroupCard key={group.id} group={group} index={index} notes={notes} />)}
      </div>
    </div>
  );
}
