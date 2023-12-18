export const Point = (x, y, color) => {
    const equals = (point) => {
        return x === point.x && y === point.y
    }

    const draw = (ctx, size = 42) => {
        const rad = size/2;
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
    }

    return {
        x,
        y,
        color,
        draw,
        equals
    }
}
