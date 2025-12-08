export function GameUI({ score }: { score: number, isAiming: boolean }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Wind Indicator (Top Left) */}
            <div className="absolute top-4 left-4">
                <div className="bg-white rounded-full w-20 h-24 border-4 border-gray-200 flex flex-col items-center justify-center shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center border-2 border-white shadow-inner mb-1">
                        {/* Rainbow Ball Icon Mock */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>
                    </div>
                    {/* Score Display in Bubble */}
                    <div className="bg-green-500 text-white font-bold px-2 rounded text-sm w-16 text-center shadow">
                        {score}
                    </div>
                </div>
            </div>

            {/* Buttons (Top Right) */}
            <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-12 h-12 rounded-full bg-[#8B4513] border-2 border-[#5c3a21] flex items-center justify-center shadow-lg text-white font-bold text-xl">
                    II
                </div>
                <div className="w-12 h-12 rounded-full bg-[#8B4513] border-2 border-[#5c3a21] flex items-center justify-center shadow-lg text-white font-bold text-xl">
                    🔊
                </div>
            </div>

            {/* Aiming Reticle (Center - Subtle) */}
            {/* The bow sight acts as the reticle now, but we can add a helper */}

            {/* Bottom Controls (Hidden or Minimal) */}
            {/* Reference image doesn't show bottom controls, so we'll keep it clean */}

            {/* Score (Maybe hidden or subtle?) Reference doesn't show score prominently. 
          We'll put it small in corner or just rely on hit feedback. 
          Let's keep a small score counter for gameplay feedback. */}
            <div className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-md">
                Score: {score}
            </div>
        </div>
    )
}
