import {Point} from "~/pages/cars/js/primitives/points.js";
import {getNearestPoint} from "~/pages/cars/js/math/utils.js";

export const GraphEditor = (canvas, graph) => {

    const ctx = canvas.getContext('2d')
    let selected = null
    let hovered = null
    let dragging = false

    const _removePoint = (point) => {
        graph.removePoint(point)
        hovered = null
        selected = null
    }

    const display = () => {
        graph.draw(ctx);

        if(selected) {
            selected.draw(ctx, {
                outline: true
            })
        }

        if(hovered) {
            hovered.draw(ctx, {
                fill: true
            })
        }
    }

    const _addEventListeners = () => {
        canvas.addEventListener("mousedown", (e) => {
            if(e.button === 2) {
                if(hovered) {
                    _removePoint(hovered)
                }
            }

            if (e.button === 0) {
                const mouse = Point(e.offsetX, e.offsetY);

                console.log(mouse)

                if(hovered) {
                    selected = hovered
                    dragging = true
                    return
                }

                graph.addPoint(mouse)
                selected = mouse
                hovered = mouse
            }
        })

        canvas.addEventListener("mousemove", (e) => {
            const mouse = Point(e.offsetX, e.offsetY);
            hovered = getNearestPoint(mouse, graph.points, 10);

            if(dragging) {
                console.log('∂ragging', selected)
                console.log('pohyb', {
                    selected: selected.x,
                    mouse: mouse.x
                })

                selected.x = mouse.x;
                selected.y = mouse.y
            }
        })

        canvas.addEventListener("contextmenu", (e) => e.preventDefault());

        canvas.addEventListener("mouseup", () => dragging = false)
    }

    _addEventListeners()

    return {
        canvas,
        graph,
        display,
        selected
    }
}
