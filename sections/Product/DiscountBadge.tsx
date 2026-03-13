import {
  AlignHorizontal,
  GRID_COL_SPAN,
  GRID_COL_START,
  GRID_ROW_HORIZONTAL,
  GRID_ROW_SPAN,
  GRID_ROW_START,
} from "../../components/product/ProductHighlights.tsx";

export type DiscountBadgeColors =
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

export interface DiscountBadgeProps {
  label: string;
  variant: DiscountBadgeColors;
  /** @title placement column */
  columnStart?: number;
  /** @title placement row */
  rowStart?: number;
  rowSpan?: number;
  colSpan?: number;
  alignHorizontal?: AlignHorizontal;
}

type Props = {
  price: number;
  listPrice: number;
  label?: string;
  variant?: DiscountBadgeColors;
  className?: string;
  columnStart?: number;
  rowStart?: number;
  rowSpan?: number;
  colSpan?: number;
  alignHorizontal?: AlignHorizontal;
};

const TEXT_COLORS = {
  emphasis: "bg-emphasis",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  neutral: "bg-neutral",
  base: "bg-base",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

function DiscountBadge(props: Props) {
  const {
    price,
    listPrice,
    label,
    variant,
    className,
    colSpan,
    rowStart,
    columnStart,
    rowSpan,
    alignHorizontal,
  } = props;
  const discount = ((listPrice - price) / listPrice) * 100;

  return (
    <div
      class={`flex items-center z-10  
        ${className}
        ${rowStart ? GRID_ROW_START[rowStart] : "row-start-auto"}
        ${columnStart ? GRID_COL_START[columnStart] : "col-start-auto"}
        ${GRID_ROW_SPAN[rowSpan ?? 0]}
        ${GRID_COL_SPAN[colSpan ?? 0]}  
        ${GRID_ROW_HORIZONTAL[alignHorizontal ?? "start"]}  
        `}
    >
      <div
        class={`text-xs max-md:text-[10px] px-[10px] py-[7px]  md:px-[5px] md:py-[5px] uppercase font-bold border-none  rounded-lg flex box-content bg-opacity-100 opacity-100 text-base-100 ${
          TEXT_COLORS[variant ?? "info"]
        }`}
      >
        -{discount?.toFixed(2).slice(0, 2)}% {label ?? "OFF"}
      </div>
    </div>
  );
}

export default DiscountBadge;
