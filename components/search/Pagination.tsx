import { PageInfo } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  pageInfo: PageInfo;
  productsLength: number;
  startingPage: number;
  url: string;
}

const goToPage = (page: number, url: string) => {
  const newURL = new URL(url);
  newURL.searchParams.set("page", `${page}`);
  return newURL.toString();
};

export default function Pagination(
  { pageInfo, productsLength, startingPage, url }: Props,
) {
  const { recordPerPage, records = 0, nextPage, previousPage, currentPage } =
    pageInfo;

  const getLastPageLink = () => {
    if (currentPage === lastPage) {
      return "#";
    }
    return nextPage
      ? nextPage.replace(`page=${currentPage + 1}`, `page=${lastPage}`)
      : "#";
  };

  const getFirstPageLink = () => {
    if (currentPage === 1) {
      return "#";
    }
    return previousPage
      ? previousPage.replace(`page=${currentPage - 1}`, `page=1`)
      : "#";
  };

  const perPage = recordPerPage || productsLength;
  const lastPage = Math.ceil(records / perPage);
  const zeroIndexedOffsetPage = currentPage - startingPage;
  const pageOptions = [];
  for (let i = 1; i <= lastPage; i++) {
    pageOptions.push({ pageName: `Página ${i}`, pageIndex: i });
  }

  return (
    <div class="flex justify-center my-4">
      <div class="join">
        <a
          aria-label="first page link"
          rel="first"
          href={getFirstPageLink()}
          class="btn max-lg:px-2 btn-ghost join-item disabled:bg-transparent"
          disabled={!previousPage}
        >
          <span class="hidden lg:block">Primeira página</span>
          <span class="lg:hidden">
            <Icon id="DoubleChevronLeft" size={24} strokeWidth={2} />
          </span>
        </a>
        <a
          aria-label="previous page link"
          rel="prev"
          href={previousPage ?? "#"}
          class="btn max-lg:px-2 btn-ghost join-item disabled:bg-transparent"
          disabled={!previousPage}
        >
          <Icon id="ChevronLeft" size={24} strokeWidth={2} />
        </a>
        <div class="btn max-lg:px-2 btn-ghost cursor-pointer join-item relative">
          <label for="pageOptions">
            Página {zeroIndexedOffsetPage} de {lastPage}
          </label>
          <input
            type="checkbox"
            class="w-0 h-0 peer"
            id="pageOptions"
            name="pageOptions"
          />
          <div class="absolute top-full bg-white peer-checked:flex shadow-md rounded-md max-h-48 overflow-auto w-full hidden flex-col items-center">
            {pageOptions.map((option, index) => (
              <>
                <a
                  aria-label="page link"
                  rel="page link"
                  href={goToPage(index + 1, url)}
                  class="btn max-lg:px-2 btn-ghost w-full"
                >
                  {option.pageName}
                </a>
              </>
            ))}
          </div>
        </div>
        <a
          aria-label="next page link"
          rel="next"
          href={nextPage ?? "#"}
          class="btn max-lg:px-2 btn-ghost join-item"
          disabled={!nextPage}
        >
          <Icon id="ChevronRight" size={24} strokeWidth={2} />
        </a>
        <a
          aria-label="last page link"
          rel="last"
          href={getLastPageLink()}
          class="btn max-lg:px-2 btn-ghost join-item disabled:bg-transparent"
          disabled={!nextPage}
        >
          <span class="hidden lg:block">Última página</span>
          <span class="lg:hidden">
            <Icon
              id="DoubleChevronLeft"
              class="rotate-180"
              size={24}
              strokeWidth={2}
            />
          </span>
        </a>
      </div>
    </div>
  );
}
