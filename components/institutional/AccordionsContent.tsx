import { AccordionItem } from "./AccordionItem.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  accordions: {
    label: string;
    /**
     * @description Content will be rendered as markdown.
     */
    content: HTMLWidget;
  }[];
}

function AccordionsContent({ accordions }: Props) {
  return (
    <div class="flex flex-col gap-5 pb-12 lg:pb-20">
      {accordions.map(
        (item, index) => (
          <AccordionItem
            title={item.label}
            content={item.content}
            key={index}
          />
        ),
      )}
    </div>
  );
}

export default AccordionsContent;
