export const Point = (x, y) => {
    const equals = (point) => {
        return x === point.x && y === point.y
    }

    const draw = (ctx, {
        size = 42,
        color = 'red',
        outline = false,
        fill = false
    } = {}) => {
        const rad = size/2;
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();

        if (fill) {
            ctx.beginPath()
            ctx.fillStyle = 'yellow';
            ctx.arc(x, y, rad * 0.4, 0, Math.PI * 2);
            ctx.fill()
        }

        if (outline) {
            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.arc(x, y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke()
        }
    }

    return {
        x,
        y,
        draw,
        equals
    }
}
