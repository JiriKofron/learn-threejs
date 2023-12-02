<script setup lang="ts">
import * as THREE from "three";
import gsap from 'gsap'

const scene = new THREE.Scene()
const renderrer = new THREE.WebGLRenderer
const init = () => {
  gsap.ticker
}

onMounted(() => {

})
</script>

<template>
  <main>
    <h1>Ball</h1>

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
