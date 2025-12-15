export function GameUI({ score, isAiming, currentPower, lastSpeed, onRestart, isPaused, onTogglePause }: {
    score: number,
    isAiming: boolean,
    currentPower: number,
    lastSpeed: number | null,
    onRestart: () => void,
    isPaused: boolean,
    onTogglePause: () => void
}) {
    // Calculate fill percentage for power meter (max power is 50, min is 25)
    // Actually, calculateArrowPower returns 25 + (duration/2000)*25.
    // So range is 25 to 50. Let's normalize it 0 to 100% based on the *added* power part?
    // Or just normalize based on the duration for the UI meter.
    // The meter should probably show 0 to 100% of the *charge*, not the base power.
    // currentPower from Scene is exactly the result of calculateArrowPower.
    // So it goes from ~25 (instant) to ~50 (full charge).
    const powerPercent = Math.max(0, Math.min(100, ((currentPower - 25) / 25) * 100))

    return (
        <div className="absolute inset-0 pointer-events-none font-sans select-none">
            {/* Top Bar HUD */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">

                {/* Score Panel */}
                <div className="flex flex-col gap-1">
                    <div className="text-white/80 text-sm font-bold tracking-wider uppercase drop-shadow-md">Score</div>
                    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-6 py-3 min-w-[120px]">
                        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 drop-shadow-sm">
                            {score.toString().padStart(3, '0')}
                        </div>
                    </div>
                </div>

                {/* Right Controls / Pause */}
                <div className="flex gap-3 pointer-events-auto">
                    <button
                        onClick={onRestart}
                        className="bg-red-500/80 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                        title="Restart Game"
                    >
                        <span className="text-xl group-hover:rotate-180 transition-transform duration-500">↻</span>
                    </button>
                    <button
                        onClick={onTogglePause}
                        className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="text-xl">{isPaused ? '▶' : '⏸'}</span>
                    </button>
                    <button className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95">
                        <span className="text-xl">🔊</span>
                    </button>
                </div>
            </div>

            {/* Bottom HUD Area */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

                {/* Last Shot Stats */}
                <div className="flex flex-col gap-2">
                    {lastSpeed !== null && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Last Shot Speed</div>
                            <div className="bg-black/60 backdrop-blur-md rounded-lg border border-white/10 px-5 py-3 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-cyan-400">{lastSpeed.toFixed(1)}</span>
                                <span className="text-sm text-cyan-400/70 font-bold">m/s</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Wind Indicator (Stylized) */}
                <div className="bg-black/30 backdrop-blur-sm rounded-full w-16 h-16 border-2 border-white/20 flex items-center justify-center relative">
                    <div className="text-white/80 text-xs absolute -top-6 font-bold">WIND</div>
                    <div className="w-1 h-8 bg-gradient-to-t from-transparent via-white to-transparent opacity-50 absolute"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 absolute"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                </div>
            </div>

            {/* Center Reticle & Power Meter - Only visible when aiming */}
            {isAiming && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Reticle Ring */}
                    <div className="w-16 h-16 border border-white/30 rounded-full absolute"></div>
                    <div className="w-1 h-1 bg-white rounded-full absolute shadow-[0_0_4px_white]"></div>

                    {/* Power Meter Arc/Bar */}
                    <div className="absolute top-[55%] flex flex-col items-center gap-1">
                        <div className="w-32 h-2 bg-gray-800/80 rounded-full overflow-hidden border border-white/10">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-75 ease-out"
                                style={{ width: `${powerPercent}%` }}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Power</div>
                    </div>
                </div>
            )}
        </div>
    )
}
