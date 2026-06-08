// Shared retro "tab" button style, matching the Media page tabs.
export function tabButtonClass(active: boolean): string {
  return [
    'px-3 py-1.5 text-sm font-semibold border-2 rounded-sm transition-all',
    active
      ? 'bg-[#2b2b2b] text-[#f5e6c8] border-[#2b2b2b]'
      : 'bg-[#f5e6c8] text-[#2b2b2b] border-[#2b2b2b] hover:bg-[#e6d7b8]',
    'shadow-[3px_3px_0px_0px_#2b2b2b] hover:shadow-[1px_1px_0px_0px_#2b2b2b] active:shadow-[0px_0px_0px_0px_#2b2b2b]',
  ].join(' ')
}
