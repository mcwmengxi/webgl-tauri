<script setup lang="ts">
import { onMounted } from "vue";
import { getCanvas, createGl, createShaderSource, createProgram, createBuffer } from '@/utils/webgl'

onMounted(()=>{
  const canvas = getCanvas('#gradient-triangle-canvas')
  const gl = createGl('#gradient-triangle-canvas')
  const vertex_code = `
		//浮点数设置为中等精度
		precision mediump float;
		//接收 JavaScript 传递过来的点的坐标（X, Y）
		attribute vec2 a_Position;
		// 接收canvas的尺寸。
		attribute vec2 a_Screen_Size;
		//接收 JavaScript 传递过来的点的颜色信息（R, G, B, A）
		attribute vec4 a_Color;
		//将顶点着色器插值后的颜色颜色信息（R, G, B, A）传递给片元着色器。
		varying vec4 v_Color;
		void main(){
			// 将 canvas 的坐标值 转换为 [-1.0, 1.0]的范围。
			vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
			// canvas的 Y 轴坐标方向和 设备坐标系的相反。
			position = position * vec2(1.0, -1.0);
			// 最终的顶点坐标。
			gl_Position = vec4(position, 0.0, 1.0);

			v_Color = a_Color;
		}
  `
  const fragment_code = `
    precision mediump float;
		//用来接收顶点着色器传递过来的颜色。
		varying vec4 v_Color;

		void main(){
			// 将颜色处理成 GLSL 允许的范围[0， 1]。
			vec4 color = v_Color / vec4(255, 255, 255, 1);
			gl_FragColor = color;
		}
  `
  const vertexShader = createShaderSource(gl, gl.VERTEX_SHADER, vertex_code) as WebGLShader
  const fragmentShader = createShaderSource(gl, gl.FRAGMENT_SHADER, fragment_code) as WebGLShader

  const program = createProgram(gl, vertexShader, fragmentShader)

  gengerateDrawParameter(gl, program)
  let a_Screen_Size = gl.getAttribLocation(program, 'a_Screen_Size')
  gl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height)
  //顶点坐标数组
  let positions = [];
  //顶点颜色数组
  let colors = [];

  let a_Position = gl.getAttribLocation(program, 'a_Position');
  let a_Color = gl.getAttribLocation(program, 'a_Color');
  //创建坐标缓冲区
  let positionBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(positions), a_Position, {
    size : 2
  });
  //创建颜色缓冲区
  let colorBuffer = createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(colors), a_Color, {
    size : 4
  });

  gl.clearColor(.1, 1, 1, 1.0);
  // gl.clearColor(0, 1, 1, 1) // 设置清空颜色缓冲时的颜色值, 使用完全不透明的黑色清除所有图像
  gl.clear(gl.COLOR_BUFFER_BIT) // 用上面指定的颜色清空颜色缓冲区，也就是清空画布
  // 语法 gl.drawArrays(mode, first, count); mode - 指定绘制图元的方式 first - 指定从哪个点开始绘制 count - 指定绘制需要使用到多少个点
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  // gl.drawArrays(gl.POINTS, 0, 3)

  canvas.addEventListener('click', e => {
    console.log(e.pageX, e.pageY);
    
  })
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
  <canvas id="gradient-triangle-canvas" width="500" height="200"></canvas>
</template>
