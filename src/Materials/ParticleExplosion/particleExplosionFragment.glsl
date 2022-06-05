varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;
uniform bool uUseNoise;

#pragma glslify: noise = require(glsl-noise/simplex/2d)

void main() {

  float intensity = (uExplosionLifeSpan - uAge) / uExplosionLifeSpan;
  float brightness = 1.0;

  if(uUseNoise == true) {
    brightness = noise(gl_FragCoord.xy);
  }

  gl_FragColor = vec4(v3Color, brightness * intensity);
}