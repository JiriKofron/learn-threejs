<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import {Graph} from "~/pages/cars/js/math/graph";
import {Point} from "~/pages/cars/js/primitives/points";
import {Segment} from "~/pages/cars/js/primitives/segments";
import {GraphEditor} from "~/pages/cars/js/graphEditor";

const threeCanvas = ref<HTMLCanvasElement>();
const {width, height} = useWindowSize()
let ctx: any = null
let graph: any = null
let graphEditor: any = null

const create = () => {
  const canvas = threeCanvas.value as HTMLCanvasElement

  canvas.width = width.value
  canvas.height = height.value - 100

  ctx = canvas.getContext('2d')

  const p1 = Point(300, 100)
  const p2 = Point(100, 300)
  const p3 = Point(300, 300)
  const p4 = Point(500, 400)

  const s1 = Segment(p1, p2)
  const s2 = Segment(p1, p3)
  const s3 = Segment(p1, p4)
  const s4 = Segment(p3, p4)

  graph = Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
  graphEditor = GraphEditor(canvas, graph)

  animate()
}

const animate = () => {
  ctx.clearRect(0, 0, width.value, height.value)
  graphEditor.display()
  requestAnimationFrame(animate)
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
