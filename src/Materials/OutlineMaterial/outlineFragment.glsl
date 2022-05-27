varying vec3 vertexNormal; // (0, 0, 0)
void main() {
  float intensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
  vec3 newColor = vec3(0.3, 1, 0.96) * intensity;
  if(intensity < .3) {
    gl_FragColor = vec4(1., 1., 1., 0.);
  } else {
    gl_FragColor = vec4(newColor, 1.0 * intensity);
  }
}