import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { INavItem } from "./NavItem.tsx";
export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const component = item?.children?.length
    ? (
      item.variant === "AllCategories"
        ? (
          <div class="collapse collapse-plus relative items-start border-[#C5C6CB] border-b rounded-none">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between after:!text-[20px]">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-base-content border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => (
                  <li class="">
                    <div class="collapse collapse-plus relative items-start">
                      <input
                        type="checkbox"
                        class="absolute left-0 w-full top-0"
                      />
                      <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between after:!text-[20px]">
                        {node.label}
                      </div>
                      <div class="collapse-content px-0 border-b border-[#C5C6CB]">
                        <ul class="border-t border-border-[#C5C6CB] border-solid pt-0 px-0 pl-5">
                          {node.children?.map((nodeChild) => (
                            <li class="">
                              <a
                                href={nodeChild.href}
                                title={nodeChild.label}
                                class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                              >
                                {nodeChild.label}
                              </a>
                            </li>
                          ))}
                          <li class="">
                            <a
                              href={node.href}
                              title={node.label}
                              class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                            >
                              Mostrar tudo
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : (
          <div class="collapse collapse-plus relative items-start border-[#C5C6CB] border-b rounded-none">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between after:!text-[20px]">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-[#C5C6CB] border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => (
                  <li class="">
                    <a
                      href={node.href}
                      title={node.label}
                      class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                    >
                      {node.label}
                    </a>
                  </li>
                ))}
                <li class="">
                  <a
                    href={item.href}
                    title={item.label}
                    class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                  >
                    Mostrar tudo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
    )
    : (
      <a
        href={item.href}
        title={item.label}
        class={`w-full block py-2.5 font-dm-sans font-normal text-sm ${
          item.highlighted ? "text-secondary" : ""
        }`}
      >
        {item.label}
      </a>
    );

  return component;
}

function Menu({ items }: Props) {
  const { displayMenu } = useUI();

  return (
    <div class="flex flex-col justify-center pb-10 h-full">
      <div class="w-full flex items-center justify-between py-4 border-b border-[#C5C6CB] border-solid pb-2 px-4">
        <div class="flex items-center justify-start gap-1 uppercase text-base-content font-medium text-[19px] tracking-[1px]">
          Menu
        </div>
        <button
          class="btn-square btn-ghost relative flex justify-center items-center rounded-full"
          onClick={() => {
            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" width={24} height={24} strokeWidth={2} />
        </button>
      </div>
      <ul class="flex-grow flex flex-col px-4">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>
      <a
        class="flex btn btn-outline gap-2 mx-4 mt-10"
        href="/central-de-atendimento"
      >
        <Icon id="Menu" width={18} height={18} />
        <span class="tracking-[1px] text-xs">fale conosco</span>
      </a>
    </div>
  );
}

export default Menu;
