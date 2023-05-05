import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "border-input",
      error: "border-destructive text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const helperTextVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InputWithTextProps
  extends InputProps,
    VariantProps<typeof labelVariants>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof helperTextVariants> {
  id: string;
  text?: string;
  helperText?: string;
}

const InputWithText = ({
  id,
  text,
  helperText,
  variant,
  className,
  ...props
}: InputWithTextProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id} className={cn(labelVariants({ variant, className }))}>
        {text}
      </Label>
      <Input
        {...props}
        id={id}
        className={cn(inputVariants({ variant, className }))}
      />
      <p className={cn(helperTextVariants({ variant, className }))}>
        {helperText}
      </p>
    </div>
  );
};
InputWithText.displayName = "InputWithText";

export { InputWithText, type InputWithTextProps };
