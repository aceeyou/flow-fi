import { useState, useEffect, useCallback } from "react";

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function calculateLuminance(rgb: { r: number; g: number; b: number }) {
  return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
}

function useIsColorBright(hexColor: string, threshold = 0.5) {
  const [isBright, setIsBright] = useState(false);

  const updateBrightness = useCallback(
    (color: string) => {
      if (!color || typeof color !== "string" || !color.startsWith("#")) {
        setIsBright(false);
        return;
      }

      const rgb = hexToRgb(color);
      const luminance = calculateLuminance(rgb);
      setIsBright(luminance > threshold);
    },
    [threshold]
  );

  useEffect(() => {
    updateBrightness(hexColor);
  }, [hexColor, updateBrightness]);

  return isBright;
}

export default useIsColorBright;
