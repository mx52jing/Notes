const displaySize = 200
const drawCircle = (ctx) => {
    ctx.beginPath()
    ctx.fillStyle = '#111224'
    ctx.lineWidth = 10;  // 边框宽度
    ctx.arc(100, 100, 50, 0, Math.PI * 2)
    ctx.stroke()
}
const handleDrawNormalCircle = () => {
    const canvas = document.querySelector("#canvas-normal")
    canvas.width = displaySize
    canvas.height = displaySize
    const ctx = canvas.getContext('2d')
    drawCircle(ctx)
}
const handleDrawOptimizedCircle = () => {
    const canvas = document.querySelector("#canvas-optimize")
    const dpr = window.devicePixelRatio || 1
    canvas.width = displaySize * dpr
    canvas.height = displaySize * dpr
    canvas.style.cssText += `width: ${displaySize}px;height: ${displaySize}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    drawCircle(ctx)
}
const handleWindowLoaded = async () => {
    handleDrawNormalCircle()
    handleDrawOptimizedCircle()
}
window.addEventListener("load", handleWindowLoaded)