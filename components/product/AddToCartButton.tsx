import Button from "../../components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "../../sdk/useAddToCart.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useEffect } from "preact/compat";
import AlertModal from "../../components/ui/AlertModal.tsx";
import { useSignal } from "@preact/signals";
import { Suspense } from "preact/compat";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  label?: string;
  classes?: string;
  showIcon?: boolean;
  availability?: string;
  url?: string;
}

const fallback = (
  <div class="flex justify-center items-center w-full h-full">
    <span class="loading loading-ring" />
  </div>
);

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    label,
    classes,
    quantity,
    showIcon,
    availability,
    url,
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  let disabled;
  (availability === "https://schema.org/InStock" || availability == undefined)
    ? disabled = false
    : disabled = true;
  const open = useSignal(false);

  useEffect(() => {
    if (props?.loading) {
      open.value = true;
    }
  }, [props?.loading]);

  return (
    <>
      {!disabled
        ? (
          <Button data-deco="add-to-cart" {...props} class={classes}>
            <p class="flex gap-2 items-center justify-center">
              {showIcon && <Icon id="ShoppingCart" width={20} height={20} />}
              <span class="lg:hidden">{label ?? "Comprar"}</span>
              <span class="hidden lg:inline text-xs uppercase">
                {label ?? "Adicionar ao carrinho"}
              </span>
            </p>
          </Button>
        )
        : (
          <a href={url} target="_blank" class={classes}>
            <p class="flex gap-2 items-center justify-center">
              {showIcon && <Icon id="ShoppingCart" width={20} height={20} />}
              <span class="lg:hidden">{label ?? "Comprar"}</span>
              <span class="hidden lg:inline text-xs uppercase">
                Avise-me
              </span>
            </p>
          </a>
        )}

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
              id="ShoppingCart"
              width={30}
              height={30}
              strokeWidth={2}
            />
            <h2
              class={`uppercase text-base font-medium text-base-content text-center`}
            >
              Adicionado
            </h2>
            <p class={`text-center text-[#585858] text-sm`}>
              Seu produto foi adicionado<br /> com sucesso em seu<br /> carrinho
            </p>
          </>
        </Suspense>
      </AlertModal>
    </>
  );
}

export default AddToCartButton;
