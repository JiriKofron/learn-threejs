export const Segment = (p1, p2) => {

    const equals = (seg) => {
        return includes(seg.p1) && includes(seg.p2)
    }

    const includes = point => {
        return p1.equals(point) || p2.equals(point)
    }

    const draw = (ctx, width = 2, color = 'black') => {

        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke()
    }

    return {
        p1,
        p2,
        draw,
        equals,
        includes
    }
}
