import { useUI } from "$store/sdk/useUI.ts";
import CloseButton from "$store/islands/CloseButton.tsx";

function BuyWarning() {
  const { displayBuyWarning } = useUI();
  return (
    <>
      <div
        class={`py-4 px-5 text-white flex gap-5 bg-primary fixed bottom-[50px] left-[80px] w-[560px] z-50 animate-slide-bottom max-lg:w-[90vw] max-lg:left-[5vw] ${
          displayBuyWarning.value ? "" : "hidden"
        }`}
      >
        <span class="w-full">
          Seu produto foi adicionado com sucesso em sua sacola
        </span>
        <CloseButton
          size={18}
          onClickBtn={() => {
            displayBuyWarning.value = false;
          }}
        />
      </div>
    </>
  );
}

export default BuyWarning;
