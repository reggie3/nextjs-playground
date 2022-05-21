uniform float uTime;
varying vec2 vertexUV;
uniform vec3 v3Color;

void main() {
    float multiplier = (cos(uTime * 4.0 + vertexUV[1] / .4)) * .3 + 1.0;
    float a = multiplier;
    vec3 scaledColor = v3Color * multiplier;
    gl_FragColor = vec4(scaledColor, a);
}