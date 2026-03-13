import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "../../components/minicart/Cart.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import AddToCartButton from "../../islands/AddToCartButton.tsx";
import WishlistIcon from "../../islands/WishlistButton.tsx";
//   import { sendEventOnClick } from "../../sdk/analytics.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import DiscountBadge, { DiscountBadgeProps } from "./DiscountBadge.tsx";
import ProductHighlights from "../../components/product/ProductHighlights.tsx";
import { HighLight } from "../../components/product/ProductHighlights.tsx";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
    mobileCtaText?: string;
    ctaVariation?: ButtonVariant;
    ctaMode?: "Go to Product Page" | "Add to Cart";
  };
  discount?: DiscountBadgeProps;
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  /**
   * @description Flags, displayed when  products are found
   */
  highlights?: HighLight[];
  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;
}

export const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 279;
const HEIGHT = 270;

function ProductCard({
  product,
  preload,
  // itemListName,
  layout,
  highlights,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;

  const productGroupID = isVariantOf?.productGroupID;
  const hasVariant = isVariantOf?.hasVariant ?? [];

  const front = images && images[0];
  const back = images &&
    images.find((obj) => {
      return obj.name === "over";
    });
  const { listPrice, price, installment_text, seller, availability_quantity } =
    useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  // const clickEvent = {
  //   name: "select_item" as const,
  //   params: {
  //     item_list_name: itemListName,
  //     items: [
  //       mapProductToAnalyticsItem({
  //         product,
  //         price,
  //         listPrice,
  //       }),
  //     ],
  //   },
  // };
  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants
    .map(([value, link]) => [value, relative(link ?? "")] as const)
    .map(([value, link]) => (
      <li>
        <a href={link}>
          <Avatar
            content={value}
            variant={link === url ? "active" : link ? "default" : "disabled"}
          />
        </a>
      </li>
    ));

  const addToCartButtonClassNames = (variant: string | undefined) =>
    `lg:text-sm font-medium text-xs whitespace-nowrap m-auto btn h-8 min-h-6 max-md:min-h-[2.25rem] max-md:h-[2.25rem] btn-${
      BUTTON_VARIANTS[variant ?? "primary"]
    }`;

  const cta = layout?.basics?.ctaMode === "Go to Product Page"
    ? (
      <a
        href={url && relative(url)}
        aria-label="view product"
        class={`min-w-[162px] ${
          addToCartButtonClassNames(
            layout?.basics?.ctaVariation,
          )
        }`}
      >
        <span class="flex font-medium max-lg:hidden">
          {l?.basics?.ctaText || "Ver produto"}
        </span>
        <span class="flex font-medium lg:hidden">
          {l?.basics?.mobileCtaText || "Add ao carrinho"}
        </span>
      </a>
    )
    : l?.basics?.mobileCtaText
    ? (
      <>
        <AddToCartButton
          url={url as string}
          availability={availability_quantity as string}
          quantity={1}
          name={product.name as string}
          discount={price && listPrice ? listPrice - price : 0}
          productGroupId={product.isVariantOf?.productGroupID ?? ""}
          price={price as number}
          sellerId={seller as string}
          skuId={product.sku}
          label={l?.basics?.mobileCtaText}
          classes={`mb-5 uppercase font-bold min-w-[200px]  lg:min-w-0 ${
            addToCartButtonClassNames(
              layout?.basics?.ctaVariation,
            )
          }`}
        />
      </>
    )
    : (
      <AddToCartButton
        quantity={1}
        name={product.name as string}
        discount={price && listPrice ? listPrice - price : 0}
        productGroupId={product.isVariantOf?.productGroupID ?? ""}
        price={price as number}
        sellerId={seller as string}
        skuId={product.sku}
        label={l?.basics?.ctaText}
        classes={`hidden lg:block ${
          addToCartButtonClassNames(
            layout?.basics?.ctaVariation,
          )
        }`}
      />
    );

  const price2: number = price as number;
  const listPrice2: number = listPrice as number;

  return (
    <div
      class={`group card card-compact w-full bg-opacity-100 opacity-100 ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}`}
      data-deco="view-product"
      id={`product-card-${productID}`}
      // {...sendEventOnClick(clickEvent)}
    >
      <figure
        class="relative rounded-none"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10 ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          } ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          } `}
        >
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="relative contents"
        >
          <div
            class={`absolute left-0 top-0 z-10 flex w-full items-center p-[10px]`}
          >
            <div class={`grid w-full grid-cols-2 gap-y-1`}>
              {listPrice2 !== price2 && (
                <DiscountBadge
                  price={price2}
                  listPrice={listPrice2}
                  label={l?.discount?.label}
                  variant={l?.discount?.variant}
                />
              )}

              {product && (
                <ProductHighlights
                  product={product}
                  highlights={highlights}
                  listPrice={listPrice2}
                />
              )}
            </div>
          </div>

          <Image
            src={front ? front.url! : ""}
            alt={front ? front.alternateName : ""}
            width={WIDTH}
            height={HEIGHT}
            class={`absolute w-full rounded-none ${
              !l?.onMouseOver?.image || l?.onMouseOver?.image == "Change image"
                ? "opacity-100 transition-opacity duration-100 lg:group-hover:opacity-0"
                : ""
            } ${
              l?.onMouseOver?.image == "Zoom image"
                ? "transition-scale scale-100 duration-100 lg:group-hover:scale-105"
                : ""
            } `}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? (front ? front.url! : "")}
              alt={back?.alternateName ?? (front ? front.alternateName : "")}
              width={WIDTH}
              height={HEIGHT}
              class="absolute w-full rounded-none opacity-0 transition-opacity lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex flex-auto flex-col">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex w-full items-center gap-2 ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )}

        {l?.hide.productName && l?.hide.productDescription
          ? (
            ""
          )
          : (
            <div class="mt-[15px] flex flex-col gap-0">
              {l?.hide.productName
                ? (
                  ""
                )
                : (
                  <h3 class="line-clamp-2 text-xs font-bold text-base-content">
                    {isVariantOf?.name || name}
                  </h3>
                )}
              {l?.hide.productDescription
                ? (
                  ""
                )
                : (
                  <p class="truncate text-sm text-neutral lg:text-sm">
                    {product.description}
                  </p>
                )}
            </div>
          )}
        {l?.hide.allPrices
          ? (
            ""
          )
          : (
            <div class="mt-2 flex flex-col">
              <div
                class={`flex items-center gap-2.5 ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:flex-row" : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                {listPrice !== price && (
                  <p
                    class={`text-xs text-base-300 line-through ${
                      l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                    }`}
                  >
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </p>
                )}
                <p class="text-sm font-bold text-accent">
                  {formatPrice(price, offers!.priceCurrency!)}
                </p>
              </div>
              {l?.hide.installments
                ? (
                  ""
                )
                : (
                  <div class="mt-[5px] text-xs font-normal text-base-content">
                    ou {installment_text}
                  </div>
                )}
            </div>
          )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex w-full items-center gap-2 ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )}

        <div
          class={`mt-[10px] flex w-full flex-col ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              // ? "transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
              ? "opacity-100 transition-opacity"
              : "lg:hidden"
          } `}
        >
          {l?.onMouseOver?.showCta && cta}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
