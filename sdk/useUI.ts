/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayBuyWarning = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  displaySearchDrawer,
  displaySearchPopup,
  displayBuyWarning,
};

export const useUI = () => state;
