import MainLayout from '@/layouts/MainLayout'
import React, { type ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return React.createElement(MainLayout, null, children)
}

export default Layout
