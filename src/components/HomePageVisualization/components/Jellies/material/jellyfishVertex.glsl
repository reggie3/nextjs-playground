varying vec3 vertexNormal;
varying vec2 vertexUV;

uniform float uTime;
uniform vec3 v3Color;

void main() {
    vertexUV = uv;

    float displacement = (sin(uTime * 4.0 + vertexUV[1] / .2)) * .1 + 0.2;

    vertexNormal = normalize(normalMatrix * normal);

    // move the position along the normal and transform it
    vec3 newPosition = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}