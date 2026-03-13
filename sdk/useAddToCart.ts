import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useUI } from "../sdk/useUI.ts";
import { sendEvent } from "../sdk/analytics.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface Options {
  skuId: string;
  sellerId?: string;
  price: number;
  discount: number;
  quantity: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function getMarketingData() {
  const source = getCookie("GTMUtmSource");
  const medium = getCookie("GTMUtmMedium");
  const campaign = getCookie("GTMUtmCampaign");
  if (!campaign && !medium && !source) return undefined;
  const marketingData = campaign
    ? {
      "utmSource": source === "(direct)" ? "direct" : source,
      "utmCampaign": campaign,
      "utmMedium": medium === "(none)" ? "none" : medium,
    }
    : {
      "utmSource": source === "(direct)" ? "direct" : source,
      "utmMedium": medium === "(none)" ? "none" : medium,
    };
  return marketingData;
}

export const useAddToCart = (
  { skuId, sellerId, price, discount, name, productGroupId, quantity }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems, sendAttachment } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sellerId) {
      return;
    }

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: [{ id: skuId, seller: sellerId, quantity }],
      });

      const marketingData = getMarketingData();

      if (marketingData) {
        await sendAttachment({
          attachment: "marketingData",
          body: marketingData,
        });
      }

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            item_id: productGroupId,
            quantity,
            price,
            discount,
            item_name: name,
            item_variant: skuId,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId, sellerId, quantity]);

  return { onClick, loading: isAddingToCart.value };
};
