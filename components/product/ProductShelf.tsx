import type { Layout as CardLayout } from "../../components/product/ProductCard.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import {
  CONDITIONAL_RESPONSIVE_PARAMS,
  ResponsiveConditionals,
} from "../../components/ui/BannerCarousel.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { SendEventOnView } from "../../components/Analytics.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "preact/hooks";
import { HighLight } from "../../components/product/ProductHighlights.tsx";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";
import { type LoaderReturnType } from "@deco/deco";
interface MarginItem {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}
const marginItem: MarginItem = {
  0: "0px",
  1: "0px",
  2: "0px",
  3: "0px",
  4: "20px",
  5: "20px",
};
export interface Props {
  products: LoaderReturnType<Product[] | null>;
  title?: string;
  highlights?: HighLight[];
  seeMore?: {
    url: string;
    label: string;
  };
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
    headerTailwind?: string;
    itemsPerPage?: {
      screenWidth?: number;
      itemsQuantity?: number;
    }[];
  };
  /**
   * @title Show pagination arrows?
   */
  showPaginationArrows?: ResponsiveConditionals;
  /**
   * @title Show pagination dots?
   * @default Always
   */
  showPaginationDots?: ResponsiveConditionals;
  cardLayout?: CardLayout;
}
interface ButtonsProps {
  className: string;
}
// deno-lint-ignore no-explicit-any
function itemPerPage(itemsPerPage: any) {
  // Check if we're on the client side (browser)
  const isClient = typeof window !== "undefined";

  if (!itemsPerPage) {
    return [0, 1];
  }

  const entries = Object.entries(itemsPerPage).sort(([widthA], [widthB]) =>
    Number(widthB) - Number(widthA)
  );

  // During SSR, return the smallest breakpoint (mobile-first approach)
  if (!isClient) {
    return entries[entries.length - 1] ?? [0, 1];
  }

  // On client, find the appropriate breakpoint based on window width
  return entries.find(([width]) => Number(width) <= window.innerWidth) ??
    [0, 1];
}
function ProductShelf(
  {
    products,
    title,
    layout,
    cardLayout,
    seeMore,
    showPaginationArrows,
    showPaginationDots,
    highlights,
  }: Props,
) {
  const id = useId();
  if (!products || products.length === 0) {
    return null;
  }
  const [, perPage] = itemPerPage(
    layout?.itemsPerPage?.reduce((initial, { screenWidth, itemsQuantity }) => ({
      ...initial,
      [screenWidth?.toString() ?? "0"]: itemsQuantity ?? 1,
    }), {}),
  );
  return (
    <div class="relative w-full py-8 mb-6 flex flex-col gap-12 lg:gap-7 lg:py-10">
      <div class="flex items-center justify-between relative pb-3 border-b border-neutral-100">
        <Header
          title={title || ""}
          description=""
          fontSize={layout?.headerfontSize || "Large"}
          alignment={layout?.headerAlignment || "center"}
          tailwind={layout?.headerTailwind || ""}
        />
        {seeMore
          ? (
            <span class="text-accent font-bold text-sm uppercase">
              <a href={seeMore.url}>
                {seeMore.label}
              </a>
            </span>
          )
          : null}
      </div>

      <div id={id} class="grid grid-cols-[48px_1fr_48px] px-0">
        <Slider class="carousel carousel-start gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              style={{
                width: `calc((100% / ${perPage}) - ${
                  marginItem[perPage as keyof MarginItem]
                })`,
              }}
              class="carousel-item w-[270px]"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                highlights={highlights}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Buttons
          className={CONDITIONAL_RESPONSIVE_PARAMS[
            showPaginationArrows ? showPaginationArrows : "Always"
          ]}
        />

        <Dots
          products={products}
          className={CONDITIONAL_RESPONSIVE_PARAMS[
            showPaginationDots ? showPaginationDots : "Always"
          ]}
        />
        <Slider.JS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
function Buttons({ className }: ButtonsProps) {
  return (
    <>
      <div
        class={`absolute top-2/4 lg:-left-11 left-2 z-10 col-start-1 row-start-3  ${className}`}
      >
        <Slider.PrevButton
          style={{
            minHeight: "28px",
          }}
          class="w-8 h-8 btn btn-circle opacity-100 bg-opacity-100  bg-neutral-100 border-none hover:bg-neutral-100"
        >
          <Icon
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
            class="text-base-content"
          />
        </Slider.PrevButton>
      </div>
      <div
        class={`absolute top-2/4 lg:-right-11 right-2  z-10 col-start-3 row-start-3 ${className}`}
      >
        <Slider.NextButton
          style={{
            minHeight: "28px",
          }}
          class="w-8 h-8 min-h-fit btn btn-circle opacity-100 bg-opacity-100  bg-neutral-100 border-none hover:bg-neutral-100"
        >
          <Icon
            size={20}
            id="ChevronRight"
            strokeWidth={3}
            class="text-base-content"
          />
        </Slider.NextButton>
      </div>
    </>
  );
}
interface DotsProps {
  products: LoaderReturnType<Product[] | null>;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  interval?: number;
  /**
   * @title Show pagination arrows?
   */
  className: string;
}
function Dots({ products, className, interval = 0 }: DotsProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul
        class={`carousel absolute w-full left-0 -bottom-4 justify-center col-span-full gap-2 z-10 row-start-4  ${className}`}
      >
        {products?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div
                class={`py-5 ${
                  ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden"
                }`}
              >
                <div
                  class="w-3 h-3 group-disabled:opacity-100 opacity-10 rounded-full bg-primary"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ProductShelf;
