import { BookOpen, ArrowUpRight, Sparkles } from 'lucide-react'

export function Settings({ notes, onImport }) {
  const importFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const items = JSON.parse(await file.text());
      if (Array.isArray(items)) onImport(items);
      else alert("That file doesn’t look like a Cognitia notes export.");
    } catch {
      alert("That file doesn’t look like a Cognitia notes export.");
    }
  };
  const exportData = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" }));
    link.download = "cognitia-notes.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div className="mx-auto max-w-[800px] px-5 pb-8 pt-8 sm:px-8 sm:pt-10">
      <p className="flex items-center gap-2 text-[10px] text-[#8b8e84]">
        <i className="size-1.5 rounded-full bg-[#82947b]" />
        Just for you
      </p>
      <h1 className="mt-3 font-serif text-[39px] tracking-[-1.5px] text-[#30332e]">
        Your <em className="text-[#788b73]">space.</em>
      </h1>
      <p className="mb-7 mt-2 text-xs text-[#898c83]">A few simple things to make Cognitia feel like yours.</p>
      <section className="mb-2 flex flex-wrap items-start gap-3.5 rounded-lg border border-[#e9eae4] bg-white p-4">
        <span className="grid size-[34px] shrink-0 place-items-center rounded-lg bg-[#edf2e9] text-[#7b8e73]">
          <BookOpen size={18} />
        </span>
        <div className="min-w-[200px] flex-1">
          <h3 className="font-serif text-[17px]">Your notes live on this device</h3>
          <p className="mt-1 max-w-[450px] text-[10px] leading-relaxed text-[#969990]">Cognitia saves notes in this browser’s local storage. Nothing is sent to a server. Export a copy if you’d like to keep a backup.</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-[#f1f4ef] px-2 py-1 text-[9px] text-[#788c72]">
          <i className="size-1 rounded-full bg-[#8ba180]" />
          Only you
        </span>
      </section>
      <section className="flex flex-wrap items-start gap-3.5 rounded-lg border border-[#e9eae4] bg-white p-4">
        <span className="grid size-[34px] shrink-0 place-items-center rounded-lg bg-[#f1eef6] text-[#9384a6]">
          <ArrowUpRight size={18} />
        </span>
        <div className="min-w-[200px] flex-1">
          <h3 className="font-serif text-[17px]">Take your notes with you</h3>
          <p className="mt-1 text-[10px] leading-relaxed text-[#969990]">Export a JSON backup, or bring back notes from an earlier backup.</p>
        </div>
        <div className="flex w-full gap-1.5 sm:w-auto">
          <button onClick={exportData} className="flex h-[31px] items-center gap-1.5 rounded-md border border-[#e7e9e1] px-2.5 text-[9px] text-[#697562]">
            Export notes <ArrowUpRight size={14} />
          </button>
          <label className="flex h-[31px] cursor-pointer items-center rounded-md border border-[#e6e8e0] px-2.5 text-[9px] text-[#8a8d84]">
            Import
            <input type="file" accept="application/json" onChange={importFile} className="hidden" />
          </label>
        </div>
      </section>
      <p className="mt-4 flex items-center gap-2 text-[9px] text-[#a1a399]">
        <Sparkles size={14} className="text-[#acb99e]" />A little reminder: clearing your browser data may clear these notes too.
      </p>
    </div>
  );
}
