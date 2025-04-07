import React from "react";

interface BackgroundOverlayProps {
  setIsOpen: (bool: boolean) => void;
}

function BackgroundOverlay({ setIsOpen }: BackgroundOverlayProps) {
  return (
    <div
      className="fixed inset-0 bg-black opacity-50 z-10"
      onClick={() => setIsOpen(false)} // Close modal on overlay click
    ></div>
  );
}

export default BackgroundOverlay;
