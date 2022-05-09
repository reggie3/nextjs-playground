uniform sampler2D globeTexture;
uniform sampler2D bumpMap;
varying vec2 vertexUV;
varying vec3 vertexNormal;
varying vec3 vertexViewPosition;

void main() {
  // atmosphere
  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

 // globe texture
  vec4 globeTexture2D = texture2D(globeTexture, vertexUV);
  vec3 globeWithAtmosphere = atmosphere + globeTexture2D.xyz;

  // bump map
  vec3 bumpTextur2D = texture2D(bumpMap, vertexUV).xyz;

  gl_FragColor = vec4(globeWithAtmosphere, 1.0);
}