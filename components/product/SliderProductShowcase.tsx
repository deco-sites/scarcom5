import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import DiscountBadge, { DiscountBadgeProps } from "./DiscountBadge.tsx";
import { HighLight } from "../../components/product/ProductHighlights.tsx";
import ProductHighlights from "../../components/product/ProductHighlights.tsx";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";

const WIDTH = 500;
const HEIGHT = 500;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
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

interface Zoom {
  zoomed: boolean;
  x: number;
  y: number;
}

function SliderProductShowcase(
  { page, id, highlights, discount }: {
    page: ProductDetailsPage;
    id: string;
    highlights?: HighLight[];
    discount?: DiscountBadgeProps;
  },
) {
  const { product } = page;
  const images = useStableImages(product);

  const { offers } = product;
  const {
    price,
    listPrice,
  } = useOffer(offers);

  const handleMouseLeave = (e: MouseEvent) => {
    const parent = (e.target as HTMLImageElement).parentElement;
    const image = parent?.querySelector("div");

    if (image) image.style.display = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    const image = target.nextElementSibling as HTMLDivElement;

    if (!image) return;

    const container = target.parentElement as HTMLLIElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const xPercentage =
      ((e.clientX - container.getBoundingClientRect().left) / containerWidth) *
      100;

    const yPercentage =
      ((e.clientY - container.getBoundingClientRect().top) / containerHeight) *
      100;

    image.style.display = "block";
    image.style.backgroundPosition = `${xPercentage}% ${yPercentage}%`;
  };

  return (
    <>
      <div class="flex flex-col lg:flex-row-reverse relative lg:items-start gap-4">
        {/* Image Slider */}
        <div class="relative xl:ml-36">
          <div class="absolute w-full left-0 top-0 p-[10px] flex items-center z-10">
            <div class={`grid grid-cols-2 gap-y-2 w-full`}>
              {price && listPrice && price !== listPrice
                ? (
                  <DiscountBadge
                    price={price}
                    listPrice={listPrice}
                    variant={"emphasis"}
                    label=" "
                    className="lg:left-auto lg:right-0 left-4"
                    {...discount}
                  />
                )
                : null}

              {product && (
                <ProductHighlights
                  product={product}
                  highlights={highlights}
                />
              )}
            </div>
          </div>
          <Slider class="carousel carousel-center gap-6 box-border lg:box-content lg:w-[500px] xl:w-[600px] w-full px-4 lg:px-0">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class={`carousel-item w-full`}
              >
                <Image
                  class={`w-full rounded-[10px] cursor-zoom-in`}
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
                <div
                  class="hidden absolute left-0 top-0 bg-no-repeat w-full h-full pointer-events-none"
                  style={{
                    backgroundImage: `url(${img.url!})`,
                    backgroundSize: "200%",
                    backgroundPosition: "center",
                  }}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        {/* Dots */}
        <div class="lg:max-w-[500px] lg:self-start xl:self-start xl:left-0 xl:absolute xl:max-h-full xl:overflow-y-scroll xl:scrollbar-none">
          <ul
            class={`flex flex-row gap-4 overflow-auto lg:max-h-min lg:flex-1 justify-center lg:justify-start lg:flex-col`}
          >
            {images.map((img, index) => (
              <li class="min-w-[75px] lg:h-fit lg:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="border-[#E2E3E8] hover:border-secondary-focus group-disabled:border-secondary-focus border-2 rounded-[10px]"
                    width={WIDTH / 4}
                    height={HEIGHT / 4}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Slider.JS rootId={id}></Slider.JS>
    </>
  );
}

export default SliderProductShowcase;
