import type { SocialIcons } from "../../components/ui/Icon.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { SemanticColors } from "../../components/ui/BannerGrid.tsx";

export type TextAlign = "Left" | "Center" | "Right" | "Justify";

export type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const TEXT_ALIGMENT: Record<TextAlign, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
  Justify: "text-justify",
};

export interface Links {
  label: string;
  href: string;
  icon: SocialIcons;
}

export interface Props {
  /**
   * @title Título
   */
  title: string;
  /**
   * @title A tag header para o título
   * @description O padrão é h2
   * @default h2
   */
  titleTag?: HeaderTag;
  /**
   * @title Cor do título
   * @default secondary
   */
  titleColor?: SemanticColors;
  caption?: string;
  /**
   * @title Cor do caption
   * @default secondary
   */
  captionColor?: SemanticColors;
  /**
   * @title Descrição
   * @format html
   */
  html?: string;
  textAlign?: TextAlign;
  links?: Links[];
}

const TEXT_COLORS = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  base: "text-base",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export default function InfoCard({
  html,
  caption,
  title,
  textAlign,
  links,
  titleColor,
  titleTag = "h2",
  captionColor,
}: Props) {
  const textAlignment = TEXT_ALIGMENT[textAlign ? textAlign : "Center"];

  const TitleTag = titleTag;

  return (
    <section class={`${textAlignment} pt-8`}>
      {caption && (
        <p
          class={`text-xs font-bold uppercase ${
            titleColor ? TEXT_COLORS[titleColor] : "text-primary"
          }`}
        >
          {caption}
        </p>
      )}
      <TitleTag
        class={`mb-5 text-xl font-bold uppercase lg:text-2xl ${
          captionColor ? TEXT_COLORS[captionColor] : "text-primary"
        } `}
      >
        {title}
      </TitleTag>
      {links?.length
        ? (
          <ul class="flex items-center justify-center gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} class="btn btn-primary h-8 min-h-0 gap-3">
                  <Icon id={link.icon} size={16} strokeWidth={1} />
                  <span class="hidden text-xs uppercase md:block">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )
        : null}
      {html
        ? (
          <div
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: html }}
            class="text-base-contentfont-normal m-auto max-w-5xl pb-12 text-sm"
          />
        )
        : null}
    </section>
  );
}
