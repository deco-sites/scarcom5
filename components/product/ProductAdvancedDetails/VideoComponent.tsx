import { useEffect, useRef, useState } from "preact/hooks";

export interface Props {
  /** @description Iframe do YouTube ou do Vimeo. Usar 1920 como width(Largura) */
  videoHtml?: string;
}

const VideoComponent = ({ videoHtml = "" }: Props) => {
  const [current_width, set_current_width] = useState(1920);
  const container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container_ref.current) {
      set_current_width(container_ref.current.clientWidth);
    }
  }, []);

  const aspect_ratio_full_hd = 1.7777778;
  const height_correct = current_width / aspect_ratio_full_hd;

  return (
    <div
      ref={container_ref}
      width={1920}
      height={1080}
      style={{
        height: height_correct,
        maxHeight: height_correct,
      }}
      class="w-full h-full"
      dangerouslySetInnerHTML={{ __html: videoHtml }}
    />
  );
};

export default VideoComponent;
