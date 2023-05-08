import { Checkbox } from "./ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-primary",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const checkboxVariants = cva("", {
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

interface CheckboxWithTextProps
  extends CheckboxPrimitive.CheckboxProps,
    VariantProps<typeof labelVariants>,
    VariantProps<typeof checkboxVariants>,
    VariantProps<typeof helperTextVariants> {
  id: string;
  text?: string;
  descText?: string;
  helperText?: string;
  className?: string;
}

const CheckboxWithText = React.forwardRef<
  CheckboxPrimitive.CheckboxProps,
  CheckboxWithTextProps
>(({ id, className, text, descText, helperText, variant, ...props }, ref) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="items-top flex space-x-2">
        <Checkbox
          id={id}
          className={cn(checkboxVariants({ variant, className }))}
          {...props}
          ref={ref}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor={id}
            className={cn(labelVariants({ variant, className }))}
          >
            {text}
          </Label>
          <p className="text-sm text-muted-foreground">{descText}</p>
        </div>
      </div>
      <p className={cn(helperTextVariants({ variant, className }))}>
        {helperText}
      </p>
    </div>
  );
});
CheckboxWithText.displayName = "CheckboxWithText";

export { CheckboxWithText, type CheckboxWithTextProps };
