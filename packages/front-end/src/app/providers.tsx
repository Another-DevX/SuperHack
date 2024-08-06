import { PageLayout } from '@/components/Layout'
import React, { ReactNode } from 'react'

export default function Providers({children}: {children: ReactNode}) {
  return (
    <PageLayout>
      {children}
    </PageLayout>
  )
}
