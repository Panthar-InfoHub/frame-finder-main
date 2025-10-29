import { promoData } from "@/lib/data"

export function TopBanner() {
  return (
    <div className=" sticky top-0 z-50 bg-[#00AA78] text-white py-2 px-4 max-w-full overflow-hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm md:text-base">FrameFinder</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-center flex-1 justify-center">
          <span>{promoData.text}</span>
          <span>{promoData.icon}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  )
}
