import Button from "../../components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useRef } from "preact/hooks";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const ref = useRef<HTMLInputElement>(null);
  const displayInput = useSignal(false);
  const coupon = cart.value?.marketingData?.coupon;

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = ref.current?.value;

    if (typeof text === "string") {
      addCouponsToCart({ text });
      toggleInput();
    }
  };

  return (
    <div class="flex justify-between items-center lg:px-0 mb-6 w-full gap-4">
      <span class="text-sm text-base-content">Desconto</span>
      <form class="flex gap-2 w-full justify-between lg:justify-end">
        <input
          id="coupon"
          name="coupon"
          ref={ref}
          class="border-2 border-accent outline-none rounded-full placeholder-neutral p-3 h-9 text-xs w-[75%]"
          type="text"
          value={coupon ?? ""}
          placeholder={"Cupom"}
        />
        <Button
          class="w-14 h-9 border-primary text-primary font-medium text-xs hover:bg-primary hover:text-info"
          type="submit"
          htmlFor="coupon"
          loading={loading.value}
          onClick={applyCouponToCart}
        >
          Ok
        </Button>
      </form>
    </div>
  );
}

export default Coupon;
