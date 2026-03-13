import { marky } from "https://deno.land/x/marky@v1.1.6/mod.ts";
import { type LoaderReturnType } from "@deco/deco";
export type Props = {
  text: LoaderReturnType<string>;
};
export default function Markdown({ text }: Props) {
  const body = marky(text);
  return (
    <div
      class="markdown-body prose"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
