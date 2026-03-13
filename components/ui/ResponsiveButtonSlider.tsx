import { useId } from "preact/hooks";
import Slider from "./Slider.tsx";
import { clx } from "../../sdk/clx.ts";

export interface ButtonSliderItem {
  text: string;
  href: string;
  external?: boolean;
}

export interface Props {
  items: ButtonSliderItem[];
  className?: string;
  buttonClassName?: string;
  isMobile?: boolean;
}

export default function ResponsiveButtonSlider({
  items,
  className,
  buttonClassName,
  isMobile = false,
}: Props) {
  const id = useId();

  if (!items || !items?.length) return null;

  const buttonClassNames = clx(
    "whitespace-nowrap rounded-full border-2 border-primary px-5 py-2 text-sm font-bold text-primary block",
    "transition-colors duration-300 ease-out hover:bg-primary hover:text-white",
    "md:px-10 md:text-base",
    buttonClassName,
  );

  return (
    <div class={className}>
      <h2 class="sr-only">Categorias</h2>

      <nav aria-label="Categorias">
        {!isMobile && (
          <ul class="container hidden flex-wrap gap-4 px-5 md:flex">
            {items.map(({ text, href, external }) => (
              <li>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  class={buttonClassNames}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        )}

        {isMobile && (
          <div class="md:hidden">
            <div id={id} class="relative">
              <Slider class="carousel carousel-center w-full gap-2 overflow-x-auto pl-5 pr-5 md:gap-4">
                {items.map((item, index) => (
                  <Slider.Item index={index} class="carousel-item">
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      class={buttonClassNames}
                    >
                      {item.text}
                    </a>
                  </Slider.Item>
                ))}
              </Slider>
              <Slider.JS rootId={id} />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
