varying vec3 vertexNormal;
varying vec2 vertexUV;
uniform float uTime;

void main() {
    vertexUV = uv;

    float displacement = (sin(uTime * 4.0 + vertexUV[1] / .5)) * .15 + 0.37;

    vertexNormal = normalize(normalMatrix * normal);

    // move the position along the normal and transform it
    vec3 newPosition = position * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}