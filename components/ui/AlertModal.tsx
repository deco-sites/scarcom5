import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import type { JSX } from "preact";
import Icon from "../../components/ui/Icon.tsx";
import Button from "../../components/ui/Button.tsx";

type Props = JSX.IntrinsicElements["dialog"] & {
  loading?: "lazy" | "eager";
  onClose?: () => Promise<void> | void;
};

const AlertModal = (props: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { children, loading, open, onClose } = props;

  useEffect(() => {
    if (open === false) {
      ref.current && ref.current.close();
    } else if (open === true) {
      ref.current && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      class={`backdrop:bg-black backdrop:opacity-70 bg-transparent w-full h-full ${
        props.class ?? ""
      }`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex flex-col justify-center items-center`}
      >
        <div
          class={`relative w-auto rounded-lg bg-base-100 p-8 flex flex-col max-h-full overflow-auto`}
        >
          <Button
            class="btn absolute bg-transparent hover:bg-transparent border-none top-0 right-3 p-0 flex justify-center w-5 h-5"
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

          <div class="items-center flex-grow flex flex-col w-full">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default AlertModal;
