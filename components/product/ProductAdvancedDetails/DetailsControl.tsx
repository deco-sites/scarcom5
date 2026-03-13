import { IContentDetailsProps } from "deco-sites/scarcom/components/product/ProductAdvancedDetails/index.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import AdvancedDetails from "deco-sites/scarcom/components/product/ProductAdvancedDetails/AdvancedDetails.tsx";
import SpecificationsTab from "deco-sites/scarcom/components/product/ProductAdvancedDetails/SpecificationsTab.tsx";
import { useState } from "preact/hooks";

function DetailsControl(
  { contentDetails, page }: {
    contentDetails?: IContentDetailsProps[];
    page?: ProductDetailsPage;
  },
) {
  const [tab, setTab] = useState<"description" | "specification">(
    "description",
  );

  return (
    <div>
      <div class="flex flex-row items-center justify-center gap-[40px] px-[20px] py-[12px] border-b border-[#D3DBE8] mb-[18px] lg:justify-start lg:pl-0">
        {contentDetails &&
          (
            <button
              class={`
                        not-italic text-[20px] leading-[23px] uppercase relative lg:text-[24px] lg:leading-[28px]
                        ${
                tab === "description"
                  ? "font-bold text-[#015388]"
                  : "font-normal text-[#848689]"
              }
                    `}
              onClick={() => setTab("description")}
            >
              Descrição{" "}
              {(tab === "description") && (
                <div class="w-full flex bg-[#015388] h-[5px] rounded-[13px] absolute bottom-[-15px]" />
              )}
            </button>
          )}

        {page &&
          (
            <button
              class={`
                        not-italic text-[20px] leading-[23px] uppercase relative lg:text-[24px] lg:leading-[28px]
                        ${
                tab === "specification" || !contentDetails
                  ? "font-bold text-[#015388]"
                  : "font-normal text-[#848689]"
              }
                    `}
              onClick={() => setTab("specification")}
            >
              {contentDetails ? "Especificações" : "Descrição"}
              {(tab === "specification" || !contentDetails) && (
                <div class="w-full flex bg-[#015388] h-[5px] rounded-[13px] absolute bottom-[-15px]" />
              )}
            </button>
          )}
      </div>

      {contentDetails &&
        (
          <AdvancedDetails
            state={tab === "description"}
            contentDetails={contentDetails}
          />
        )}

      {page &&
        (
          <SpecificationsTab
            state={tab === "specification" || !contentDetails}
            page={page}
          />
        )}
    </div>
  );
}

export default DetailsControl;
