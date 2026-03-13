import Filters from "../../components/search/Filters.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Sort from "../../islands/Sort.tsx";
import SearchPagination from "../../components/search/SearchPagination.tsx";
import { DiscountBadgeColors } from "../../components/product/DiscountBadge.tsx";
import { Layout } from "../../components/product/ProductCard.tsx";
import { HighLight } from "../../components/product/ProductHighlights.tsx";
import { isArray } from "https://deno.land/x/djwt@v2.8/util.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { type Section as Section } from "@deco/deco/blocks";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";
import { type LoaderReturnType } from "@deco/deco";
export interface DiscountBadgeProps {
  label: string;
  variant: DiscountBadgeColors;
}
export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Filters, hide filter separate per ","
   */
  hideFilter?: string;
  /**
   * @description Flags, displayed when  products are found
   */
  highlights?: HighLight[];
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
  /**
   * @description Layout products
   */
  layout: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /**
   * @description Not found section, displayed when no products are found
   */
  notFoundSection: Section;
}
function Result({
  page,
  variant,
  layout,
  startingPage = 0,
  hideFilter: hideFilters,
  highlights,
}: Omit<Omit<Props, "page">, "notFoundSection"> & {
  page: ProductListingPage;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const id = useId();
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const hideFilter = hideFilters?.split(",");
  const newFilters = filters
    .filter(({ key }) => !hideFilter?.includes(key))
    .filter(({ values }) => isArray(values) && values.length)
    .filter(({ label }) => !["Departments", "Brands"]?.includes(label));
  const productsFound = (
    <h2 class="text-base font-medium uppercase text-secondary">
      {pageInfo.records} Produtos encontrados
    </h2>
  );
  return (
    <>
      <div>
        <div class="flex flex-row gap-8">
          {variant === "aside" && newFilters.length > 0 && (
            <aside class="mt-1 hidden w-min min-w-[270px] lg:block">
              <Filters filters={newFilters} />
            </aside>
          )}
          <div class="max-w-auto flex w-full flex-col gap-5 lg:max-w-[calc(100%-270px)]">
            <div class="flex items-center justify-between gap-2.5">
              <div class="hidden lg:block">{productsFound}</div>
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
              />
              {sortOptions.length > 0
                ? (
                  <label class="flex w-1/2 items-center gap-[10px] lg:w-auto">
                    <span class="hidden whitespace-nowrap text-sm text-[#585858] lg:inline">
                      Ordenar por:
                    </span>
                    <Sort sortOptions={sortOptions} />
                  </label>
                )
                : null}
            </div>
            <div class="lg:hidden">{productsFound}</div>
            <div class="flex-grow">
              <ProductGallery
                products={products}
                layout={layout}
                highlights={highlights}
              />
              <SearchPagination pageInfo={pageInfo} />
            </div>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}
function SearchResult({
  page,
  notFoundSection: { Component: NotFoundSection, props: notFoundProps },
  ...props
}: Props) {
  if (!page || !page.products || page.products.length === 0) {
    return <NotFoundSection {...notFoundProps} />;
  }
  return <Result {...props} page={page} />;
}
export default SearchResult;
