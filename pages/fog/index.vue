<script setup lang="ts">
import * as THREE from "three";
import gsap from 'gsap'

import {Camera, Clock, Mesh, Scene} from "three";
import {useWindowSize} from "@vueuse/core/index";
import type {Ref} from "vue";

const threeCanvas = ref()
let scene: Scene | null = null
let camera: Camera | null = null
let pointLight: any = null
let clock: Clock | null = null
const delta = ref(0)
const renderer = ref()

const windowWidth = ref()
const windowHeight = ref()
const smokeTexture: Ref | null = ref()
const smokeGeometry: Ref | null = ref()
const smokeMaterial: Ref | null = ref()
const smokeParticles: Mesh[] = []

let canvas: HTMLCanvasElement | null = null

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
  camera = new THREE.PerspectiveCamera( 75, windowWidth.value / windowHeight.value, 1, 1000);

  camera.position.setZ(1000)
}

const defineLight = () => {
  pointLight = new THREE.HemisphereLight(0xd6e6ff, 0xa38c08, 1)
  pointLight.position.set(2, 6, 6)
  scene?.add(pointLight)
}

const addFog = (scene: Scene) => {
  scene.fog = new THREE.Fog(0xc0f0ff, 0.0015)
}

const addSmoke = () => {
  smokeTexture.value = new THREE.TextureLoader().load('./assets/smoke.png')
  smokeTexture.value.encoding = THREE.SRGBColorSpace

  smokeGeometry.value = new THREE.PlaneGeometry(600, 600)
  smokeMaterial.value = new THREE.MeshLambertMaterial({
    map: smokeTexture.value,
    emissive: 0x222222,
    opacity: 0.10,
    transparent: true
  })

  for(let i = 0; i <40; i++) {
    const smokeElement = new THREE.Mesh(smokeGeometry.value, smokeMaterial.value)
    smokeElement.scale.set(2, 2, 2)

    smokeElement.position.set(Math.random()* 1000 - 500, Math.random()* 1000 - 500, Math.random()* 1000 - 100)
    smokeElement.rotation.z = Math.random() * 360

    scene?.add(smokeElement)
    smokeParticles.push(smokeElement)
  }
}

const init = () => {
  const { width, height } = useWindowSize()
  clock = new THREE.Clock()

  windowWidth.value = width.value
  windowHeight.value = height.value

  scene = new THREE.Scene();

  addFog(scene)

  defineRenderer()
  defineCamera()
  defineLight()


  gsap.ticker.add(() => {
    renderer.value?.render((scene as Scene), camera, {antialias: true})
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  delta.value = (clock as Clock).getDelta()

  for (let i = 0; i < smokeParticles.length; i++) {
    smokeParticles[i].rotation.z += (delta.value * 0.1)
  }
}

onMounted(() => {
  init()
  addSmoke()
  animate()
})

</script>

<template>
  <div>
    <canvas
      id="c"
      ref="threeCanvas"
      width="500"
      height="500"
    />
  </div>
</template>
