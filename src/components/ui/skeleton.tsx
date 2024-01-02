import { cn } from "@/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-[pulse_1s_cubic-bezier(0.1,0,0.1,1)_infinite] rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
