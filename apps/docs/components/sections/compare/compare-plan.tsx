import React from 'react'
import { SectionHeader } from '../section-header'
import Link from 'next/link'
import { Button } from '@repo/design-system/components/ui/button'

const ComparePlanSection = ({ competitorName, competitorLogo }: { competitorName: string, competitorLogo: string }) => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          QRdx vs {competitorName} <br />
          at a glance
        </h2>
        <p className="text-muted-foreground text-center text-balance">
            QRdx is the #1 alternative to {competitorName}. <br /> With QRdx, you get a more powerful and intuitive QR code management platform for your business.
        </p>
        <Link href="/playground" className='mt-4'>
          <Button>Try the Playground</Button>
        </Link>
      </SectionHeader>
      
    </section>
  )
}

export default ComparePlanSection
