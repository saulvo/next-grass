import React from "react";

const Light = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default Light;
