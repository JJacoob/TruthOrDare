import { addStyles } from "@/utils"
import { HTMLAttributes } from "react"

export const Skeleton = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={addStyles("skeleton animate-pulse", className)} {...props}></div>
    )
}