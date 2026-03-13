import { type Section as Section } from "@deco/deco/blocks";
export interface Props {
  /**
   * @description Content will be rendered as iframe .
   */
  url?: string;
  asideMenu: Section;
}
function MapContent(
  { url, asideMenu: { Component: AsideComponent, props: asideProps } }: Props,
) {
  return (
    <div class="mb-16">
      <AsideComponent {...asideProps} />
      <h1 class="font-bold text-xl mb-7">Nossas Lojas</h1>
      <p class="font-normal text-base mb-10">
        Descubra onde tem uma Euro mais perto de você.
      </p>
      {url
        ? (
          <iframe src={url} width="100%" height="500px" allow="geolocation *;">
          </iframe>
        )
        : null}
    </div>
  );
}
export default MapContent;
