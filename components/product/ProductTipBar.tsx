import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Barra de Informações
   * @description Adicionar ícones e texto sobre as informações
   */
  elements?: {
    icon: ImageWidget;
    text: RichText;
  }[];
}

function ProductTipBar({ elements }: Props) {
  return (
    <div
      style="background: linear-gradient(45deg, transparent, #F7F7F7);"
      class="container w-full m-auto px-5 my-[30px] lg:my-10 lg:!bg-none"
    >
      <div
        class={`
        lg:gap-[20px] flex flex-row justify-start items-center px-[20px] bg-[#F7F7F7] rounded-[20px] overflow-x-scroll lg:overflow-visible lg:justify-between lg:py-[10px] lg:px-[46px] lg:grid lg:grid-cols-${elements?.length}
      `}
      >
        {elements?.map(({ icon, text }, index) => {
          return (
            <div
              data-i={index}
              data-e={elements.length}
              class={`
              flex items-center gap-[10px] py-[10px] lg:py-0 w-auto flex-nowrap m-0 min-w-[200px] lg:w-full
              ${
                (index === 0)
                  ? "border-r-[1.5px] border-l-[#D3DBE8] pr-[20px]"
                  : ""
              }
              ${
                (index > 0 && index < elements.length - 1)
                  ? "border-r-[1.5px] border-l-[#D3DBE8] px-[20px] !min-w-[300px]"
                  : ""
              }
              ${(index === elements.length - 1) ? "pl-[20px]" : ""}
            `}
            >
              <img
                class=""
                src={icon}
                alt="Element Icon"
              />
              <div
                class="not-italic font-medium text-[14px] leading-[16px] lg:text-[16px] lg:leading-[20px] text-[#015388] whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductTipBar;
