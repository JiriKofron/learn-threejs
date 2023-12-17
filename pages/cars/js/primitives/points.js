export const Point = (x, y) => {

    const equals = (point) => {
        return x === point.x && y === point.y
    }

    const draw = (ctx, size = 42, color = 'red') => {
        const rad = size/2;
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
    }

    return {
        x,
        y,
        draw,
        equals
    }
}
