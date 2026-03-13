import Seo from "apps/website/components/Seo.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "apps/commerce/mod.ts";
import {
  renderTemplateString,
  SEOSection,
} from "apps/website/components/Seo.tsx";
import { useOffer } from "deco-sites/scarcom/utils/useOffer.ts";

export interface Props {
  /** @title Data Source */
  jsonLD: ProductDetailsPage | null;
  omitVariants?: boolean;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  const {
    titleTemplate = "",
    descriptionTemplate = "",
    ...seoSiteProps
  } = ctx.seo ?? {};

  const {
    title: titleProp,
    description: descriptionProp,
    jsonLD,
    omitVariants,
  } = props;

  const title = renderTemplateString(
    titleTemplate,
    titleProp || jsonLD?.seo?.title || ctx.seo?.title || "",
  );

  const description = renderTemplateString(
    descriptionTemplate,
    descriptionProp || jsonLD?.seo?.description || ctx.seo?.description || "",
  );

  const image = jsonLD?.product.image?.[0]?.url;

  const canonical = jsonLD?.seo?.canonical
    ? jsonLD?.seo?.canonical
    : jsonLD?.breadcrumbList
    ? canonicalFromBreadcrumblist(jsonLD?.breadcrumbList)
    : undefined;
  const noIndexing = props.noIndexing || !jsonLD || jsonLD.seo?.noIndexing;

  if (omitVariants && jsonLD?.product.isVariantOf?.hasVariant) {
    jsonLD.product.isVariantOf.hasVariant = [];
  }

  const {
    price = 0,
    listPrice = price,
    priceWithPixDiscount = price,
  } = useOffer(jsonLD?.product.offers);

  if (jsonLD?.product.offers?.highPrice) {
    jsonLD.product.offers.highPrice = listPrice;
  }

  if (jsonLD?.product.offers?.lowPrice) {
    jsonLD.product.offers.lowPrice = priceWithPixDiscount;
  }

  if (jsonLD?.product.offers?.offers) {
    if (
      jsonLD.product.offers.offers[0].priceSpecification[0].priceType ===
        "https://schema.org/ListPrice"
    ) {
      jsonLD.product.offers.offers[0].priceSpecification[0].price = listPrice;
    }

    if (
      jsonLD.product.offers.offers[0].priceSpecification[1].priceType ===
        "https://schema.org/SalePrice"
    ) {
      jsonLD.product.offers.offers[0].priceSpecification[1].price =
        priceWithPixDiscount;
    }
  }

  if (jsonLD?.product.offers?.offers) {
    jsonLD?.product.offers?.offers.forEach((e) => {
      e["name"] = e.sellerName;
      delete (e.sellerName);
      delete (e.teasers);
    });
  }

  return {
    ...seoSiteProps,
    title,
    description,
    image,
    canonical,
    noIndexing,
    jsonLDs: [jsonLD],
  };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export default Section;
