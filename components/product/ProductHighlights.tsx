// import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export type HighlightsColors =
  | "emphasis"
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "base"
  | "info"
  | "success"
  | "warning"
  | "error";

export type AlignHorizontal =
  | "end"
  | "start"
  | "center";

export interface HighLight {
  icon?: ImageWidget;
  label?: string;
  collectionId?: string;
  /** @default 0 */
  minPrice?: number;
  backgorundColor?: string;
  color?: string;
  /** @title placement column */
  columnStart?: number;
  /** @title placement row */
  rowStart?: number;
  rowSpan?: number;
  colSpan?: number;
  alignHorizontal?: AlignHorizontal;
}

type Props = {
  product: ProductDetailsPage["product"];
  className?: string;
  highlights?: HighLight[];
  listPrice?: number;
};

// const GRID_ROWS: Record<number, string> = {
//   1: "grid-rows-1",
//   2: "grid-rows-2",
//   3: "grid-rows-3",
//   4: "grid-rows-4",
//   5: "grid-rows-5",
//   6: "grid-rows-6",
// };

// const GRID_COLUMNS: Record<number, string> = {
//   1: "grid-cols-1",
//   2: "grid-cols-2",
//   3: "grid-cols-3",
//   4: "grid-cols-4",
//   5: "grid-cols-5",
//   6: "grid-cols-6",
// };

export const GRID_COL_START: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
};

export const GRID_ROW_START: Record<number, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
};

export const GRID_ROW_SPAN: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};

export const GRID_COL_SPAN: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

export const GRID_ROW_HORIZONTAL: Record<AlignHorizontal, string> = {
  "end": "justify-self-end",
  "start": "justify-self-start",
  "center": "justify-self-center",
};

function ProductHighlights(props: Props) {
  const { product, highlights, listPrice } = props;
  const additionalProperty = product?.additionalProperty ?? [];
  const productHighlights = additionalProperty;

  if (!productHighlights.length) return null;
  if (!highlights) return null;

  return (
    <>
      {productHighlights.map(({ value, propertyID }) => {
        return highlights.map(
          (
            {
              collectionId,
              minPrice = 0,
              backgorundColor,
              color,
              label,
              icon,
              colSpan,
              rowStart,
              columnStart,
              rowSpan,
              alignHorizontal,
            },
          ) => {
            if (
              propertyID == collectionId &&
              (listPrice ? listPrice >= minPrice : true)
            ) {
              return (
                <div
                  class={`flex box-content  w-fit text-[9px] 2xl:text-[10px] uppercase font-bold border-none  rounded-lg  bg-opacity-100 opacity-100
                  ${rowStart ? GRID_ROW_START[rowStart] : "row-start-auto"}
                  ${columnStart ? GRID_COL_START[columnStart] : "col-start-1"}
                  ${GRID_ROW_SPAN[rowSpan ?? 0]}
                  ${GRID_COL_SPAN[colSpan ?? 0]}
                  ${GRID_ROW_HORIZONTAL[alignHorizontal ?? "start"]}
                  ${icon ? "p-0 self-start" : "p-1 2xl:p-2 self-start"}
                  `}
                  style={{
                    background: backgorundColor,
                    color,
                  }}
                >
                  {icon
                    ? (
                      <Image
                        src={icon}
                        width={58}
                        height={58}
                      />
                    )
                    : label
                    ? label
                    : value}
                </div>
              );
            } else {
              return null;
            }
          },
        );
      })}
    </>
  );
}

export default ProductHighlights;
