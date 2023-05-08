import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

type ComboboxItem = {
  value: string;
  label: string;
};

interface ComboboxProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  name: string;
  data: ComboboxItem[];
}

const Combobox = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  ComboboxProps
>(({ name, data, value, className, onValueChange, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">
            {value
              ? data.find((item) => item.value === value)?.label
              : `Select ${name}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command {...props} ref={ref}>
          <CommandInput placeholder={`Search ${name}...`} />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => {
                  // example in docs uses "currentValue: string" as argument
                  // "currentValue: string" from onSelect is all lowercase
                  // if item.value contains uppercase, it will not match
                  // so I use item.value instead
                  if (onValueChange) {
                    onValueChange(item.value);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
Combobox.displayName = "Combobox";

export { Combobox, type ComboboxProps, type ComboboxItem };
