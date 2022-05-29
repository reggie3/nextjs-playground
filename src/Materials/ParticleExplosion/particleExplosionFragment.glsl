varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;

void main() {
  float intensity = (uExplosionLifeSpan - uAge) / uExplosionLifeSpan;

  gl_FragColor = vec4(v3Color * intensity, intensity);
}