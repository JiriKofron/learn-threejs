<script setup lang="ts">
import * as THREE from "three";
import gsap from 'gsap'
import {Scene} from "three";
import {useWindowSize, useMouse, useMousePressed} from "@vueuse/core/index";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const threeCanvas = ref()
let scene: Scene | null = null
const camera = ref()
const renderer= ref()
const windowWidth = ref()
const windowHeight = ref()

let pointLight: any = null
let sphere: any = null
let canvas: HTMLCanvasElement | null = null
let controls: OrbitControls | null = null

const { x: mouseX, y: mouseY, sourceType} = useMouse()
const { pressed } = useMousePressed()

const defineRenderer = () => {
  canvas = threeCanvas.value as HTMLCanvasElement
  renderer.value = new THREE.WebGLRenderer({canvas})
  renderer.value.setPixelRatio(window.devicePixelRatio)
  renderer.value.setSize(windowWidth.value, windowHeight.value)
}

const defineCamera = () => {
  camera.value = new THREE.PerspectiveCamera( 65, windowWidth.value / windowHeight.value, 0.1, 100);

  camera.value.position.setZ(20)
}

const defineLight = () => {
  pointLight = new THREE.PointLight(0xffffff, 50, 20)
  pointLight.position.set(2, 6, 6)
  scene?.add(pointLight)
}

const defineHelpers = () => {
  const lightHelper = new THREE.PointLightHelper(pointLight)
  scene?.add(lightHelper)
}

const defineControls = () => {
  controls = new OrbitControls(camera.value, (canvas as HTMLCanvasElement))
  controls.enableDamping = true
  controls.autoRotate = true
}

const addBall = () => {
  const geometry = new THREE.SphereGeometry(3, 64, 64)
  const material = new THREE.MeshStandardMaterial({
    color: 0x417EF0,
    roughness: 0.4
  })
  sphere = new THREE.Mesh(geometry, material);
  scene?.add(sphere)
}

const changeColor = () => {
  if(pressed.value) {
    const rgb = [
        200,
        Math.round((mouseX.value / windowWidth.value) * 255),
        Math.round((mouseY.value / windowHeight.value) * 255),
    ]

    const newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(sphere.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b
    })
  }
}

const init = () => {
  const { width, height } = useWindowSize()
  windowWidth.value = width.value
  windowHeight.value = height.value

  scene = new THREE.Scene();

  defineRenderer()
  defineCamera()
  defineLight()


  gsap.ticker.add(() => {
    renderer.value?.render((scene as Scene), camera.value)
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  controls?.update()
  changeColor()
}

onMounted(() => {
  init()
  addBall()
  defineControls()

  animate()

  // defineHelpers()
})
</script>

<template>
  <main>
    <canvas
      id="c"
      ref="threeCanvas"
    />

    <h1> Give it a spin</h1>
  </main>
</template>

<style scoped>
main {
  position: relative;
}

h1 {
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  text-align: center;
  top: 70vh;
  z-index: 100;
}
</style>
