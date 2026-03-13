import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductShelf, {
  Props as ProductShelfProps,
} from "../../components/product/ProductShelf.tsx";
import { type SectionProps as SectionProps } from "@deco/deco";
export interface Props {
  /**
   * @description Title to be displayed in the not found section
   */
  title?: string;
  /**
   * @description Subtitle to be displayed in the not found section
   */
  subTitle?: string;
  /**
   * @description Description to be displayed in the not found section
   * @format html
   */
  description?: string;
  /**
   * @description Banner image to be displayed in the not found section
   */
  image: ImageWidget;
  shelf?: ProductShelfProps;
}
export const loader = (ctx: Props, req: Request) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const term = params.get("q");
  return {
    ...ctx,
    searchTerm: term,
  };
};
export default function ProductNotFound(
  {
    subTitle = "Página não encontrada",
    description,
    title = "404",
    image,
    shelf,
  }: SectionProps<typeof loader>,
) {
  return (
    <div class="w-full">
      <div class="flex flex-col gap-[10px] lg:flex-row lg:justify-around lg:mt-[30px] lg:mb-[60px]">
        <div class="flex flex-col px-5 py-[30px] gap-3">
          <h2 class="text-emphasis lg:font-medium text-[70px] lg:text-[130px]">
            {title}
          </h2>
          <p class="max-[1024px]:uppercase max-[1024px]:max-w-[144px] font-medium text-[#191919] text-xl">
            {subTitle}
          </p>
          {description
            ? <div dangerouslySetInnerHTML={{ __html: description }} />
            : null}
        </div>
        <div class="bg-transparent w-full lg:w-[40%] max-[1024px]:h-52 p-5 flex flex-col gap-[10px] text-white rounded-[20px] relative lg:justify-center lg:p-[60px] lg:rounded-r-none">
          <div
            class="-z-10 absolute w-full lg:w-[140%] h-full rounded-[20px] lg:rounded-none bg-transparent top-0 left-0"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
          </div>
        </div>
      </div>
      <div class="mb-12">
        {shelf && <ProductShelf {...shelf} />}
      </div>
    </div>
  );
}
