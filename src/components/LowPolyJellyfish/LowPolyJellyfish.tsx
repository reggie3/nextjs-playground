/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: n- (https://sketchfab.com/n-)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-jellyfish-9dd7cfb4fb30436d82454e3d472d28b3
title: low-poly? jellyfish
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_469: THREE.Mesh;
    GLTF_created_0_rootJoint: THREE.Bone;
  };
  materials: {
    Jelly_mat: THREE.MeshBasicMaterial;
    Tri_mat: THREE.MeshBasicMaterial;
  };
};

type ActionName = "loop";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Model({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/gltf/lowPolyJellyfish/scene-transformed.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[0, 0.39, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Jelly_Arm_461">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <group name="Jelly_mesh_460" />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Jelly_mat}
                    skeleton={nodes.Object_7.skeleton}
                  />
                </group>
              </group>
              <group name="Tri_mesh_462">
                <mesh
                  name="Object_469"
                  geometry={nodes.Object_469.geometry}
                  material={materials.Tri_mat}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/gltf/lowPolyJellyfish/scene-transformed.glb");
