uniform vec3 color;
uniform float intensity;
varying vec3 vertexNormal; // (0, 0, 0)

void main() {

  gl_FragColor = vec4(color.r + intensity, color.g + intensity, color.b + intensity, 1);

  // gl_FragColor = vec4(color, 1.0) * glowIntensity;
}