import { Command, Search } from "lucide-react";

export function AppHeader({ page, query, onQueryChange }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[#eaeae4] bg-white/60 px-3 sm:h-16 sm:px-8 lg:px-11">
      <div className="flex items-center gap-2.5 text-[10px] text-[#999c94] sm:text-[11px]">
        <span>My space</span>
        <span className="text-[#d2d3ce]">/</span>
        <b className="font-semibold text-[#565950]">{page}</b>
      </div>
      <div className="flex items-center gap-2.5 sm:gap-4">
        <label className="flex h-8 w-[min(40vw,205px)] items-center gap-2 rounded-md border border-[#e8e9e3] bg-white px-2 text-[#999c94]">
          <Search size={15} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search your notes" className="min-w-0 flex-1 bg-transparent text-[10px] text-[#4b5049] outline-none placeholder:text-[#aaaca5]" />
          <kbd className="hidden items-center gap-0.5 rounded border border-[#e8e8e2] px-1 py-0.5 text-[9px] sm:flex">
            <Command size={10} />K
          </kbd>
        </label>
      </div>
    </header>
  );
}
