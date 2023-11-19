<script setup lang="ts">

import {WebGLRenderer} from "three";
import {useWindowSize} from "@vueuse/core/index";
import * as THREE from "three";

const threeCanvas = ref()
let scene: any = null
const camera = ref()
let renderer: WebGLRenderer | null = null
const windowWidth = ref()
const windowHeight = ref()

const addCube = (dims: Record<string, number>, position: Record<string, number>,  color: any) => {
  const geometry = new THREE.BoxGeometry(dims.width, dims.height, dims.depth)
  const material = new THREE.MeshBasicMaterial({color: color})
  const cube = new THREE.Mesh( geometry, material)

  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;

  scene.add( cube)
}

const animate = () => {
  console.log('scene', scene)
  camera.value.position.z = 10
  renderer?.render(scene, camera.value)
}
const addFog = () =>{
  console.log('fog added')
  scene.fog = new THREE.Fog(0x00ff00, 0.2)
  console.log(scene.fog)
}

onMounted(() => {
  const canvas = threeCanvas.value as HTMLCanvasElement
  const { width, height } = useWindowSize()
  windowWidth.value = width.value
  windowHeight.value = height.value
  scene = new THREE.Scene()
  camera.value = new THREE.PerspectiveCamera(75, windowWidth.value / windowHeight.value, 0.015, 1000)

  renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(width.value, height.value)

  addFog()
  addCube({
    width: 1,
    height: 1,
    depth: 1
  },
      {
        x: 4,
        y: 2,
        z: 3
      }, 0x00ff00)
  addCube({
    width: 2,
    height: 0.5,
    depth: 3
  },{
    x: 2,
    y: -2,
    z: -10
  }, 0x5B6BAA)
  animate()
})

</script>

<template>
  <main>
    <h1>Foggy fog</h1>

    <canvas
      id="c"
      ref="threeCanvas"
      width="500"
      height="500"
    />
  </main>
</template>

<style scoped>

</style>
