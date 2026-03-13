import { Product } from "apps/commerce/types.ts";
import { HighLight } from "../../components/product/ProductHighlights.tsx";

import ProductCard, { Layout } from "../../components/product/ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  layout: Layout;
  highlights?: HighLight[];
}

function ProductGallery({ products, layout, highlights }: Props) {
  return (
    <div class="grid  grid-cols-1 gap-2 items-center sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          layout={layout}
          highlights={highlights}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
