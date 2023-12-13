<script setup lang="ts">
import * as THREE from "three";
import gsap from 'gsap'
import {Camera, Scene} from "three";
import {useWindowSize, useMouse, useMousePressed} from "@vueuse/core/index";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/vertex.glsl?raw'
import fragmentShader from './shaders/fragment.glsl?raw'
import atmosphereVertexShader from './shaders/atmosphere.glsl?raw'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl?raw'

console.log(vertexShader)

const threeCanvas = ref()
let scene: Scene | null = null
let camera: Camera | null = null
const renderer= ref()
const windowWidth = ref()
const windowHeight = ref()

let pointLight: any = null
let sphere: any = null
let stars: any = null

let canvas: HTMLCanvasElement | null = null
let controls: OrbitControls | null = null

/*const { x: mouseX, y: mouseY } = useMouse()
const { pressed } = useMousePressed()*/

const defineRenderer = () => {
  canvas = threeCanvas.value as HTMLCanvasElement
  renderer.value = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.value.setPixelRatio(window.devicePixelRatio)
  renderer.value.setSize(windowWidth.value, windowHeight.value)
}

const defineCamera = () => {
  camera = new THREE.PerspectiveCamera( 65, windowWidth.value / windowHeight.value, 0.1, 1000);

  camera.position.setZ(10)
}

const defineLight = () => {
  pointLight = new THREE.HemisphereLight(0xffffff, 0x000000, 3)
  pointLight.position.set(2, 6, 6)
  scene?.add(pointLight)
}

const defineHelpers = () => {
  const lightHelper = new THREE.PointLightHelper(pointLight)
  scene?.add(lightHelper)
}

const defineControls = () => {
  controls = new OrbitControls((camera as Camera), (canvas as HTMLCanvasElement))
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 1
}

const addGlobe = () => {
  const geometry = new THREE.SphereGeometry(3, 64, 64)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./globe.jpg')
      }
    }
  })
  sphere = new THREE.Mesh(geometry, material);
  scene?.add(sphere)
}

const addAtmo = () => {
  const geometry = new THREE.SphereGeometry(3, 64, 64)
  const material = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })

  const atmosphere = new THREE.Mesh(geometry, material)

  atmosphere.scale.set(1.15, 1.15, 1.15)
  scene?.add(atmosphere)
}

const addStars = () => {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff})

  const starVerticles = []

  for(let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 1000

    starVerticles.push(x, y, z)
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVerticles, 3))

  stars = new THREE.Points(starGeometry, starMaterial)
  // scene?.add(stars)

  scene?.add((camera as Camera))
  camera?.add(stars)
  stars.position.set(0, 0, -100)
  console.log(stars)
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
    renderer.value?.render((scene as Scene), camera)
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  controls?.update()
}

onMounted(() => {
  init()
  addGlobe()
  addAtmo()
  addStars()

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
  </main>
</template>

<style scoped>
main {
  position: relative;
}
</style>
