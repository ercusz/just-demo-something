import { Combobox, type ComboboxProps } from "./Combobox";
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

interface ComboboxWithTextProps
  extends ComboboxProps,
    VariantProps<typeof labelVariants>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof helperTextVariants> {
  id: string;
  text: string;
  helperText?: string;
}

const ComboboxWithText = ({
  id,
  text,
  helperText,
  data,
  value,
  onValueChange,
  variant,
  className,
}: ComboboxWithTextProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id} className={cn(labelVariants({ variant, className }))}>
        {text}
      </Label>
      <Combobox
        value={value}
        data={data}
        onValueChange={onValueChange}
        name={text}
        className={cn(inputVariants({ variant, className }))}
      />
      <p className={cn(helperTextVariants({ variant, className }))}>
        {helperText}
      </p>
    </div>
  );
};

export { ComboboxWithText, type ComboboxWithTextProps };
