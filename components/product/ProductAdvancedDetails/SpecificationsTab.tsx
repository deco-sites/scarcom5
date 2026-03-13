import { ProductDetailsPage } from "apps/commerce/types.ts";

function SpecificationsTab(
  { page, state }: { page: ProductDetailsPage; state: boolean },
) {
  const { product: { description } } = page;

  return (
    <div class={` ${state ? "flex" : "hidden"}`}>
      <div
        class="not-italic text-[14px] leading-[16px] text-[#848689]"
        dangerouslySetInnerHTML={{ __html: description ? description : "" }}
      />
    </div>
  );
}

export default SpecificationsTab;
