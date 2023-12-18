import {toRaw} from "vue";

export const Graph = (points = [], segments = []) => {

    const addPoint = (point) => {
        points.push(point)
    }

    const containsPoint = (point) => {
        return points.find((p) => p.equals(point))
    }

    const tryAddPoint = (point) => {
        if(!containsPoint(point)) {
            addPoint(point)
            return true
        }

        return false
    }

    const removePoint = point => {
        if(points.length === 0) {
            console.log('no points')
            return
        }

        const segs = getSegmentsWithPoint(point);
        for (const seg of segs) {
            removeSegment(seg)
        }

        return points.splice(points.indexOf(point), 1)
    }

    const containsSegment = seg => {
        return segments.find((s) => s.equals(seg))
    }

    const tryAddSegment = seg => {
        if(!containsSegment(seg)) {
            addSegment(seg)
            return true
        }

        return false
    }

    const addSegment = (seg) => {
        segments.push(toRaw(seg))
    }

    const getSegmentsWithPoint = (point) => {
        const segs = []
        for (const seg of segments) {
            if(seg.includes(point)) {
                segs.push(seg)
            }
        }

        return segs
    }

    const removeSegment = seg => {
        segments.splice(segments.indexOf(seg), 1)
    }

    const draw = (ctx) => {
        for (const seg of segments) {
            seg.draw(ctx);
        }

        for (const point of points) {
            point.draw(ctx)
        }
    }

    return {
        points,
        segments,
        draw,
        addPoint,
        tryAddPoint,
        addSegment,
        tryAddSegment,
        removeSegment,
        removePoint
    }
}
