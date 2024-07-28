import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./helper";

const Grass: React.FC = () => {
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    [],
  );

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.1, 1, 1, 4);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  const meshRef = useRef<THREE.InstancedMesh>();

  const dummy = useMemo(() => new THREE.Object3D(), []); // Wrapped in useMemo

  useEffect(() => {
    const instanceNumber = 5000;

    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 10,
        0,
        (Math.random() - 0.5) * 10,
      );

      dummy.scale.setScalar(0.5 + Math.random() * 0.5);
      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    }

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]);

  useFrame(({ clock }) => {
    uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, null, 5000]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default Grass;
