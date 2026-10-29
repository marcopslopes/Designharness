/*
 * One WebGL plasma shader, copied into a 2D canvas and punched into a
 * thin rounded-rect ring. data-metal-mode="fill" paints the whole host.
 */
export function mountMetal(host: HTMLElement): () => void {
  const VERT = `
    attribute vec2 a_position;
    void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
  `

  const FRAG = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_color1, u_color2, u_color3, u_color4, u_color5, u_color6, u_color7;
    uniform float u_alpha1, u_alpha2, u_alpha3, u_alpha4, u_alpha5, u_alpha6, u_alpha7;
    uniform float u_intensity, u_scale, u_direction;
    uniform float u_softness, u_distortion, u_complexity, u_shape;
    uniform float u_vignette, u_vigOpacity, u_blur, u_shaderOpacity;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289v2(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m; m = m * m;
      vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x_) - 0.5;
      vec3 ox = floor(x_ + 0.5);
      vec3 a0 = x_ - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p, float oct) {
      float val = 0.0, amp = 0.5;
      int n = int(oct);
      for (int i = 0; i < 7; i++) {
        if (i >= n) break;
        val += amp * snoise(p);
        p *= 2.0;
        amp *= 0.5;
      }
      return val;
    }

    float nfbm(vec2 p) { return fbm(p, 3.0 + u_complexity * 4.0); }

    vec3 palette(float t) {
      t = clamp(t, 0.0, 1.0);
      t = t * t * (3.0 - 2.0 * t);
      float k = 64.0;
      float w1 = u_alpha1 * exp(-k * t * t);
      float w2 = u_alpha2 * exp(-k * (t - 0.25) * (t - 0.25));
      float w3 = u_alpha3 * exp(-k * (t - 0.5)  * (t - 0.5));
      float w4 = u_alpha4 * exp(-k * (t - 0.75) * (t - 0.75));
      float w5 = u_alpha5 * exp(-k * (t - 1.0)  * (t - 1.0));
      float total = w1 + w2 + w3 + w4 + w5 + 0.0001;
      return (u_color1 * w1 + u_color2 * w2 + u_color3 * w3 +
              u_color4 * w4 + u_color5 * w5) / total;
    }

    vec2 warp(vec2 p, float t) {
      float str = u_distortion * 2.0;
      return vec2(
        nfbm(p + vec2(t * 0.1, 0.0)),
        nfbm(p + vec2(0.0, t * 0.12) + 5.0)
      ) * str;
    }

    vec3 computeEffect(vec2 uv, float aspect, float t, float dist, float cpx) {
      vec2 p = (uv - 0.5) * u_scale;
      p.x *= aspect;
      p += vec2(cos(u_direction), sin(u_direction)) * t * 0.15;
      float freq = 3.0 + cpx * 8.0;
      float val = 0.0;
      val += sin(p.x * freq + t);
      val += sin(p.y * freq + t * 1.3);
      val += sin((p.x + p.y) * freq * 0.7 + t * 0.7);
      val += sin(length(p) * freq * 0.8 - t * 1.5);
      vec2 w = warp(p, t);
      val += (w.x + w.y) * dist;
      val = val * 0.2 * u_intensity + 0.5;
      return palette(clamp(val, 0.0, 1.0));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float aspect = u_resolution.x / u_resolution.y;
      float t = u_time;
      vec3 col;
      if (u_blur < 0.01) {
        col = computeEffect(uv, aspect, t, u_distortion, u_complexity);
      } else {
        float r = u_blur * 0.02;
        col  = computeEffect(uv, aspect, t, u_distortion, u_complexity) * 0.4;
        col += computeEffect(uv + vec2( r, 0.0), aspect, t, u_distortion, u_complexity) * 0.15;
        col += computeEffect(uv + vec2(-r, 0.0), aspect, t, u_distortion, u_complexity) * 0.15;
        col += computeEffect(uv + vec2(0.0,  r), aspect, t, u_distortion, u_complexity) * 0.15;
        col += computeEffect(uv + vec2(0.0, -r), aspect, t, u_distortion, u_complexity) * 0.15;
      }
      col = pow(col, vec3(1.3));
      float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
      float vigPx = 40.0 / min(u_resolution.x, u_resolution.y);
      float vigRange = vigPx * (1.0 + u_vignette * 3.0);
      float vig = smoothstep(0.0, 1.0, edgeDist * edgeDist / (vigRange * vigRange));
      col *= mix(1.0, vig, u_vignette * u_vigOpacity);
      float alpha = 1.0 + 0.0 * (u_softness + u_shape + u_alpha6 + u_alpha7 + u_color6.x + u_color7.x);
      gl_FragColor = vec4(col, alpha * u_shaderOpacity);
    }
  `

  const PRESET = {
    colors: ['#000000', '#aae8ff', '#c5fe9e', '#f7888d', '#0d0d0d', '#fffdc3', '#007cff'],
    alphas: [1, 1, 1, 1, 1, 1, 1],
    direction: 80,
    speed: 1.2,
    intensity: 2,
    scale: 1.6,
    softness: 0.18,
    distortion: 0.3,
    complexity: 0.68,
    shape: 1,
    blur: 1,
    vignette: 0.26,
    vigOpacity: 0.6,
    shaderOpacity: 1,
  }

  const CANONICAL_PILL_W = 140
  const CANONICAL_PILL_H = 40
  const GL_SIZE = 192
  const FRAME_MS = 33
  type MetalInstance = {
    host: HTMLElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
  }
  type MetalShared = {
    canvas: HTMLCanvasElement
    gl: WebGLRenderingContext
    program: WebGLProgram
    uniforms: Record<string, WebGLUniformLocation | null>
    dpr: number
    startedAt: number
  }
  const instances: MetalInstance[] = []
  let shared: MetalShared | null = null
  let raf = 0
  let lastFrame = 0

  function hexToRgb(hex: string) {
    const raw = hex.replace('#', '')
    const n = parseInt(raw, 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }

  function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const shader = gl.createShader(type)
    if (!shader) throw new Error('metal-fx shader failed')
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'metal-fx shader failed')
    }
    return shader
  }

  function live() {
    if (!shared) throw new Error('metal-fx is not ready')
    return shared
  }

  function ensureShared() {
    if (shared) return shared
    const canvas = document.createElement('canvas')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = GL_SIZE * dpr
    canvas.height = GL_SIZE * dpr
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
    })
    if (!gl) return null

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const program = gl.createProgram()
    if (!program) throw new Error('metal-fx program failed')
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'metal-fx link failed')
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const names = [
      'u_resolution',
      'u_time',
      'u_color1',
      'u_color2',
      'u_color3',
      'u_color4',
      'u_color5',
      'u_color6',
      'u_color7',
      'u_alpha1',
      'u_alpha2',
      'u_alpha3',
      'u_alpha4',
      'u_alpha5',
      'u_alpha6',
      'u_alpha7',
      'u_intensity',
      'u_scale',
      'u_direction',
      'u_softness',
      'u_distortion',
      'u_complexity',
      'u_shape',
      'u_vignette',
      'u_vigOpacity',
      'u_blur',
      'u_shaderOpacity',
    ]
    const uniforms: Record<string, WebGLUniformLocation | null> = {}
    names.forEach((name) => {
      uniforms[name] = gl.getUniformLocation(program, name)
    })

    shared = { canvas, gl, program, uniforms, dpr, startedAt: performance.now() }
    uploadPreset()
    return shared
  }

  function hostNum(host: HTMLElement | undefined, name: string, fallback: number) {
    if (!host) return fallback
    const n = parseFloat(host.getAttribute(name) ?? '')
    return Number.isFinite(n) ? n : fallback
  }

  function hasShaderOverrides(host: HTMLElement) {
    return (
      host.hasAttribute('data-metal-waves') ||
      host.hasAttribute('data-metal-warp') ||
      host.hasAttribute('data-metal-zoom') ||
      host.hasAttribute('data-metal-amount') ||
      host.hasAttribute('data-metal-blur') ||
      host.hasAttribute('data-metal-flow')
    )
  }

  function uniform1(name: string, value: number) {
    const gpu = live()
    const loc = gpu.uniforms[name]
    if (loc) gpu.gl.uniform1f(loc, value)
  }

  function uploadPreset(host?: HTMLElement) {
    const { gl, uniforms, canvas } = live()
    if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height)
    PRESET.colors.forEach((color, index) => {
      const loc = uniforms[`u_color${index + 1}`]
      if (loc) {
        const [r, g, b] = hexToRgb(color)
        gl.uniform3f(loc, r, g, b)
      }
      uniform1(`u_alpha${index + 1}`, PRESET.alphas[index])
    })
    uniform1('u_intensity', hostNum(host, 'data-metal-amount', PRESET.intensity))
    uniform1('u_scale', hostNum(host, 'data-metal-zoom', PRESET.scale))
    uniform1('u_direction', (hostNum(host, 'data-metal-flow', PRESET.direction) * Math.PI) / 180)
    uniform1('u_softness', PRESET.softness)
    uniform1('u_distortion', hostNum(host, 'data-metal-warp', PRESET.distortion))
    uniform1('u_complexity', hostNum(host, 'data-metal-waves', PRESET.complexity))
    uniform1('u_shape', PRESET.shape)
    uniform1('u_vignette', PRESET.vignette)
    uniform1('u_vigOpacity', PRESET.vigOpacity)
    uniform1('u_blur', hostNum(host, 'data-metal-blur', PRESET.blur))
    uniform1('u_shaderOpacity', PRESET.shaderOpacity)
  }

  function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2)
    ctx.beginPath()
    ctx.moveTo(x + rr, y)
    ctx.arcTo(x + w, y, x + w, y + h, rr)
    ctx.arcTo(x + w, y + h, x, y + h, rr)
    ctx.arcTo(x, y + h, x, y, rr)
    ctx.arcTo(x, y, x + w, y, rr)
    ctx.closePath()
  }

  const clock = { startedAt: 0, frozen: 0, paused: false }

  function metalSpeed() {
    const attr = parseFloat(document.documentElement.getAttribute('data-metal-speed') ?? '')
    return Number.isFinite(attr) ? Math.max(0, attr) : PRESET.speed
  }

  function metalPaused() {
    return document.documentElement.hasAttribute('data-metal-paused') || metalSpeed() === 0
  }

  function shaderTime(now: number) {
    const speed = metalSpeed()
    const paused = metalPaused()
    if (!clock.startedAt) clock.startedAt = live().startedAt
    if (paused) {
      clock.paused = true
      return clock.frozen
    }
    if (clock.paused) {
      const resume = speed || PRESET.speed
      clock.startedAt = now - (clock.frozen / resume) * 1000
      clock.paused = false
    }
    clock.frozen = ((now - clock.startedAt) / 1000) * (speed || PRESET.speed)
    return clock.frozen
  }

  function renderShared(now: number) {
    const { gl, uniforms, canvas } = live()
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    if (uniforms.u_time) gl.uniform1f(uniforms.u_time, shaderTime(now))
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  function paintInstance(inst: MetalInstance) {
    const rect = inst.host.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pad = 4
    const cssW = rect.width + pad * 2
    const cssH = rect.height + pad * 2
    const w = Math.round(cssW * dpr)
    const h = Math.round(cssH * dpr)

    if (inst.canvas.width !== w) inst.canvas.width = w
    if (inst.canvas.height !== h) inst.canvas.height = h
    inst.canvas.style.width = `${cssW}px`
    inst.canvas.style.height = `${cssH}px`
    inst.canvas.style.left = `${-pad}px`
    inst.canvas.style.top = `${-pad}px`

    const ctx = inst.ctx
    ctx.clearRect(0, 0, w, h)

    const field = live().canvas
    const cw = field.width
    const ch = field.height
    const srcW = Math.min(cw, (w * (cw / (CANONICAL_PILL_W * dpr))) / 1.6)
    const srcH = Math.min(ch, (h * (ch / (CANONICAL_PILL_H * dpr))) / 1.6)
    const sx = Math.max(0, (cw - srcW) / 2)
    const sy = Math.max(0, (ch - srcH) / 2)

    const radius = Math.max(0, parseFloat(getComputedStyle(inst.host).borderRadius) || 0)
    const outerX = pad * dpr
    const outerY = pad * dpr
    const outerW = rect.width * dpr
    const outerH = rect.height * dpr
    const fill = inst.host.getAttribute('data-metal-mode') === 'fill'
    const ringAttr = parseFloat(inst.host.getAttribute('data-metal-ring') ?? '')
    const ring = (Number.isFinite(ringAttr) ? ringAttr : 3.5) * dpr

    ctx.save()
    roundedRect(ctx, outerX, outerY, outerW, outerH, radius * dpr)
    ctx.clip()
    ctx.globalAlpha = 0.98
    ctx.drawImage(field, sx, sy, srcW, srcH, 0, 0, w, h)
    ctx.globalAlpha = 1

    if (!fill) {
      ctx.globalCompositeOperation = 'destination-out'
      roundedRect(
        ctx,
        outerX + ring,
        outerY + ring,
        outerW - ring * 2,
        outerH - ring * 2,
        Math.max(0, radius * dpr - ring),
      )
      ctx.fill()
    }
    ctx.restore()

    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.lineWidth = 1 * dpr
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, 'rgba(255,255,255,.2)')
    grad.addColorStop(0.45, 'rgba(255,255,255,.85)')
    grad.addColorStop(1, 'rgba(255,255,255,.16)')
    ctx.strokeStyle = grad
    roundedRect(ctx, outerX + 0.5 * dpr, outerY + 0.5 * dpr, outerW - dpr, outerH - dpr, radius * dpr)
    ctx.stroke()
    ctx.restore()
  }

  function tick(now: number) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) raf = requestAnimationFrame(tick)
    if (reduce && lastFrame) return
    if (now - lastFrame < FRAME_MS) return
    lastFrame = now
    if (!shared || document.hidden || !host.isConnected) return
    const custom: MetalInstance[] = []
    const plain: MetalInstance[] = []
    instances.forEach((inst) => {
      if (hasShaderOverrides(inst.host)) custom.push(inst)
      else plain.push(inst)
    })
    if (plain.length) {
      uploadPreset()
      renderShared(now)
      plain.forEach(paintInstance)
    }
    custom.forEach((inst) => {
      uploadPreset(inst.host)
      renderShared(now)
      paintInstance(inst)
    })
  }

  function mount(host: HTMLElement) {
    if (!ensureShared()) return
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative'
    host.style.overflow = 'visible'
    host.style.isolation = 'isolate'

    const canvas = document.createElement('canvas')
    canvas.className = 'metal-fx-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    host.prepend(canvas)
    instances.push({ host, canvas, ctx })
    if (!raf) raf = requestAnimationFrame(tick)
  }

  mount(host)
  return () => {
    cancelAnimationFrame(raf)
    instances.forEach((inst) => inst.canvas.remove())
    if (shared) {
      const gl = shared.gl
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }
}
