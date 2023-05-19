export const $$ = (str: string) => {
  if (!str) return null;
  if (str.startsWith('#')) {
    return document.querySelector(str);
  }
  let result = document.querySelectorAll(str);
  if (result.length == 1) {
    return result[0];
  }
  return result;
}

export const getCanvas = (id: string) => {
  return $$(id);
}
export const randomColor = () => {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: Math.random() * 1
  };
}
export const createGl = (id: string) => {
  const canvasEl = document.querySelector(id) as HTMLCanvasElement
  // 判断浏览器webGL兼容性
  if(!canvasEl.getContext('webgl')&& !canvasEl.getContext('experimental-webgl')) {
    console.log("Your Browser Doesn't Support WebGL");
  }
  const ctx = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl') as WebGLRenderingContext
  /* 
    设置视口 context.viewport(x, y, width, height);
    x: 用来设定视口的左下角水平坐标。默认值：0
    y: 用来设定视口的左下角垂直坐标。默认值：0
    width: 用来设定视口的宽度。默认值：canvas 的宽度
    height: 用来设定视口的高度。默认值：canvas 的高度
    当你第一次创建 WebGL 上下文的时候，视口的大小和 canvas 的大小是匹配的。然而，如果你重新改变了canvas的大小，你需要告诉 WebGL 上下文设定新的视口，因此这里作为初次创建这行代码可以省略
  */
  // ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.hieght)
  return ctx
}
// 创建着色器代码
export const createShaderSource = (gl:WebGLRenderingContext, shader_type, shader_code: string) => {
    // 顶点着色器 此处 type 为枚举型值为 gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER 两者中的一个
    const shader = gl.createShader(shader_type) as WebGLShader
    // 编写顶点着色器的GLSL代码语法 gl.shaderSource(shader, source); shader - 用于设置程序代码的webglShader（着色器对象) source - 包含GLSL程序代码的字符串
    gl.shaderSource(shader, shader_code)// 设置顶点位置
    gl.compileShader(shader) // 编译着色器代码
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) return shader

    console.error('shader err >>>', shader_type, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader);
}
export const createProgram = (gl:WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
  // 创建一个程序用于连接顶点着色器和片元着色器
  const program = gl.createProgram() as WebGLProgram
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program) // 连接 program 中的着色器
  gl.useProgram(program) // 告诉 WebGL 用这个 program 进行渲染

  const res = gl.getProgramParameter(program,gl.LINK_STATUS)
  if(res) {
    return program
  }
  console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
/**
 * 
 * @param gl 
 * @param target 要绑定的缓冲区对象（无法直接操作缓冲区对象）
 * @param vertices 向缓存区写入对象时提供的一个类型化数组
 * @param attribute 分配缓冲区数据给attribute
 * @param size 每个顶点分配到的缓冲区数据的个数
 */
export const createBuffer = (gl: WebGLRenderingContext, target = gl.ARRAY_BUFFER, vertices, attribute, vertexAttribPointer) => {
  const {} = vertexAttribPointer
  let {size, type, normalize, stride, offset} = vertexAttribPointer;
  // 创建的顶点缓冲对象
  const buffer = gl.createBuffer()
  gl.bindBuffer(target, buffer)
  // 创建的顶点缓冲对象，默认绑定到gl.ARRAY_BUFFER,对gl.ARRAY_BUFFER的操作都会映射到这个缓存，类似Proxy
  gl.bufferData(target, vertices, gl.STATIC_DRAW)
  //将缓冲区数据分配到attribute变量
  gl.vertexAttribPointer(attribute, size, type || gl.FLOAT, normalize || false, stride || 0, offset || 0)
  // 开启attribute变量，使顶点着色器能够访问缓冲区数据
  gl.enableVertexAttribArray(attribute)
  return buffer
}

export const resizeCanvas = (canvas: HTMLCanvasElement, width?: number, height?: number) => {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}
