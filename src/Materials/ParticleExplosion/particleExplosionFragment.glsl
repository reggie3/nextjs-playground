varying vec3 vertexNormal; // (0, 0, 0)
uniform float uAge;
varying vec2 vertexUV;
uniform vec3 v3Color;
uniform float uExplosionLifeSpan;

#define PI 3.14159265359


mat2 rotate(float uAge){
  return(mat2(cos(uAge), sin(uAge), -sin(uAge), cos(uAge)));
}

void main() {
  vertexUV -= 0.5;
  vertexUV = rotate(0.25*PI) * vertexUV;
  vertexUV += 0.5;

  float colorintensity = (sin(((uAge / uExplosionLifeSpan) - (vertexUV[1] + .75)) * 25.));
  float a = colorintensity * 0.25;
  vec3 scaledColor = v3Color * (colorintensity + .5);

  gl_FragColor = vec4(0.,0.,1., a);
}