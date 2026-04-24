"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-base border-2 border-border transition-all outline-none focus-visible:ring-2 focus-visible:ring-border disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-[state=checked]:bg-main data-unchecked:bg-secondary-background data-[state=unchecked]:bg-secondary-background shadow-[2px_2px_0px_0px_var(--border)] data-[size=default]:h-[26px] data-[size=default]:w-[50px] data-[size=sm]:h-[20px] data-[size=sm]:w-[40px] box-content",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-sm bg-border border-2 border-transparent ring-0 transition-transform data-checked:bg-main-foreground data-[state=checked]:bg-main-foreground data-unchecked:bg-border data-[state=unchecked]:bg-border group-data-[size=default]/switch:h-[18px] group-data-[size=default]/switch:w-[18px] group-data-[size=sm]/switch:h-[12px] group-data-[size=sm]/switch:w-[12px] group-data-[size=default]/switch:data-checked:translate-x-[26px] group-data-[size=default]/switch:data-[state=checked]:translate-x-[26px] group-data-[size=sm]/switch:data-checked:translate-x-[20px] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[20px] group-data-[size=default]/switch:data-unchecked:translate-x-[2px] group-data-[size=default]/switch:data-[state=unchecked]:translate-x-[2px] group-data-[size=sm]/switch:data-unchecked:translate-x-[2px] group-data-[size=sm]/switch:data-[state=unchecked]:translate-x-[2px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
