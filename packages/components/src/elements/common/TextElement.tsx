import { cn } from "../../lib/utils";

export interface TextElementProps {
  body?: string;
  bodyStyle?: string;
  className?: string;
  label?: string;
  labelStyle?: string;
  title?: string;
  titleStyle?: string;
}

function TextElement({
  body,
  bodyStyle,
  className,
  label,
  labelStyle,
  title,
  titleStyle,
}: TextElementProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center pb-[4px] text-on-surface",
        className
      )}
    >
      {label ? (
        <p
          className={cn(
            "flex text-label-medium font-semibold text-on-surface-variant",
            labelStyle
          )}
        >
          {label}
        </p>
      ) : null}

      {title ? (
        <h2 className={cn("flex text-title-medium font-semibold", titleStyle)}>
          {title}
        </h2>
      ) : null}

      {body ? (
        <p className={cn("text-body-medium text-on-surface-variant", bodyStyle)}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

TextElement.displayName = "TextElement";

export { TextElement };
