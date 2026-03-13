import Button from "../../components/ui/Button.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  menuIcon?: AvailableIcons;
  showHeader?: boolean;
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:max-w-lg",
  "sidebar-left": "h-full w-full sm:max-w-lg",
  center: "",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  // menuIcon,
  showHeader,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  // deno-lint-ignore no-explicit-any
  function closeDialog(event: any) {
    if (!event.target.contains(ref.current)) return;
    onClose && onClose();
  }

  useEffect(() => {
    if (open === false) {
      document
        .getElementsByTagName("body")
        .item(0)
        ?.classList.remove("no-scroll");
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add("no-scroll");
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  useEffect(() => {
    document.addEventListener("click", closeDialog);
  }, [ref]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`m-0 h-full max-h-full w-full max-w-[87.5%] bg-transparent p-0 backdrop-opacity-50 backdrop:bg-black backdrop:opacity-80 lg:max-w-[40%] ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      onClose={onClose}
    >
      <section
        class={`flex h-full w-full bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`flex max-h-full w-full flex-col overflow-auto bg-base-100 ${
            containerStyles[mode]
          }`}
        >
          {showHeader && (
            <header class="mx-5 mb-[10.5px] mt-4 flex items-center justify-between border-b-[1px] border-solid border-[#F7F7F7] lg:mx-10">
              <h2 className="flex items-center justify-between gap-1">
                <span class="text-xl font-medium text-base-content lg:text-xl">
                  {title}
                </span>
              </h2>
              <Button
                class="btn btn-ghost flex h-4 w-12 justify-center p-0"
                onClick={onClose}
              >
                <Icon
                  class="text-base-content"
                  id="XMark"
                  width={25}
                  height={25}
                  strokeWidth={2}
                />
              </Button>
            </header>
          )}
          <div class="flex w-full flex-grow flex-col">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
