import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { Suspense } from "preact/compat";
import Button from "../../components/ui/Button.tsx";
import AlertModal from "../../components/ui/AlertModal.tsx";
import Icon from "../../components/ui/Icon.tsx";

interface Props {
  productID: Product["productID"];
}

// const notifyme = Runtime.create("deco-sites/std/actions/vtex/notifyme.ts");

const fallback = (
  <div class="flex justify-center items-center w-full h-full">
    <span class="loading loading-ring" />
  </div>
);

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const open = useSignal(false);

  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      // await notifyme({ skuId: productID, name, email });
      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
      open.value = true;
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="flex flex-col py-10 px-12 gap-5 bg-neutral-200 rounded-[10px]"
      onSubmit={handleSubmit}
    >
      <div class="flex flex-col gap-1">
        <span class="text-xl text-accent font-medium uppercase">
          Produto indisponível
        </span>
        <span class="text-sm font-normal text-[#727272]">
          Para ser avisado da disponibilidade deste produto, basta preencher os
          campos abaixo:
        </span>
      </div>

      <div class="flex flex-col gap-[10px]">
        <input
          placeholder="Digite seu nome"
          class="input input-bordered border-2 focus:outline-none input-sm !py-4"
          name="name"
        />
        <input
          placeholder="Digite seu email"
          class="input input-bordered border-2 focus:outline-none input-sm !py-4"
          name="email"
        />
      </div>

      <Button
        type="submit"
        class="btn-secondary font-medium h-[2.25rem] disabled:loading"
        disabled={loading}
      >
        Avise-me
      </Button>

      <AlertModal
        loading="lazy"
        id="alert-modal"
        open={open.value}
        class=""
        onClose={() => {
          open.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <>
            <Icon
              class="text-accent text-center mb-3"
              id="Email"
              width={30}
              height={30}
              strokeWidth={2}
            />
            <h2
              class={`uppercase text-base font-medium text-secondary text-center`}
            >
              Envio realizado com<br /> sucesso
            </h2>
            <p class={`text-center text-[#585858] text-sm`}>
              Assim que o produto estiver<br />{" "}
              disponível no site, avisamos<br /> você via e-mail.
            </p>
          </>
        </Suspense>
      </AlertModal>
    </form>
  );
}

export default Notify;
