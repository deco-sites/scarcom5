import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { formatPrice } from "deco-sites/scarcom/sdk/format.ts";

const bestInstallment = (
  accumulator: UnitPriceSpecification | null,
  current: UnitPriceSpecification,
) => {
  if (current.priceComponentType !== "https://schema.org/Installment") {
    return accumulator;
  }

  if (!accumulator) {
    return current;
  }

  if (
    (current.billingDuration || 0) > (accumulator.billingDuration || 0)
  ) {
    return current;
  }

  return accumulator;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
  priceCurrency?: string,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;
  const installmentValue = formatPrice(billingIncrement, priceCurrency!);

  return `${billingDuration}x de R$ ${installmentValue} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];

  const listPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === "https://schema.org/ListPrice",
  );

  const sellerPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === "https://schema.org/SalePrice",
  );

  const priceWithPixPayment = offer?.priceSpecification.find(
    ({ name }) => name?.toLowerCase() === "pix",
  );

  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = sellerPrice?.price || 0;
  const availability = (offer?.inventoryLevel.value || 0) > 0;
  const manualPixPercentDiscount = 10;
  const availability_quantity = offer?.availability;
  const priceCurrency = aggregateOffer?.priceCurrency;

  const priceWithPixDiscount = (priceWithPixPayment?.price || price) < price
    ? priceWithPixPayment?.price || price
    : price * ((100 - manualPixPercentDiscount) / 100);

  const pixPercentDiscountByDiferenceSellerPrice = Math.round(
    100 - (priceWithPixDiscount * 100) / price,
  );

  const listSellerPriceDiscountPercent = `${
    Math.round(
      (((listPrice?.price || price) - price) / (listPrice?.price || price)) *
        100,
    )
  }%`;

  return {
    price,
    priceWithPixDiscount,
    pixPercentDiscountByDiferenceSellerPrice,
    listPrice: listPrice?.price || price,
    has_discount: (listPrice?.price || price) > price,
    availability,
    seller,
    installment_text: installment && price
      ? installmentToString(installment, price, priceCurrency)
      : null,
    installment: installment || null,
    listSellerPriceDiscountPercent,
    availability_quantity,
  };
};
