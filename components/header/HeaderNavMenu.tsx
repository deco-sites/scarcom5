import Modals from "$store/islands/HeaderModals.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";

export interface Props {
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
}

function HeaderNavMenu(
  {
    navItems = megaMenuDefaultItems as INavItem[],
  }: Props,
) {
  return (
    <div class="z-50">
      <div class="flex justify-between items-center lg:p-0 bg-primary">
        <div class="container px-5 m-auto max-lg:hidden flex justify-between flex-1 whitespace-nowrap">
          {navItems && navItems?.length
            ? navItems?.map((item) => <NavItem key={item.label} item={item} />)
            : null}
        </div>
      </div>

      <Modals
        menu={{ items: navItems }}
      />
    </div>
  );
}

export default HeaderNavMenu;
