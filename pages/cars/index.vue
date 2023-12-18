<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import {Graph} from "~/pages/cars/js/math/graph";
import {Point} from "~/pages/cars/js/primitives/points";
import {Segment} from "~/pages/cars/js/primitives/segments";

const threeCanvas = ref<HTMLCanvasElement>();
const {width, height} = useWindowSize()
const ctx = ref()
let graph: any = null

const create = () => {
  const canvas = threeCanvas.value as HTMLCanvasElement

  canvas.width = width.value
  canvas.height = height.value - 100

  ctx.value = canvas.getContext('2d')

  const p1 = Point(300, 100, '#0000FF')
  const p2 = Point(100, 300, '#00FF00')
  const p3 = Point(300, 300, '#FF0000')
  const p4 = Point(500, 400, '#0F000F')

  const s1 = Segment(p1, p2)
  const s2 = Segment(p1, p3)
  const s3 = Segment(p1, p4)
  const s4 = Segment(p3, p4)

  graph = Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
  graph.draw(ctx.value)
}

const addRandomPoint = () => {
  graph.tryAddPoint(
      Point(Math.random() * width.value, Math.random() * height.value - 100)
  )
  ctx.value.clearRect(0, 0, width.value, height.value - 100)
  graph.draw(ctx.value)
}

const removeRandomPoint = () => {
  if(graph.segments.length === 0) {
    return
  }

  const index = Math.floor(Math.random() * graph.points.length)
  graph.removePoint(graph.points[index])

  ctx.value.clearRect(0, 0, width.value, height.value - 100)

  graph.draw(ctx.value)
}

const addRandomSegment = () => {
  const index1 = Math.floor(Math.random() * graph.points.length)
  const index2 = Math.floor(Math.random() * graph.points.length)

  if(index1 !== index2) {
    graph.tryAddSegment(
        Segment(graph.points[index1], graph.points[index2])
    )
  }

  ctx.value.clearRect(0, 0, width.value, height.value - 100)
  graph.draw(ctx.value)
}

const removeRandomSegment = () => {
  if(graph.segments.length === 0) {
    return
  }

  const index = Math.floor(Math.random() * graph.segments.length)
  graph.removeSegment(graph.segments[index])

  ctx.value.clearRect(0, 0, width.value, height.value - 100)
  graph.draw(ctx.value)
}

onMounted(() => {
  create()
})
</script>

<template>
  <main>
    <canvas
      id="c"
      ref="threeCanvas"
    />

    <menu class="btn-menu">
      <li>
        <button @click="addRandomPoint">
          Add point
        </button>
      </li>

      <li>
        <button @click="removeRandomPoint">
          Remove random point
        </button>
      </li>

      <li>
        <button @click="addRandomSegment">
          Add random segment
        </button>
      </li>

      <li>
        <button @click="removeRandomSegment">
          Remove random segment
        </button>
      </li>
    </menu>
  </main>
</template>

<style lang="scss" scoped>
.btn-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  li {
    list-style-type: none;
  }
}
</style>
