varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;

void main() {
  float colorintensity = (sin(((uAge / uExplosionLifeSpan) - (vertexUV[1] + .75)) * 25.));
  float a = colorintensity * 0.25;
  vec3 scaledColor = v3Color * (colorintensity + .5);

  gl_FragColor = vec4(scaledColor, a);
}