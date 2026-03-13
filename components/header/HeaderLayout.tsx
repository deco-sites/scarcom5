import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Logo
   * @description logo desktop e mobile
   */
  logo?: {
    desktop: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    mobile: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    alt?: string;
  };

  /**
   * @title Minicart settings
   */
  minicart: ICartProps;
  /**
   * @title Search bar settings
   */
  searchbar: SearchbarProps;
}

function HeaderLayout({ minicart, searchbar, logo }: Props) {
  return (
    <header class="z-50 py-2">
      <div class="flex justify-between items-center lg:p-0">
        <div class="flex items-center gap-5">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            {logo?.desktop?.image && (
              <Image
                class="max-sm:hidden"
                src={logo?.desktop?.image}
                width={logo?.desktop?.width ?? 236}
                height={logo?.desktop?.height ?? 47}
                alt={logo?.alt ?? "Logo"}
                title={logo?.alt ?? "Logo"}
              />
            )}

            {logo?.mobile?.image && (
              <Image
                class="sm:hidden max-w-[45vw]"
                src={logo?.mobile?.image}
                width={logo?.mobile?.width ?? 176}
                height={logo?.mobile?.height ?? 35}
                alt="Logo"
                title="Logo"
              />
            )}
          </a>
        </div>
        <div className="hidden md:flex flex-1 w-full">
          <SearchBarComponent
            searchbar={{ variant: "desktop", ...searchbar }}
          />
        </div>
        <div class="max-lg:hidden flex justify-between"></div>
        <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
          <div class="flex items-center xl:gap-4 lg:gap-2">
            {
              /* <a
              class="rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center"
              href="/wishlist"
            >
              <Icon
                class="text-base-content"
                id="Wishlist"
                width={24}
                height={24}
                strokeWidth={1}
              />
            </a> */
            }
            <a
              class="max-lg:hidden rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center"
              href="/my-account"
            >
              <Icon
                class="text-base-content"
                id="User"
                width={24}
                height={25}
                strokeWidth={1}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <SearchBarComponent searchbar={{ variant: "mobile", ...searchbar }} />
      </div>
      <Modals minicart={minicart} />
      {/* <WhatsApp phone={18997742232} /> */}
    </header>
  );
}

export default HeaderLayout;
