varying vec2 vertexUV;
varying vec3 vertexNormal;
uniform vec3 cameraPosition;

void main() {
    vertexUV = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vertexViewPosition = -mvPosition.xyz;

    vertexNormal = normalize(normalMatrix * normal);

    // return the transformed and projected vertex
    gl_Position = projectionMatrix * mvPosition;
}