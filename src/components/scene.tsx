"use client";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Grass from "./grass";
import Light from "./light";
import { Suspense } from "react";

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [8, 5, 3] }}>
      {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
      <Light />
      <Suspense fallback={<div>loading....</div>}>
        <Grass />
      </Suspense>
      <OrbitControls
      // minPolarAngle={Math.PI / 2.5}
      // maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
};

export default Scene;
