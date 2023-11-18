<script setup lang="ts">
import * as THREE from 'three';
import { useWindowSize } from "@vueuse/core";
import {PerspectiveCamera, WebGLRenderer} from "three";

const threeCanvas = ref()
const scene = ref()
const camera = ref()
const cube = ref()
let renderer: WebGLRenderer | null = null

const addCube = (camera: PerspectiveCamera) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
  cube.value = new THREE.Mesh( geometry, material)
  scene.value.add( toRaw(cube.value))

  camera.position.z = 5
}

const animate = () => {
  requestAnimationFrame( animate )
  cube.value.rotation.x += 0.01;
  cube.value.rotation.y += 0.01;
  renderer?.render( toRaw(scene.value), camera.value)
}

onMounted(() => {
  const canvas = threeCanvas.value as HTMLCanvasElement
  const { width, height } = useWindowSize()
  scene.value = new THREE.Scene()
  camera.value = new THREE.PerspectiveCamera(75, width.value /height.value, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(width.value, height.value)

  addCube(camera.value)
  animate()

  //renderer = new THREE.Fog(0xcccc, 10, 15)
})
</script>

<template>
  <div>
    <h1>Hello animation guys</h1>

    <canvas
      id="c"
      ref="threeCanvas"
      width="500"
      height="500"
    />
  </div>
</template>

<style scoped>

</style>
