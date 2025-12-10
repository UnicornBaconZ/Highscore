export default function BiosCard() {
  return (
    <div
      className="
      border-4 border-[#2b2b2b] bg-[#f5e6c8]
      p-4 rounded-sm
      shadow-[6px_6px_0px_0px_#2b2b2b]
      w-56 font-mono text-xs
    "
    >
      <div className="font-bold text-[#2b2b2b] border-b-2 border-[#2b2b2b] pb-1 mb-2">
        ZARIN BIOS v1.0
      </div>

      <div className="space-y-1">
        <div>CPU ............. OK</div>
        <div>RAM ............. OK</div>
        <div>GPU ............. MISSING</div>
        <div>COOKIES .......... LOW ⚠️</div>
        <div>SANITY .......... UNKNOWN</div>
        <div className="pt-2"> PRESS F5 TO CONTINUE</div>
      </div>
    </div>
  )
}
