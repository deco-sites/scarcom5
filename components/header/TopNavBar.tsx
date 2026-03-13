import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import { useId } from "preact/hooks";

export interface Props {
  /**
   * @description Alerts available in the top nav bar
   */
  alerts: Alerts[];

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

type IconId = "" | AvailableIcons;

export interface Alerts {
  textAlert: string;
  /** @format color */
  textColor: string;
  image?: ImageWidget;
  alt?: string;
  /** @default */
  idIcon?: IconId;

  /**
   * @title URL
   * @description Link para direcionar a página desejada
   */
  url?: string;
  /**
   * @title Opcoes de link
   * @description Abrirá link de página interna ou externa ( _blank = externa e _self = interna ).
   */
  target?: "_blank" | "_self";
}

function TipItem(alert: Alerts) {
  return (
    <span>
      {alert.image
        ? (
          <Image
            src={alert.image}
            alt={alert.alt}
            width={18}
            height={18}
          />
        )
        : (
          alert.idIcon && (
            <Icon
              id={alert.idIcon}
              width={18}
              height={18}
              strokeWidth={2}
              stroke="#fff"
            />
          )
        )}
    </span>
  );
}

function TopNavBar({ alerts = [], interval = 1 }: Props) {
  const id = `${useId()}-top-navbar`;

  return (
    <>
      {/*  mobile version */}
      <div id={id} class="grid lg:hidden">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
          {alerts.map((alert, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <a
                href={alert.url}
                target={alert.target}
                class="flex justify-center items-center w-screen"
              >
                <TipItem {...alert} />
                <span
                  class="text-[10px] h-[25px] flex items-center ml-3 lg:text-xs"
                  style={{ color: alert.textColor }}
                >
                  {alert.textAlert}
                </span>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>

      {/*  desktop version */}
      <div class="h-7 max-lg:hidden container">
        <div class="flex justify-between">
          {
            <a
              href={alerts[0].url}
              target={alerts[0].target}
              class="flex items-center"
            >
              <span
                class="text-sm h-[25px] flex items-center ml-3"
                style={{ color: alerts[0].textColor }}
              >
                {alerts[0].textAlert}
              </span>
            </a>
          }
          <div class="flex gap-[40px]">
            {alerts.map((alert, index) => {
              if (index === 0) return null;

              return (
                <a
                  href={alert.url}
                  target={alert.target}
                  class="flex items-center"
                >
                  <TipItem {...alert} />
                  <span
                    class="text-sm h-[25px] flex items-center ml-3"
                    style={{ color: alert.textColor }}
                  >
                    {alert.textAlert}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNavBar;
