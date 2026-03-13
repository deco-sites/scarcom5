import type { FnContext } from "@deco/deco";
import type { RichText } from "apps/admin/widgets.ts";
import { getTermFromURL, slugify, unslugify } from "../../utils/search.ts";
import ExpandableDescription from "../../islands/ExpandableDescription.tsx";
import ResponsiveButtonSlider from "../../components/ui/ResponsiveButtonSlider.tsx";

/**
 * @titleBy text
 */
export interface CTA {
  /**
   * @title Texto do botão
   */
  text: string;
  /**
   * @title Link do botão
   */
  href: string;
  /**
   * @title Link externo
   */
  external?: boolean;
}

/**
 * @titleBy title
 */
export interface BrandContent {
  /**
   * @title Termos de busca
   * @description Lista de termos para buscar na URL. Por exemplo, para "Western Digital", você pode adicionar "western-digital". Estes são insensíveis a maiúsculas e minúsculas.
   */
  matchers: string[];
  /**
   * @title Título
   * @description Título principal exibido como H1. Se vazio, o nome da marca da VTEX será usado.
   */
  title?: string;
  /**
   * @title Botões de ação (CTAs)
   */
  ctas?: CTA[];
  /**
   * @title Descrição
   * @description Use H2, H3, H4... para títulos e subtítulos.
   */
  description?: RichText;
}

export interface Props {
  /**
   * @title Marcas
   */
  brands: BrandContent[];
  /**
   * @title Altura do texto expandido (desktop)
   * @description A altura máxima do texto expandido quando estiver fechado. Por exemplo, "100px" para 100 pixels.
   */
  maxHeightDesktop?: string;
  /**
   * @title Altura do texto expandido (mobile)
   * @description A altura máxima do texto expandido quando estiver fechado. Por exemplo, "100px" para 100 pixels.
   */
  maxHeightMobile?: string;
}

interface VtexBrand {
  id: number;
  name: string;
  isActive: boolean;
  title: string;
  metaTagDescription?: string;
}

interface LoaderResult extends Omit<BrandContent, "matchers"> {
  title?: string;
  maxHeight?: string;
  isMobile?: boolean;
  isFallback?: boolean;
}

// Endpoint to list all registered brands in VTEX
const API_URL = "https://scarcom.myvtex.com/api/catalog_system/pub/brand/list";

export async function loader(
  { brands, maxHeightDesktop, maxHeightMobile }: Props,
  req: Request,
  ctx: FnContext,
): Promise<LoaderResult> {
  const term = getTermFromURL(new URL(req.url));

  if (!term) {
    const search = new URL(req.url).searchParams.get("q");

    return {
      title: `Resultados de busca${search ? ` para '${search}'` : ""}`,
      isFallback: true,
    };
  }

  const slugifiedTerm = slugify(term);

  const matchedBrand =
    brands?.find(({ matchers }) =>
      matchers.some((matcher) => slugify(matcher) === slugifiedTerm)
    ) || null;

  const isMobile = ctx.device !== "desktop";

  if (matchedBrand) {
    return {
      ...matchedBrand,
      title: matchedBrand?.title?.trim(),
      maxHeight: isMobile ? maxHeightMobile : maxHeightDesktop,
      isMobile,
    };
  }

  try {
    const vtexBrandsResponse = await fetch(API_URL);
    if (!vtexBrandsResponse.ok) throw new Error("VTEX API request failed.");

    const vtexBrands: VtexBrand[] = await vtexBrandsResponse.json();
    const vtexBrand = vtexBrands.find((b) => slugify(b.name) === slugifiedTerm);

    if (vtexBrand) {
      return {
        title: vtexBrand.name,
        maxHeight: isMobile ? maxHeightMobile : maxHeightDesktop,
        isMobile,
      };
    }
  } catch (error) {
    console.error("Failed to fetch or process VTEX brands:", error);
  }

  return {
    title: `Resultados de busca para '${unslugify(slugifiedTerm)}'`,
    isFallback: true,
  };
}

function BrandSEO(props: Awaited<ReturnType<typeof loader>>) {
  const { title, description, ctas, maxHeight, isMobile, isFallback } = props;

  if (isFallback) {
    return <h1 class="sr-only">{title}</h1>;
  }

  return (
    <div class="mb-8 w-full md:mb-16">
      <div class="flex flex-col">
        <div className="my-7 bg-[#023F67] py-5 md:my-10 md:py-10">
          <h1 class="container px-5 text-2xl font-bold uppercase tracking-wider text-white md:text-3xl">
            {title}
          </h1>
        </div>

        <ResponsiveButtonSlider
          items={ctas || []}
          isMobile={isMobile}
          className="mb-10 mt-4 md:mb-16 md:mt-5"
        />

        {description && (
          <ExpandableDescription
            description={description}
            className="[&_*]:!text-[#474747]"
            maxHeight={maxHeight}
          />
        )}
      </div>
    </div>
  );
}

export default BrandSEO;
