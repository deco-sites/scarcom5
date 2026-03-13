import QuantitySelector from "../../components/ui/QuantitySelector.tsx";
import RequestQuote from "deco-sites/scarcom/islands/RequestQuote.tsx";
import { useState } from "preact/hooks";
import useIsMobile from "../../components/hooks/useIsMobile.tsx";
import AddToCartButton from "../../components/product/AddToCartButton.tsx";

type Props = {
  productID: string;
  seller: string;
  price?: number;
  listPrice?: number;
  productName: string;
  productGroupID: string;
  labelBuyButtonDesktop?: string;
  labelBuyButtonMobile?: string;
};

export default function AddToCartActions(
  { productID, seller, price, listPrice, productName, productGroupID }: Props,
) {
  const [quantity, setQuantity] = useState(1);
  const mobile = useIsMobile();
  // const discount = price && listPrice ? listPrice - price : 0;

  return (
    <div class="flex flex-col xl:flex-row lg:items-center lg:justify-start w-full gap-[30px] lg:gap-[6px]">
      <QuantitySelector
        quantity={quantity}
        onChange={(_quantity) => {
          setQuantity(_quantity);
        }}
      />
      {
        /* <>
        <AddToCartButtonVTEX
          url={""}
          name={productName}
          productID={productID}
          productGroupID={productGroupID}
          price={price ?? 0}
          discount={discount}
          seller={seller}
        />
      </> */
      }
      <div class="flex gap-[6px]">
        <AddToCartButton
          skuId={productID}
          sellerId={seller}
          price={price ?? 0}
          discount={price && listPrice ? listPrice - price : 0}
          name={productName}
          productGroupId={productGroupID}
          quantity={quantity}
          label={mobile ? "comprar" : "comprar"}
          showIcon
          classes="btn btn-md btn-primary uppercase transition-all  hover:text-neutral-100 font-bold text-info"
        />
        <RequestQuote productName={productName} />
      </div>
    </div>
  );
}
