import React, { memo } from "react"
import Link from "next/link"
import { Tab } from "@mui/material"

export type NavLinkType = {
  label?: React.ReactElement
  href: string
  className?: string
}

function NavLink({ label, href, className }: NavLinkType) {
  return <Tab label={label} LinkComponent={Link} href={href} className={className} />
}

export default memo(NavLink)
