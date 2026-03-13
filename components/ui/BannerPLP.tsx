import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { type SectionProps as SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  text?: {
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
    mobileTextPosition?: BannerTextPostion;
    desktopTextPosition?: BannerTextPostion;
  };
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
  /** @description when user clicks on the image, go to this link */
  href?: string;
}
export type BannerTextPostion = "left" | "center" | "right";
const DESKTOP_TEXT_POSITION = {
  left: "md:items-start",
  center: "md:items-center",
  right: "md:items-end",
};
const MOBILE_TEXT_POSITION = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};
function Banner({ banner }: SectionProps<ReturnType<typeof loader>>) {
  if (!banner) {
    return null;
  }
  const {
    text: { title, subtitle, desktopTextPosition, mobileTextPosition } = {},
    image,
    href,
  } = banner;
  return (
    <a
      href={href ?? "#"}
      class="grid container grid-cols-1 px-3 mb-5 grid-rows-1 relative"
    >
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={280}
          height={80}
          media="(max-width: 767px)"
        />

        <Image
          class="w-full h-full "
          fetchPriority="high"
          preload
          src={image.desktop}
          alt={image.alt ?? title}
          width={1536}
          height={144}
        />
      </Picture>

      <div
        class={`absolute md:px-18 px-12 top-0 left-0 w-full h-full flex flex-col justify-center  ${
          DESKTOP_TEXT_POSITION[desktopTextPosition ?? "center"]
        } ${MOBILE_TEXT_POSITION[mobileTextPosition ?? "left"]}`}
      >
        <h1>
          <span class=" text-xl lg:text-[50px] font-normal text-primary ">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </a>
  );
}
export interface Props {
  banners?: Banner[];
}
export const loader = ({ banners = [] }: Props, req: Request) => {
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { banner };
};
export default Banner;
