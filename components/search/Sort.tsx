import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "../../components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";
const SORT_QUERY_PARAM_LEGACY = "O";

const SORT_TO_LEGACY_SORT = [
  "OrderByPriceDESC",
  "OrderByPriceASC",
  "OrderByTopSaleDESC",
  "OrderByNameDESC",
  "OrderByNameASC",
  "OrderByReleaseDateDESC",
  "OrderByBestDiscountDESC",
  "OrderByScoreDESC",
];

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(globalThis.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (searchParam: string) => {
  const urlSearchParams = new URLSearchParams(globalThis.location.search);
  const isLegacy = SORT_TO_LEGACY_SORT.includes(searchParam);

  if (isLegacy) urlSearchParams.set(SORT_QUERY_PARAM_LEGACY, searchParam);
  urlSearchParams.set(SORT_QUERY_PARAM, searchParam);

  globalThis.location.search = urlSearchParams.toString();
};

const labels = {
  "relevance:desc": "Relevância",
  "price:asc": "Menor preço",
  "price:desc": "Maior preço",
  "name:asc": "A - Z",
  "name:desc": "Z - A",
  "release:desc": "Data de lançamento",
  "orders:desc": "Mais vendidos",
  "discount:desc": "Melhor desconto",
};

const labelsLegacy = {
  "OrderByScoreDESC": "Relevância",
  "OrderByPriceASC": "Menor preço",
  "OrderByPriceDESC": "Maior preço",
  "OrderByNameASC": "A - Z",
  "OrderByNameDESC": "Z - A",
  "OrderByReleaseDateDESC": "Data de lançamento",
  "OrderByTopSaleDESC": "Mais vendidos",
  "OrderByBestDiscountDESC": "Melhor desconto",
};

type LabelKey = keyof typeof labels;
type LabelLegacyKey = keyof typeof labelsLegacy;

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div
      id="sort"
      name="sort"
      class="dropdown dropdown-end w-full lg:auto"
    >
      <label
        tabIndex={0}
        class="btn justify-between w-full lg:w-48 btn-sm font-normal text-black h-[34px] border-2 border-[#E2E3E8] bg-white hover:bg-white"
      >
        {sort
          ? (
            <span class="text-[#A8A8A8] text-xs">
              {labels[sort as LabelKey] || labelsLegacy[sort as LabelLegacyKey]}
            </span>
          )
          : "Selecione"}
        <Icon
          id="ChevronDown"
          height={22}
          width={22}
          strokeWidth={2}
          class="text-base-content"
        />
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content mt-[10px] z-20 px-0 py-[10px] menu shadow bg-base-100 rounded-[10px] w-48"
      >
        {sortOptions.map(({ value, label }) => (
          <li
            class="text-sm h-9 hover:cursor-pointer px-5 hover:bg-primary hover:text-info flex justify-center"
            onClick={() => applySort(value)}
          >
            {labels[label as LabelKey]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sort;
