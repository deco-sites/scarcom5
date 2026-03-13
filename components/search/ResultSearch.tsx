import Spinner from "$store/components/ui/Spinner.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import { EditableProps } from "$store/components/search/Searchbar.tsx";
import type { Suggestion } from "apps/commerce/types.ts";

export type ResultSearch = EditableProps & {
  valueSearch: string;
  notFound: boolean;
  suggestions: { value: Suggestion | null };
  loading: {
    value: boolean;
  };
  IdCollection?: string;
};

const ResultSearch = (
  { valueSearch, notFound, cardLayout, suggestions, loading, IdCollection: _ }:
    ResultSearch,
) => {
  if (valueSearch !== "" && suggestions?.value != null) {
    return (
      <div className="md:absolute md:w-full md:top-[130px] bg-white md:left-0  md:m-auto md:px-5 md:py-2 z-40">
        <div className="flex flex-col 2xl:justify-center gap-6 divide-y divide-base-200 mt-6 empty:mt-0 md:flex-row md:divide-y-0 md:max-w-[1495px] m-auto">
          {notFound
            ? (
              <div class="py-16 md:py-6! flex flex-col gap-4 w-full">
                <span
                  class="font-medium text-xl text-center"
                  role="heading"
                  aria-level={3}
                >
                  Nenhum resultado encontrado
                </span>
                <span class="text-center text-base-300">
                  Vamos tentar de outro jeito? Verifique a ortografia ou use um
                  termo diferente
                </span>
              </div>
            )
            : (
              <>
                {suggestions.value!.searches?.length
                  ? (
                    <div class="flex flex-col gap-6 md:w-[15.25rem] md:max-w-[15.25rem]\">
                      <div class="flex gap-2 items-center">
                        <span
                          class="font-medium text-xl"
                          role="heading"
                          aria-level={3}
                        >
                          Sugestões
                        </span>
                        {loading.value && <Spinner />}
                      </div>
                      <ul id="search-suggestion" class="flex flex-col gap-6">
                        {suggestions.value!.searches?.map(({ term }) => (
                          <li>
                            <a
                              href={`/busca?q=${term}`}
                              class="flex gap-4 items-center"
                            >
                              <span>
                                <Icon
                                  id="MagnifyingGlass"
                                  size={20}
                                  strokeWidth={0.01}
                                />
                              </span>
                              <span>
                                {term}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                  : null}
                <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden md:w-full ">
                  <div class="flex gap-2 items-center">
                    <span
                      class="font-medium text-xl"
                      role="heading"
                      aria-level={3}
                    >
                      Produtos sugeridos
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <Slider class="carousel gap-2 lg:justify-between lg:gap-0">
                    {suggestions.value!.products?.map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item first:ml-4 last:mr-4 min-w-[200px] w-full max-w-[80%] lg:max-w-[20%]"
                      >
                        <ProductCard
                          product={product}
                          layout={cardLayout}
                          // IdCollection={IdCollection}
                          // tagWarningWidth="70%"
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              </>
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default ResultSearch;
