<template>
  <div ref="dimense" id="three-dimense"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import avatar from '@/assets/avatar.png'
import { onMounted, ref } from 'vue'
onMounted(() => {
  const isWalking = ref(false)
  const el = document.getElementById('three-dimense') as HTMLDivElement
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, el.offsetWidth / el.offsetHeight, 0.1, 1000)
  camera.position.z = 2
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(el.offsetWidth, el.offsetHeight)
  el.appendChild(renderer.domElement)
  // 光源
  const light = new THREE.DirectionalLight(0x00ef28, 1.5)
  light.position.set(0,0,1.5)
  scene.add(light)
  // 已弃用 THREE.ImageUtils.getDataURL
  const walk = 'https://yys.res.netease.com/pc/gw/20180913151832/img/f4/txgc_6d0e9e5.png'
  const texture = new THREE.TextureLoader().load(walk, function(texture){
    console.log(texture);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.offset.x = 90/(2*Math.PI);
  }, function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },
  function ( xhr ) {
    console.log( 'An error happened' );
  })
  // const material = new THREE.MeshPhongMaterial({map:texture})
  const material = new THREE.MeshBasicMaterial({map:texture})
  const geometry = new THREE.PlaneGeometry( 1, 1, 1 );
  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const cube = new THREE.Mesh( geometry, material );
  // camera.position.set(1, 1, 2)
  camera.lookAt(cube.position)
  scene.add( cube );

  const clock = new THREE.Clock()
  const animate = () => {
    requestAnimationFrame(animate)
    console.log(cube.position.x);
    // const delta = clock.getDelta()
    // if(isWalking.value) {
      if(cube.position.x > 3) cube.position.x = -3
      cube.position.x += 0.01 
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera)
    // }
  }
  function onMouseUp(){
    renderer.domElement.addEventListener('mouseup', () => {
      isWalking.value = !isWalking.value
    },false)
  }
  animate()
  onMouseUp()
})

</script>
<style>
#three-dimense{
  width: 800px;
  height: 300px;
}
</style>
