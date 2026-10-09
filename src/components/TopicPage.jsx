import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { findTopic } from "../data/curriculum.js";
import { Library } from "./Library.jsx";

function MissingTopic() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="font-serif text-3xl">This learning path isn’t here yet.</h1>
      <Link to="/computer-science" className="mt-4 inline-flex items-center gap-2 text-sm text-[#63795f]">
        Back to Computer Science <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function TopicPage({ notes, query, setQuery, onOpen }) {
  const { topic: topicId } = useParams();
  const topic = findTopic(topicId);

  // A saved bookmark may refer to a topic that has since been removed from the curriculum.
  if (!topic) return <MissingTopic />;

  const searchTerm = query.toLowerCase();
  const topicNotes = notes.filter((note) => {
    const belongsToTopic = note.subject === topic.name;
    const matchesSearch = `${note.title} ${note.body} ${note.subject}`.toLowerCase().includes(searchTerm);
    return belongsToTopic && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-270 px-5 pb-12 pt-8 sm:px-9 sm:pt-11">
      <div className="mb-7 flex flex-wrap items-center gap-2 text-[10px] text-[#969a90]">
        <Link to="/" className="hover:text-[#526650]">Subjects</Link>
        <span>/</span>
        <Link to="/computer-science" className="hover:text-[#526650]">Computer Science</Link>
        <span>/</span>
        <span>{topic.group}</span>
        <span>/</span>
        <span className="text-[#5d6658]">{topic.name}</span>
      </div>

      <div className="mb-7">
        <h1 className="font-serif text-4xl tracking-[-1.2px] text-[#30352e]">
          {topic.name}
          <span className="text-[#8ca084">.</span>
        </h1>
        <p className="mt-2 text-xs text-[#8b9086]">{topic.description}</p>
      </div>

      <Library
        notes={topicNotes}
        total={topicNotes.length}
        query={query}
        setQuery={setQuery}
        onOpen={onOpen}
        showHeading={false}
        showFilters={false}
      />
    </div>
  );
}
