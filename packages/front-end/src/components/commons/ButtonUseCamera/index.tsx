"use client"
import Image from "next/image";
import React from "react";

export default function ButtonUseCamera() {
  const openCamera = () => {};
  return (
    <button
      className="w-full btn bg-buttonGreen tex-xs text-white"
      onClick={openCamera}
    >
      <Image width={16} height={16} src="/icons/camera-icon.svg" alt="or img" />
      <p>Use Camera</p>
    </button>
  );
}
