uniform vec3 color;
uniform float intensity;
varying vec3 vertexNormal; // (0, 0, 0)

void main() {
  float glowIntensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(color, 1.0);
}