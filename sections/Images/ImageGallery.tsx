import {
  BorderRadius,
  DESKTOP_COLUMNS,
  MOBILE_COLUMNS,
  SemanticColors,
} from "../../components/ui/BannerGrid.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import { Head } from "$fresh/runtime.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export type BorderSize =
  | "none"
  | "0"
  | "2"
  | "4"
  | "8";

export interface ImageGalleryItem {
  /** @description Title */
  title?: string;

  /** @description Image url */
  image: ImageWidget;

  /** @description Image Mobile url */
  imageMobile?: ImageWidget;

  /** @description Alt text */
  alt: string;

  /** @description Background Color hover */
  /** @default none */
  backgroundColorHover?: SemanticColors;

  /** @description Border Radius */
  borderRadius?: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };

  /** @description Border Size */
  borderSize?: {
    /** @default none */
    mobile?: BorderSize;
    /** @default none */
    desktop?: BorderSize;
  };

  /** @description Link */
  href?: string;
  preload?: boolean;
}

export interface Props {
  /** @description Banners */
  images: ImageGalleryItem[];
  /** @description Items per page Desktop */
  itemPerPageDesktop?: 1 | 2 | 3 | 4 | 5;
  /** @description Items per page Mobile */
  itemPerPageMobile?: 1 | 2;
}

const RADIUS_MOBILE = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const RADIUS_DESKTOP = {
  none: "sm:rounded-none",
  sm: "sm:rounded-sm",
  md: "sm:rounded-md",
  lg: "sm:rounded-lg",
  xl: "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  full: "sm:rounded-full",
};

const BORDER_MOBILE = {
  none: "border-none",
  "0": "border-0",
  "2": "border-2",
  "4": "border-2",
  "8": "border-2",
};

const BORDER_DESKTOP = {
  none: "sm:border-none",
  "0": "sm:border-0",
  "2": "sm:border-2",
  "4": "sm:border-2",
  "8": "sm:border-2",
};

const BACKGROUND_COLORS = {
  primary: "after:to-primary",
  secondary: "after:to-secondary",
  accent: "after:to-accent",
  neutral: "after:to-neutral",
  base: "after:to-base",
  info: "after:to-info",
  success: "after:to-success",
  warning: "after:to-warning",
  error: "after:to-error",
};

export default function ImageGallery(props: Props) {
  const { images, itemPerPageMobile = 1, itemPerPageDesktop = 3 } = props;
  return (
    <section
      class={`w-full h-full grid justify-center lg:gap-8 gap-5 my-12 max-md:my-8 ${
        MOBILE_COLUMNS[itemPerPageMobile ?? 1]
      }} ${DESKTOP_COLUMNS[itemPerPageDesktop ?? 3]}`}
    >
      {images.map((item) => (
        <a
          href={item.href}
          class={`block relative overflow-hidden rounded-xl w-full m-auto group 
            ${
            item?.backgroundColorHover
              ? `after:content-[''] after:absolute after:top-0 after:opacity-0 hover:after:opacity-100 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent`
              : ""
          }
            ${BACKGROUND_COLORS[item?.backgroundColorHover ?? "primary"]}
          `}
        >
          <div
            class={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-11/12 h-11/12 
              border-white	flex justify-center	items-end
              ${BORDER_MOBILE[item?.borderSize?.mobile ?? "none"]}
              ${BORDER_DESKTOP[item?.borderSize?.desktop ?? "none"]} 
              ${RADIUS_MOBILE[item?.borderRadius?.mobile ?? "none"]}
              ${RADIUS_DESKTOP[item?.borderRadius?.desktop ?? "none"]}  
            `}
          >
            <span class="relative z-30 text-4xl lg:text-4xl font-bold  text-base-100 text-center	mb-5 ">
              {item.title}
            </span>
          </div>
          {
            /* {item.preload && (
            <Head>
              <link
                as="image"
                rel="preload"
                href={item.image}
              />
            </Head>
          )} */
          }
          {
            /* <img
            preload={undefined}
            loading={item.preload ? "eager" : "lazy"}
            class="w-full h-full"
            src={item.image}
            alt={item.alt}
            decoding="async"
            width={400}
            height={400}
          /> */
          }
          <Picture
            preload={item.preload}
          >
            <Source
              width={400}
              height={400}
              media="(max-width: 767px)"
              src={item?.imageMobile ?? item?.image}
            />
            <Source
              width={370}
              height={420}
              media="(min-width: 768px)"
              src={item?.image ?? item?.imageMobile}
            />
            <img
              class="w-full h-full object-cover"
              src={item?.imageMobile}
              alt={item.alt}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </a>
      ))}
    </section>
  );
}
