import Icon from "$store/components/ui/Icon.tsx";

interface props {
  onClickBtn: () => void;
  size: number;
  classes?: string;
}

function CloseButton({ onClickBtn, size, classes }: props) {
  return (
    <button onClick={onClickBtn}>
      <Icon
        id="XMark"
        class={classes}
        width={size}
        height={size}
        strokeWidth={2}
      />
    </button>
  );
}

export default CloseButton;
