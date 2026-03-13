import Markdown from "../../components/ui/Markdown.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTMLWidget;
}

function TextContent({ content }: Props) {
  return (
    <div class="mb-12 lg:mb-20">
      <Markdown text={content.replace(/<p>|<\/p>/g, "\n")} />
    </div>
  );
}

export default TextContent;
