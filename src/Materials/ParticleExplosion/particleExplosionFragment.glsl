varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;
uniform bool uUseNoise;

#define PI 3.14159265359

mat2 rotate(float uAge) {
  return (mat2(cos(uAge), sin(uAge), -sin(uAge), cos(uAge)));
}

void main() {

  float intensity = (uExplosionLifeSpan - uAge) / uExplosionLifeSpan;
  float brightness = 1.0;

  if(uUseNoise == true) {
    brightness = noise(gl_FragCoord.xy);
  }

  gl_FragColor = vec4(v3Color, brightness * intensity);
}