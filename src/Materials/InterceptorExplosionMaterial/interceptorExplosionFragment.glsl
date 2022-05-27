varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;

void main() {
  float colorintensity = (sin(((uAge / uExplosionLifeSpan) - (vertexUV[1] + .75)) * 25.));
  float a = colorintensity * 0.25;
  vec3 scaledColor = v3Color * (colorintensity + .5);

  float alpha = cos((uAge / uExplosionLifeSpan) * 3.33) * vertexUV[0] * .5;

 // gl_FragColor = vec4(scaledColor, a);

  float intensity = sin((uAge / uExplosionLifeSpan) * pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0));
  gl_FragColor = vec4(v3Color, 1.0) * intensity;
}