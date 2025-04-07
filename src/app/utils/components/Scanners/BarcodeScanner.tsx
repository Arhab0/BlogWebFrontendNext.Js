import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);
  const videoRef = "barcode-scanner";

  // Function to determine camera mode based on screen size
  const getCameraMode = () => (window.innerWidth <= 768 ? "environment" : "user");

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(videoRef);

      scannerRef.current
        .start(
          { facingMode: getCameraMode() }, // Auto-adjusts camera
          {
            fps: 10,
            qrbox: { width: 250, height: 100 },
            aspectRatio: 4,
          },
          (decodedText) => {
            if (!hasScannedRef.current) {
              hasScannedRef.current = true;
              setResult(decodedText);
              console.log("Barcode detected:", decodedText);
              scannerRef.current?.stop();
            }
          },
          (errorMessage) => {
            if (!errorMessage.includes("NotFoundException")) {
              console.warn("Barcode Scan Error:", errorMessage);
            }
          }
        )
        .catch((err) => console.error("Barcode scanning error:", err));
    }

    return () => {
      scannerRef.current?.stop().catch(() => {});
      scannerRef.current = null;
    };
  }, []);

  return (
    <div>
      <h3>Scan a Barcode</h3>
      <div id={videoRef} style={{ width: "100%", maxWidth: "400px", border: "2px solid black" }}></div>
      {result && <p>Scanned Code: {result}</p>}
    </div>
  );
};

export default BarcodeScanner;
