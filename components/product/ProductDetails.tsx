import { useId } from "preact/hooks";
import { type SectionProps as SectionProps } from "@deco/deco";
import { AppContext } from "apps/vtex/mod.ts";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Image from "apps/website/components/Image.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import AddToCartActions from "$store/islands/AddToCartActions.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { getShareLink } from "$store/sdk/shareLinks.tsx";
import SliderProductShowcase from "$store/islands/SliderProductShowcase.tsx";
import { HighLight } from "$store/components/product/ProductHighlights.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import { DiscountBadgeProps } from "$store/components/product/DiscountBadge.tsx";
import { type Section as Section } from "@deco/deco/blocks";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";
import { type LoaderReturnType } from "@deco/deco";
export type Variant = "front-back" | "slider" | "auto";
export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";
export interface LabelBuyButton {
  mobile: {
    /**
     * @description Label Buy Button Mobile
     */
    label: string;
  };
  desktop: {
    label: string;
  };
}
export interface MeasurementChart {
  url: string;
}
export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @description Discount Percent value To Pix, Boleto etc... , sample: 10 = 10%
   */
  discountPercent?: number;
  /**
   * @title Measurement Chart
   * @description Add URL to Measurement Chart
   */
  measurementChart?: string;
  discount?: DiscountBadgeProps;
  /**
   * @description Flags, displayed when  products are found
   */
  highlights?: HighLight[];
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  shipmentPolitics?: {
    label: string;
    link: string;
  };
  shareableNetworks?: ShareableNetwork[];
  /**
   * @description Not found section, displayed when no products are found
   */
  notFoundSection: Section;
}
export interface LoaderProps extends Props {
  appKeyCurrent?: string;
  appTokenCurrent?: string;
}
const WIDTH = 500;
const HEIGHT = 500;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;
export async function loader(props: LoaderProps, _req: Request, _: AppContext) {
  const { appKeyCurrent, appTokenCurrent, ...defaultProps } = props;
  if (!appKeyCurrent || !appTokenCurrent) {
    return {
      manufacturerCode: null,
      ...defaultProps,
    };
  }
  const response = await fetch(
    `https://scarcom.myvtex.com/api/catalog_system/pvt/sku/stockkeepingunitbyid/${defaultProps.page?.product.sku}`,
    {
      headers: {
        "X-VTEX-API-AppKey": appKeyCurrent,
        "X-VTEX-API-AppToken": appTokenCurrent,
        "Content-Type": "application/json",
      },
    },
  );
  const dataStockKeeping = await response.json();
  return {
    manufacturerCode: dataStockKeeping.ManufacturerCode as string,
    ...defaultProps,
  };
}
function ProductInfo(
  {
    page,
    shipmentPolitics,
    shareableNetworks,
    discountPercent,
    measurementChart,
    manufacturerCode,
  }: {
    page: ProductDetailsPage;
    shipmentPolitics?: Props["shipmentPolitics"];
    shareableNetworks?: Props["shareableNetworks"];
    discountPercent?: number;
    measurementChart?: Props["measurementChart"];
    manufacturerCode: string | null;
  },
) {
  const { product } = page;
  const {
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
    url,
    additionalProperty,
  } = product;
  const { price, listPrice, seller, installment_text, availability_quantity } =
    useOffer(offers);
  const referenceID =
    additionalProperty?.find(({ valueReference }) =>
      valueReference == "ReferenceID"
    )?.value ?? gtin;
  // const especifications = page?.product?.isVariantOf?.additionalProperty;
  // const renderItem = (item: any) => {
  //   switch (item.name) {
  //     case "Gênero":
  //       return (item.value && (
  //         <>
  //           Gênero<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Banho":
  //       return (item.value && (
  //         <>
  //           Banho<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Cor da Caixa":
  //       return (item.value && (
  //         <>
  //           Cor (caixa)<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Cor da pulseira":
  //       return (item.value && (
  //         <>
  //           Cor (pulseira)<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Tipo":
  //       return (item.value && (
  //         <>
  //           Tipo<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Formato":
  //       return (item.value && (
  //         <>
  //           Formato<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Fecho (tipo)":
  //       return (item.value && (
  //         <>
  //           Fecho (tipo)<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Maquinismo":
  //       return (item.value && (
  //         <>
  //           Maquinismo <p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Material da Pulseira":
  //       return (item.value && (
  //         <>
  //           Material (pulseira)
  //           <p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Resistente a Água":
  //       return (item.value && (
  //         <>
  //           Resistencia a agua<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Largura da Caixa (cm)":
  //       return (item.value && (
  //         <>
  //           Largura da Caixa<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     case "Garantia":
  //       return (item.value && (
  //         <>
  //           Garantia<p className="font-light">&nbsp;{item.value}</p>
  //         </>
  //       ));
  //     default:
  //       return null;
  //   }
  // };
  // const renderItemByName = (itemName: string) => {
  //   const item = especifications?.find((spec) => spec.name === itemName);
  //   return (item && (
  //     <li
  //       key={itemName}
  //       className="flex ml-[10px] text-[#A8A8A8] font-semibold"
  //     >
  //       {renderItem(item)}
  //     </li>
  //   ));
  // };
  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-0">
        <h1>
          <span class="font-medium text-base-content text-xl lg:text-2xl">
            {isVariantOf?.name}
          </span>
        </h1>
        <div className="mt-[12px]">
          <div class="flex flex-col items-start gap-[4px]">
            <p className="not-italic font-bold text-[14px] leading-[16px] text-[#585858] m-0">
              <strong class="text-[#015388]">Ref.:</strong> {referenceID}
            </p>
            {product?.isVariantOf?.model && (
              <p className="not-italic font-bold text-[14px] leading-[16px] text-[#585858] m-0">
                <strong class="text-[#015388]">Modelo:</strong>{" "}
                {manufacturerCode ? manufacturerCode : product?.brand?.name}
              </p>
            )}
            {product?.isVariantOf?.model && (
              <p className="not-italic font-bold text-[14px] leading-[16px] text-[#585858] m-0">
                <strong class="text-[#015388]">EAN:</strong> {product?.gtin}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Prices */}
      {availability_quantity === "https://schema.org/InStock" && (
        <div class="mt-5">
          {discountPercent
            ? (
              <span class="text-primary">
                {" "}
                <strong class="text-2xl text-primary">
                  {formatPrice(
                    price! - (price! * (discountPercent % 100)) / 100,
                    offers!.priceCurrency,
                  )}
                </strong>{" "}
                à vista ou
              </span>
            )
            : null}
          <div class="flex flex-row gap-2 items-center">
            {listPrice !== price && (
              <span class="line-through text-base-300 text-xs">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            )}
            <span class="font-medium text-xl lg:text-2xl uppercase text-primary">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
          </div>
          <span>{installment_text}</span>
        </div>
      )}
      {/* Measurement chart */}
      {(availability_quantity === "https://schema.org/InStock" &&
        measurementChart) && (
        <div class="mt-4 sm:mt-5">
          <a
            class="text-sm underline"
            href={`${measurementChart}`}
            target="_blank"
            data-gtm-vis-first-on-screen387253_693="1145"
            data-gtm-vis-total-visible-time387253_693="100"
            data-gtm-vis-has-fired387253_693="1"
          >
            Tabela de Medidas
          </a>
        </div>
      )}
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-5">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 mb-7 lg:mt-10 flex gap-[30px]">
        {availability_quantity === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartActions
                  productID={productID}
                  seller={seller}
                  price={price}
                  listPrice={listPrice}
                  productName={name ?? ""}
                  productGroupID={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div className="collapse collapse-plus">
        <input type="checkbox" />
        <div className="collapse-title px-0">Calcular frete e entrega</div>
        <div className="collapse-content px-0">
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller ?? "1",
              },
            ]}
            shipmentPolitics={shipmentPolitics}
          />
        </div>
      </div>
      {/* Share Product on Social Networks */}
      {shareableNetworks && (
        <div class="flex items-center gap-5 my-5">
          <span class="text-xs text-[#585858]">Compartilhar</span>
          <ul class="gap-2 flex items-center justify-between">
            {shareableNetworks.map((network) => (
              <li class="bg-[#585858] w-8 h-8 rounded-full hover:bg-base-content transition-all">
                <a
                  href={getShareLink({
                    network,
                    productName: isVariantOf?.name ?? name ?? "",
                    url: url ?? "",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full h-full text-neutral-100"
                >
                  <Icon id={network} width={20} height={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Analytics Event */}
      {
        /* <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      /> */
      }
    </>
  );
}
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };
  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant
    .flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};
  return images.map((img) => {
    const name = imageNameFromURL(img.url);
    return { ...img, url: allImages[name] ?? img.url };
  });
};
function Details(
  {
    page,
    variant,
    shipmentPolitics,
    shareableNetworks,
    highlights,
    discount,
    discountPercent,
    measurementChart,
    manufacturerCode,
  }: {
    page: ProductDetailsPage;
    variant: Variant;
    shipmentPolitics?: Props["shipmentPolitics"];
    shareableNetworks?: Props["shareableNetworks"];
    highlights?: HighLight[];
    discount?: DiscountBadgeProps;
    discountPercent?: number;
    measurementChart?: Props["measurementChart"];
    manufacturerCode: string | null;
  },
) {
  const { product, breadcrumbList } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);
  /**
   * Product slider variant
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div id={id} class="flex flex-col lg:flex-row gap-4 lg:justify-center">
          {/* Product Images */}
          <SliderProductShowcase
            page={page!}
            id={id}
            highlights={highlights}
            discount={discount}
          />

          {/* Product Info */}
          <div class="w-full lg:pr-0 lg:pl-6">
            <ProductInfo
              manufacturerCode={manufacturerCode}
              page={page}
              shipmentPolitics={shipmentPolitics}
              shareableNetworks={shareableNetworks}
              discountPercent={discountPercent}
              measurementChart={measurementChart}
            />
          </div>
        </div>
      </>
    );
  }
  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[50vw_25vw] lg:grid-rows-1 lg:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] lg:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 lg:pr-0 lg:pl-6">
        <ProductInfo manufacturerCode={manufacturerCode} page={page} />
      </div>
    </div>
  );
}
function ProductDetails({
  page,
  variant: maybeVar = "auto",
  shipmentPolitics,
  shareableNetworks,
  notFoundSection: { Component: ProductNotFound, props: notFoundProps },
  highlights,
  discount,
  discountPercent,
  measurementChart,
  manufacturerCode,
}: SectionProps<typeof loader>) {
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;
  return (
    <div class="py-0 lg:pb-10">
      {page
        ? (
          <Details
            manufacturerCode={manufacturerCode}
            page={page}
            variant={variant}
            shipmentPolitics={shipmentPolitics}
            shareableNetworks={shareableNetworks}
            highlights={highlights}
            discount={discount}
            discountPercent={discountPercent}
            measurementChart={measurementChart}
          />
        )
        : <ProductNotFound {...notFoundProps} />}
    </div>
  );
}
export default ProductDetails;
