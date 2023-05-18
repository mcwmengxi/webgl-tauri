<script setup lang="ts">
import { onMounted } from "vue";
import { createGl, createShaderSource, createProgram, createBuffer } from '@/utils/webgl'

onMounted(()=>{
  const gl = createGl('#true-canvas')
  const vertex_code = `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
      gl_PointSize = 30.0;
    }
  `
  const fragment_code = `
    precision mediump float;
    uniform vec4 f_color;
    void main() {
      gl_FragColor = f_color;// 设置片元颜色
    }
    `
  const vertexShader = createShaderSource(gl, gl.VERTEX_SHADER, vertex_code)
  const fragmentShader = createShaderSource(gl, gl.FRAGMENT_SHADER, fragment_code)

  const program = createProgram(gl, vertexShader, fragmentShader)

  gengerateDrawParameter(gl, program)

  gl.clearColor(1, 1, 1, 1.0);
  // gl.clearColor(0, 1, 1, 1) // 设置清空颜色缓冲时的颜色值, 使用完全不透明的黑色清除所有图像
  gl.clear(gl.COLOR_BUFFER_BIT) // 用上面指定的颜色清空颜色缓冲区，也就是清空画布
  // 语法 gl.drawArrays(mode, first, count); mode - 指定绘制图元的方式 first - 指定从哪个点开始绘制 count - 指定绘制需要使用到多少个点
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  // gl.drawArrays(gl.POINTS, 0, 3)
})

const gengerateDrawParameter = (gl: WebGLRenderingContext, program) => {
  const color = gl.getUniformLocation(program, 'f_color')
  // 获取 f_color 变量位置
  gl.uniform4f(color, 0.93, 0, 0.56, 1) // 设置它的值

  const positon = gl.getAttribLocation(program, 'a_position')
  const vertices = new Float32Array([
    0, 0.5,
    0.5, 0,
    -0.5, -0.5
  ])
  const vertexAttribPointer =  { size:2 }
  // 获取 a_position 位置
  createBuffer(gl, gl.ARRAY_BUFFER, vertices, positon, vertexAttribPointer)
}
</script>

<template>
  <canvas id="true-canvas" width="500" height="200"></canvas>
  <div></div>
</template>
