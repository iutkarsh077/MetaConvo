"use client";
import { Spinner } from "@nextui-org/react";
const RedLoadingCircle = () => {
  return (
    <div className="flex justify-center mt-56 items-center">
      <Spinner
        color="warning"
        labelColor="foreground"
      />
    </div>
  );
};

export default RedLoadingCircle;
