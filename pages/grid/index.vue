<script setup lang="ts">
import * as THREE from "three";
import gsap from "gsap";
import {Scene} from "three";
import {onMounted} from "vue";
import {useWindowSize} from "@vueuse/core/index";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const threeCanvas = ref()
let scene: Scene | null = null
const camera = ref()
const renderer= ref()
const windowWidth = ref()
const windowHeight = ref()

let torus: any = null
let pointLight: any = null

const init = () => {
  const { width, height } = useWindowSize()
  windowWidth.value = width.value
  windowHeight.value = height.value

  scene = new THREE.Scene();

  defineRenderer()
  defineCamera()

  gsap.ticker.add(() => {
    renderer.value?.render((scene as Scene), camera.value)
  })
}

const defineRenderer = () => {
  const canvas = threeCanvas.value as HTMLCanvasElement
  renderer.value = new THREE.WebGLRenderer({canvas})
  renderer.value.setPixelRatio(window.devicePixelRatio)
  renderer.value.setSize(windowWidth.value, windowHeight.value)
}

const defineCamera = () => {
  camera.value = new THREE.PerspectiveCamera( 75, windowWidth.value / windowHeight.value, 0.1, 1000);

  camera.value.position.setZ(30)
}

const addTorus = () => {
  const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial( {color: 0xFF6347})
  torus = new THREE.Mesh(geometry, material)
  scene?.add(torus)
}

const defineLight = () => {
  pointLight = new THREE.PointLight(0xffffff)
  const ambientLight = new THREE.AmbientLight(0xffffff);
  pointLight.position.set(5, 5, 5)
  scene?.add(pointLight, ambientLight)
}
const animate = () => {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.01
  torus.rotation.z += 0.01
}

const defineHelpers = () => {
  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  scene?.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera.value, renderer.value.domElement)
}

onMounted(() => {
  init()
  defineLight()

  defineHelpers()

  addTorus()
  animate()
})
</script>

<template>
  <main>
    <h1>Grid</h1>

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
