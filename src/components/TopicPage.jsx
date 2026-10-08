import { Link, useParams } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { findTopic } from "../data/curriculum.js";
import { Library } from "./Library.jsx";

export function TopicPage({ notes, query, setQuery, onNew, onOpen, onRemove, menu, setMenu }) {
  const { topic: topicId } = useParams();
  const topic = findTopic(topicId);
  if (!topic) return <div className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="font-serif text-3xl">This learning path isn’t here yet.</h1><Link to="/computer-science" className="mt-4 inline-flex items-center gap-2 text-sm text-[#63795f]">Back to Computer Science <ArrowRight size={15}/></Link></div>;
  const topicNotes = notes.filter(note => note.subject === topic.name && `${note.title} ${note.body} ${note.subject}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="mx-auto max-w-[1080px] px-5 pb-12 pt-8 sm:px-9 sm:pt-11">
    <div className="mb-7 flex flex-wrap items-center gap-2 text-[10px] text-[#969a90]"><Link to="/" className="hover:text-[#526650]">Subjects</Link><span>/</span><Link to="/computer-science" className="hover:text-[#526650]">Computer Science</Link><span>/</span><span className="text-[#5d6658]">{topic.name}</span></div>
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[10px] font-medium uppercase tracking-[1.4px] text-[#89947f]">Computer Science / {topic.group}</p><h1 className="font-serif text-4xl tracking-[-1.2px] text-[#30352e]">{topic.name}<span className="text-[#8ca084">.</span></h1><p className="mt-2 text-xs text-[#8b9086]">{topic.description}</p></div><button onClick={() => onNew(topic.name)} className="flex h-[38px] items-center gap-2 rounded-md bg-[#526650] px-3 text-[11px] font-semibold text-white"><Plus size={16}/>New note</button></div>
    <Library notes={topicNotes} total={topicNotes.length} query={query} setQuery={setQuery} onNew={() => onNew(topic.name)} onOpen={onOpen} onRemove={onRemove} menu={menu} setMenu={setMenu} showHeading={false} showFilters={false}/>
  </div>;
}
