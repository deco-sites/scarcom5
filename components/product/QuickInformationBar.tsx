import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Barra de Contato
   * @description Adicionar ícones e texto sobre as informações de contato
   */
  elements?: {
    icon: ImageWidget;
    title: string;
    contact: string;
    url: string;

    /**
     * @title Link interno ou externo
     * @description Link ira abrir na mesma página ou em outra página?
     */
    target?: boolean;
  }[];

  /**
   * @title Logo curto da empresa
   */
  shortLogo: ImageWidget;
}

function QuickInformationBar({ elements, shortLogo }: Props) {
  return (
    <div class="w-full lg:bg-[#F7F7F7] mt-[20px] lg:mt-[50px]">
      <div class="container w-full m-auto px-5 my-5 lg:my-10">
        <div class="flex flex-col w-full items-center bg-[#F7F7F7] rounded-[10px] p-[14px] px-[20px] gap-[20px] lg:bg-none lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <div class="flex w-full lg:w-auto gap-[10px]">
            <img src={shortLogo} alt="Short Logo" />
            <div class="flex flex-col">
              <strong class="not-italic font-extrabold text-[20px] leading-[20px] text-[#133449]">
                Tem dúvidas?
              </strong>
              <span class="not-italic font-medium text-[20px] leading-[20px] text-[#133449]">
                Fale com a gente:
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-[20px] w-full px-[10px] lg:max-w-none lg:w-auto lg:gap-[60px] lg:flex-row">
            {elements?.map((element) => {
              return (
                <a
                  href={element.url}
                  target={element.target ? "_self" : "_blank"}
                  class="flex flex-row gap-[10px]"
                >
                  <img class="" src={element.icon} alt="Icon Contact" />
                  <div class="flex flex-col">
                    <strong class="not-italic font-semibold text-[16px] leading-[20px] text-[#133449]">
                      {element.title}
                    </strong>
                    <span class="not-italic font-medium text-[16px] leading-[20px] text-[#133449]">
                      {element.contact}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickInformationBar;
