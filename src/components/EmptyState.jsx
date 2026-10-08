import { BookOpen, Plus } from 'lucide-react'

export function EmptyState({ onNew }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
      <span className="mb-3 grid size-[42px] place-items-center rounded-xl bg-[#edf1e9] text-[#74866c]">
        <BookOpen size={20} />
      </span>
      <h3 className="font-serif text-[22px]">A place for what you learn</h3>
      <p className="mb-4 mt-1 text-[11px] text-[#969990]">Your notes will find a home here. Start with one small idea.</p>
      <button onClick={onNew} className="flex h-9 items-center gap-2 rounded-md border border-[#e7e9e1] bg-white px-3 text-[10px] font-semibold text-[#697562]">
        <Plus size={15} />
        Write your first note
      </button>
    </div>
  );
}
