varying vec3 vertexNormal;
varying vec2 vertexUV;
uniform float uAge;
uniform vec3 uRotationRandomSpeed;

#pragma glslify: rotate = require(glsl-rotate)

const float ROTATION_BASE_SPEED = 1.75;

void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);

    mat4 vPosition;

    float xRotationSpeed = ROTATION_BASE_SPEED * uRotationRandomSpeed.x;
    float yRotationSpeed = ROTATION_BASE_SPEED * uRotationRandomSpeed.y;
    float zRotationSpeed = ROTATION_BASE_SPEED * uRotationRandomSpeed.z;

    // https://gist.github.com/jeanlescure/e27c93b73a10b64e85e4
    mat4 rXPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, cos(uAge / xRotationSpeed), -sin(uAge / xRotationSpeed), 0.0), vec4(0.0, sin(uAge / xRotationSpeed), cos(uAge / xRotationSpeed), 0.0), vec4(0.0, 0.0, 0.0, 1.0));

    mat4 rYPos = mat4(vec4(cos(uAge / yRotationSpeed), 0.0, sin(uAge / yRotationSpeed), 0.0), vec4(0.0, 1.0, 0.0, 0.0), vec4(-sin(uAge / yRotationSpeed), 0.0, cos(uAge / yRotationSpeed), 0.0), vec4(0.0, 0.0, 0.0, 1.0));

    mat4 rZPos = mat4(vec4(cos(uAge / zRotationSpeed), -sin(uAge / zRotationSpeed), 0.0, 0.0), vec4(sin(uAge / zRotationSpeed), cos(uAge / zRotationSpeed), 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0));

    vPosition = rXPos * rZPos * rYPos;

    gl_Position = projectionMatrix * modelViewMatrix * vPosition * vec4(position, 1.0);

}