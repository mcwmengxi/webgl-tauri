<template>
  <div> 
    <resize-observer v-bind="$attrs" @resize="onResize">
      <div class="box">
        <div class="box-content">
          <h1>Resize Observer</h1>
          <p>Resize Observer</p>
        </div>
      </div>
    </resize-observer>  
  </div>
</template>

<script setup lang="ts">
import ResizeObserver from '../../components/resize-observer/index'
  import { reactive } from 'vue';
  const onResize = (e: any) => {
    console.log(e);
  }
</script>

<style scoped lang="less">

</style>
