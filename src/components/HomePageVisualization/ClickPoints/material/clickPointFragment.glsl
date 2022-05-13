uniform float uTime;
varying vec2 vertexUV;
uniform vec3 v3Color;

void main() {
    float multiplier = sin(uTime * 4.0 + vertexUV[1] / .1) * .3 + .7;

    float a = multiplier;
    vec3 scaledColor = v3Color * multiplier;
    gl_FragColor = vec4(scaledColor, a);
}