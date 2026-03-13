import { useEffect, useState } from "preact/hooks";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const checkWindowResolution = () => {
    const windowWidth = globalThis.window.innerWidth;
    const isMobileDevice = windowWidth <= 1024;

    setIsMobile(isMobileDevice);
  };
  useEffect(() => {
    checkWindowResolution();

    addEventListener("resize", checkWindowResolution);

    return () => {
      removeEventListener("resize", checkWindowResolution);
    };
  }, []);
  const handleResize = () => {
    checkWindowResolution();
  };

  useEffect(() => {
    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobile;
}
