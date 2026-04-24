import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-base border-2 border-border bg-clip-padding text-sm font-heading font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-border disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-main text-main-foreground shadow-shadow hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_var(--border)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none",
        outline:
          "bg-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-shadow active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
        secondary:
          "bg-secondary-background text-foreground shadow-shadow hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_var(--border)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none",
        ghost:
          "border-transparent hover:bg-main/20 active:translate-y-px text-foreground",
        destructive:
          "bg-destructive text-white shadow-shadow hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_var(--border)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none",
        link: "border-transparent text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-8 gap-1 px-2.5 text-xs",
        lg: "h-11 gap-2 px-5 text-base",
        icon: "size-9",
        "icon-xs": "size-6",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
