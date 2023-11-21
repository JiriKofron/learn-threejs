<script setup lang="ts">

import {WebGLRenderer} from "three";
import {useWindowSize} from "@vueuse/core/index";
import * as THREE from "three";
import gsap from 'gsap'

const threeCanvas = ref()
let scene: any = null
const camera = ref()
let renderer: WebGLRenderer | null = null
const windowWidth = ref()
const windowHeight = ref()

const addCube = (dims: Record<string, number>, position: Record<string, number>,  color: any) => {
  const geometry = new THREE.BoxGeometry(dims.width, dims.height, dims.depth)
  const material = new THREE.MeshLambertMaterial({color: color})
  const cube = new THREE.Mesh( geometry, material)

  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;

  cube.rotation.x = 0.4
  return cube
}

const init = () => {
  camera.value.position.z = 10

  gsap.ticker.add(() => {
    renderer?.render(scene, camera.value)
  })
}

const addFog = () =>{
  console.log('fog added')
  scene.fog = new THREE.Fog(0xCC223A, 0.015, 30)
  // console.log(scene.fog)
}

const addAmbientLight = () => {
  console.log('ambient light added')
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 )

  hemiLight.color.setHSL( 0.8, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 0, -7 );
  scene.add(hemiLight)
}

onMounted(() => {
  const canvas = threeCanvas.value as HTMLCanvasElement
  const { width, height } = useWindowSize()
  windowWidth.value = width.value
  windowHeight.value = height.value
  scene = new THREE.Scene()
  scene.background = new THREE.Color().setHSL( 0, 100, 0 );
  camera.value = new THREE.PerspectiveCamera(75, windowWidth.value / windowHeight.value, 1, 1000)
  camera.value.position.set(0, 0, 250)

  renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(width.value, height.value)

  addFog()
  addAmbientLight()
  const cube1= addCube({
    width: 0.5,
    height: 0.5,
    depth: 0.5
  },
      {
        x: -3,
        y: 0,
        z: 0
      },
      0x00ff00
  )

  scene.add(cube1)

 const cube2 = addCube({
    width: -0.3,
    height: -0.3,
    depth: -0.3
  },{
    x: 4,
    y: 2,
    z: -10
  }, 0x00fff0)

  scene.add(cube2)

  const t = ref(0)
  const animate = () => {
    requestAnimationFrame(animate)
    t.value += 0.02
    cube1.position.x = 2 * Math.cos(t.value)
    cube1.position.y =  Math.sin(t.value)
    cube1.position.z = 2 * Math.sin(t.value)

    cube2.position.x =  5 * Math.cos(t.value)
    cube2.position.y = 0.4 * Math.sin(t.value)
    cube2.position.z = Math.sin(t.value)
  }

  init()
  animate()
})

</script>

<template>
  <main>
    <h1>Orbit</h1>

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
