import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useId } from "preact/hooks";
// import { sendEvent } from "../sdk/analytics.tsx";
// import { sendEventOnClick } from "../../sdk/analytics.tsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline";

export const BUTTON_VARIANTS: Record<string, string> = {
  "primary": "primary hover:text-base-100",
  "secondary": "secondary hover:text-base-100",
  "accent": "accent text-base-content hover:text-base-100",
  "outline": "outline border border-base-content hover:bg-base-content",
};

export type BannerFontSizes = "Small" | "Medium" | "Large";
export type ResponsiveConditionals =
  | "Always"
  | "Desktop Only"
  | "Mobile Only"
  | "Never";

export const CONDITIONAL_RESPONSIVE_PARAMS: Record<
  ResponsiveConditionals,
  string
> = {
  "Always": "flex",
  "Desktop Only": "lg:flex max-lg:hidden",
  "Mobile Only": "max-lg:flex lg:hidden",
  "Never": "hidden",
};

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /**
   * @title Banner's text
   */
  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Mobile title */
    mobileTitle?: string;
    /** @description Image text subtitle */
    mobileSubTitle?: string;
    /** @description Button label */
    label?: string;
    /** @description Button variant */
    variant?: ButtonVariant;
    /**
     * @title Title color
     * @default #fff
     */
    titleColor?: string;
    /**
     * @title Title color
     * @default #fff
     */
    subTitlecolor?: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /**
   * @title Show pagination arrows?
   */
  showPaginationArrows?: ResponsiveConditionals;
  /**
   * @title Show pagination dots?
   * @default Always
   */
  showPaginationDots?: ResponsiveConditionals;
}

interface BannerTitleProps {
  title?: string;
  class?: string;
  color?: string;
}

function BannerTitle(props: BannerTitleProps) {
  return (
    <span
      class={`w-full text-left  text-3xl lg:text-[68px] xl:text-[68px] text-base-100 md:whitespace-nowrap lg:leading-[68px] xl:leading-[68px] ${props.class}`}
      style={{
        color: props.color ? props.color : "#fff",
      }}
    >
      {props.title}
    </span>
  );
}

function BannerSubTitle(props: BannerTitleProps) {
  return (
    <span
      class={`w-full text-left font-medium text-lg lg:text-[36px] xl:text-[36px] text-base-100 md:whitespace-nowrap lg:leading-[36px] xl:leading-[36px] ${props.class}`}
      style={{
        color: props.color ? props.color : "#fff",
      }}
    >
      {props.title}
    </span>
  );
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean; position: number },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  // const clickEvent = {
  //   name: "select_promotion",
  //   params: {
  //     item_name: alt,
  //     item_id: desktop, //image url
  //     creative_name: window.location.hostname + action?.href, //page url
  //     creative_slot: position + 1,
  //   },
  // };

  return (
    <a
      href={action?.href ?? "#"}
      aria-label={action?.label || action?.title}
      id="banner-principal"
      class="relative h-auto overflow-y-hidden w-full"
      // {...sendEventOnClick(clickEvent)}
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={320}
          height={380}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1920}
          height={600}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action?.title ||
        action?.mobileTitle && (
            <div class="w-full lg:px-52 absolute top-0 bottom-0 m-auto mt-11 lg:mt-auto right-0 sm:right-auto left-[50%] max-h-min h-fit flex flex-col gap-4 p-6 -translate-x-1/2">
              {action?.mobileTitle
                ? (
                  <>
                    <BannerTitle
                      class="md:hidden"
                      color={action.titleColor}
                      title={action.mobileTitle}
                    />

                    <BannerSubTitle
                      class="md:hidden"
                      color={action.subTitlecolor}
                      title={action.mobileSubTitle}
                    />
                  </>
                )
                : null}

              <BannerTitle
                class={action?.mobileTitle ? "max-md:hidden" : "flex"}
                color={action.titleColor}
                title={action.title}
              />

              <BannerSubTitle
                class={action?.mobileTitle ? "max-md:hidden" : "flex"}
                color={action.subTitlecolor}
                title={action.subTitle}
              />
              {action.label && (
                <Button
                  class={`max-md:text-sm m-auto ml-0 mt-5 btn border-none text-white capitalize font-medium text-base w-fit px-16 btn-${
                    action.variant
                      ? BUTTON_VARIANTS[action.variant]
                      : BUTTON_VARIANTS["primary"]
                  }`}
                >
                  {action.label}
                </Button>
              )}
            </div>
          )}
    </a>
  );
}

interface DotsProps {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  interval?: number;
  /**
   * @title Show pagination arrows?
   */
  className: string;
}

function Dots({ images, className, interval = 0 }: DotsProps) {
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
        class={`carousel justify-center col-span-full gap-2 z-10 row-start-4 ${className}`}
      >
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-3 h-3 group-disabled:opacity-100 opacity-10 rounded-full bg-white"
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

interface ButtonsProps {
  className: string;
}

function Buttons({ className }: ButtonsProps) {
  return (
    <>
      <div
        class={`flex items-center justify-center z-10 col-start-1 row-start-2 ${className}`}
      >
        <Slider.PrevButton class="btn btn-circle border-none bg-opacity-10 bg-white hover:bg-white hover:bg-opacity-20">
          <Icon
            class="text-primary"
            size={40}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div
        class={`flex items-center justify-center z-10 col-start-3 row-start-2 ${className}`}
      >
        <Slider.NextButton class="btn btn-circle border-none bg-opacity-10 bg-white hover:bg-white hover:bg-opacity-20">
          <Icon
            class="text-primary"
            size={40}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(
  { images, preload, interval, showPaginationDots }: Props,
) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem
              image={image}
              lcp={index === 0 && preload}
              position={index}
            />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons
        className={"Always"}
      />

      <Dots
        images={images}
        interval={interval}
        className={CONDITIONAL_RESPONSIVE_PARAMS[
          showPaginationDots ? showPaginationDots : "Always"
        ]}
      />
      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
