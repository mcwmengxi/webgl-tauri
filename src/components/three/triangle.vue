<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('three-container') as HTMLElement
  const scene = new THREE.Scene()
  // 相机 
  /**
   *  视野角度（FOV） 长宽比（aspect ratio） 近截面（near）和远截面（far）
   */
  const camera = new THREE.PerspectiveCamera(75, el.offsetWidth / el.offsetHeight, 0.1, 1000)
  // 渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(el.offsetWidth, el.offsetHeight)
  el.appendChild(renderer.domElement)
  // 立方体
  // const geometry = new THREE.PlaneGeometry(1, 1)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 材质 染色
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // Mesh（网格）
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  camera.position.set(1, 1, 5)
  function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()
})

</script>

<template>
  <div ref="container" id="three-container"></div>
</template>
<style>
#three-container{
  width: 400px;
  height: 300px;
}
</style>
