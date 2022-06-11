varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;

void main() {
  // float colorintensity = (sin(((uAge / uExplosionLifeSpan) - (vertexUV.y + .75)) * 25.));
  float colorIntensity = 1.0;
  float a = colorIntensity;

  float horizontalColorStrips = 1.0 - (sin(((1.0 - vertexUV.y) * uAge) / 0.03));
  vec3 movingColor = v3Color * horizontalColorStrips;

  vec3 scaledColor = v3Color * (colorIntensity + 0.7);
  float alpha = step(0.5, horizontalColorStrips);

  gl_FragColor = vec4(movingColor, alpha - 0.25);
}