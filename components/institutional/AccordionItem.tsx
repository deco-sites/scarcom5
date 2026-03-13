import Markdown from "../../components/ui/Markdown.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTMLWidget;
  title: string;
}

export function AccordionItem({ title, content }: Props) {
  return (
    <details tabIndex={0} class="collapse collapse-plus">
      <summary class="collapse-title pl-0 pr-5 border-b border-base-200 h-auto min-h-11 py-[10.5px] after:!right-1 after:!top-1 after:scale-150">
        {title}
      </summary>
      <div class="collapse-content px-0 !pb-0">
        <div class="pt-5">
          <Markdown
            text={content.replace(/<p>|<\/p>/g, "\n")}
          />
        </div>
      </div>
    </details>
  );
}
