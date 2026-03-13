export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
};

export default function SearchPagination({ pageInfo }: Props) {
  const { records = 0, recordPerPage = 0, currentPage, nextPage } = pageInfo;
  const pages = Math.round(records / recordPerPage);

  const pageDots = (pages: number) => {
    const dots: unknown[] = [];

    for (let index = 0; index < pages; index++) {
      const page = index + 1;
      const queryParams = new URLSearchParams(nextPage);
      queryParams.set("page", page.toString());

      if (page == currentPage) {
        dots.push(
          <span class="min-w-10 w-10 h-10 max-h-max bg-primary rounded-full text-base-100 flex items-center justify-center text-sm font-bold">
            {page}
          </span>,
        );
      } else if (page < currentPage) {
        dots.push(
          <a
            aria-label="previous page link"
            rel="prev"
            href={`?${queryParams?.toString()}` ?? "#"}
            class="min-w-10 w-10 h-10 max-h-max border-2 border-black text-black rounded-full flex items-center justify-center text-sm font-bold"
          >
            {page}
          </a>,
        );
      } else {
        dots.push(
          <a
            aria-label="next page link"
            rel="next"
            href={`?${queryParams?.toString()}` ?? "#"}
            class="min-w-10 w-10 h-10 border-2 border-black text-black rounded-full flex items-center justify-center text-sm font-bold"
          >
            {page}
          </a>,
        );
      }
    }

    return dots;
  };

  return (
    <div
      class={`
        ${pages > 19 ? "justify-left overflow-x-scroll" : "justify-center"}
        flex items-center my-5 gap-[10px] `}
    >
      {pageDots(pages)}
    </div>
  );
}
