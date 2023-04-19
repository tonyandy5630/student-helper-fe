import React, { memo } from "react"
import Link from "next/link"
import { Tab } from "@mui/material"

export type NavLinkType = {
  label?: React.ReactElement
  href: string
  className?: string
  curPathName: string
}

function NavLink({ label, href, className, curPathName }: NavLinkType) {
  return (
    <Tab
      label={label}
      LinkComponent={Link}
      href={href}
      className={`${className} ${href === curPathName ? "text-blue-400" : ""}`}
    />
  )
}

export default memo(NavLink)
