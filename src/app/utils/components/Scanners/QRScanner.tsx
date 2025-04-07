import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText: string) => {
        onScanSuccess(decodedText); // Pass scanned data
        scanner.clear(); // Stop scanner after successful scan
      },
      (errorMessage: string) => {
        if (!errorMessage.includes("NotFoundException")) {
          console.warn("QR Scan Error:", errorMessage); // Log only real errors
        }
      }
    );

    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Failed to clear scanner:", err));
    };
  }, [onScanSuccess]);

  return <div id="qr-reader"></div>;
};

export default QRScanner;
