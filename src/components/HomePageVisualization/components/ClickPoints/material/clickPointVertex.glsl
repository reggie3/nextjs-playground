varying vec3 vertexNormal;
varying vec2 vertexUV;

uniform float uTime;
uniform vec3 v3Color;

void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}