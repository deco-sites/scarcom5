import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { convertToPx } from "../utils/css.ts";

interface Props {
  description: string;
  className?: string;
  maxHeight?: string;
}

export default function ExpandableDescription({
  description,
  className,
  maxHeight = "10rem",
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const maxHeightInPx = convertToPx(maxHeight);
    const isOverflowing = element.scrollHeight > maxHeightInPx;

    setShowButton(isOverflowing);
  }, [description, maxHeight]);

  return (
    <div class="container px-5">
      <div class="relative overflow-hidden">
        <div
          ref={contentRef}
          class={`transition-all duration-300 ease-in-out ${className || ""}`}
          style={{
            maxHeight: isExpanded ? "100vh" : maxHeight,
            overflow: showButton && !isExpanded ? "hidden" : "visible",
          }}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {showButton && (
          <div
            class={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 transform bg-gradient-to-t from-white to-transparent transition-all duration-300 ease-in-out ${
              isExpanded
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          />
        )}
      </div>

      {showButton && (
        <button
          type="button"
          onClick={toggleExpanded}
          class="mt-6 flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-2 pt-[9px] text-xs font-bold text-primary transition-colors duration-300 ease-out hover:bg-primary hover:text-white"
        >
          <span class="-mt-1 block text-sm">{isExpanded ? "-" : "+"}</span>
          {isExpanded ? "FECHAR" : "LER MAIS"}
        </button>
      )}
    </div>
  );
}
