import { IContentDetailsProps } from "deco-sites/scarcom/components/product/ProductAdvancedDetails/index.tsx";
import VideoComponent from "deco-sites/scarcom/components/product/ProductAdvancedDetails/VideoComponent.tsx";
import Image from "apps/website/components/Image.tsx";

function AdvancedDetails(
  { contentDetails, state }: {
    contentDetails?: IContentDetailsProps[];
    state: boolean;
  },
) {
  return (
    <div
      className={`w-full h-auto flex-col gap-14 ${state ? "flex" : "hidden"}`}
    >
      {contentDetails?.map(
        ({ mediaType, banner, videoHtml, text, title, alt }, index) => {
          return (
            <div
              className={`flex flex-col gap-5 lg:gap-14 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } lg:items-center`}
            >
              <div className="w-full overflow-hidden rounded-2xl">
                {mediaType === "IMAGE"
                  ? (
                    <Image
                      class="w-full h-auto"
                      src={banner}
                      alt={alt}
                      width={710}
                      height={437}
                      fetchPriority="high"
                      loading="eager"
                    />
                  )
                  : <VideoComponent videoHtml={videoHtml} />}
              </div>
              <div className="w-full px-5 flex flex-col gap-[10px]">
                <span className="not-italic font-bold text-[18px] leading-[23px] tracking-[1px] text-[#015388] lg:text-[22px] lg:leading-[30px]">
                  {title}
                </span>
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  className="not-italic font-normal text-[14px] leading-[21px] text-[#4A4B51] lg:text-[16px] lg:leading-[24px]"
                />
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}

export default AdvancedDetails;
