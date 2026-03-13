import Filters from "$store/components/search/Filters.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import ProductGallery, {
  Columns,
} from "$store/components/product/ProductGallery.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Sort from "$store/islands/Sort.tsx";
import { DiscountBadgeColors } from "$store/components/product/DiscountBadge.tsx";
import { Layout } from "$store/components/product/ProductCard.tsx";
import { HighLight } from "$store/components/product/ProductHighlights.tsx";
import { isArray } from "https://deno.land/x/djwt@v2.8/util.ts";
import NotFound from "$store/components/search/NotFound.tsx";
import Pagination from "deco-sites/scarcom/components/search/Pagination.tsx";
import { type Section as Section } from "@deco/deco/blocks";
import { type SectionProps as SectionProps } from "@deco/deco";
import { type LoaderReturnType } from "@deco/deco";
export interface DiscountBadgeProps {
  label: string;
  variant: DiscountBadgeColors;
}
export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
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
  /**
   * @description Not found section, displayed when no products are found
   */
  notFoundSection: Section;
}
export const loader = (props: Props, req: Request) => {
  return { ...props, url: req.url };
};
function Result({
  page,
  variant,
  layout,
  hideFilter: hideFilters,
  highlights,
  startingPage = 0,
  url,
}: Omit<Omit<Props, "page">, "notFoundSection"> & {
  page: ProductListingPage;
} & {
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const { nextPage, previousPage } = pageInfo;
  const hideFilter = hideFilters?.split(",");
  const newFilters = filters
    .filter(({ key }) => !hideFilter?.includes(key))
    .filter(({ values }) => isArray(values) && values.length);
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
              <div class="hidden lg:block">
                <span class="text-base font-medium uppercase text-secondary">
                  {pageInfo.records} Produtos encontrados
                </span>
              </div>
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
            <div class="lg:hidden">
              <h2 class="sr-only">Produtos</h2>
              <p class="text-base font-medium uppercase text-secondary">
                {pageInfo.records} Produtos encontrados
              </p>
            </div>
            <div class="flex-grow">
              <ProductGallery
                products={products}
                layout={layout}
                highlights={highlights}
              />
              {/* <SearchPagination pageInfo={pageInfo} /> */}
              {(nextPage || previousPage) && (
                <Pagination
                  url={url}
                  pageInfo={pageInfo}
                  productsLength={products.length}
                  startingPage={startingPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function SearchResult({
  page,
  notFoundSection: { Component: NotFoundSection, props: notFoundProps } = {
    Component: NotFound,
    props: {},
  },
  ...props
}: SectionProps<ReturnType<typeof loader>>) {
  if (!page || !page.products || page.products.length === 0) {
    return <NotFoundSection {...notFoundProps} />;
  }
  return <Result {...props} page={page} />;
}
export default SearchResult;
