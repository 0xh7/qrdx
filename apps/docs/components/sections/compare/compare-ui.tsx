import React from 'react'
import { SectionHeader } from '../section-header'
import { Compare } from '@/components/ui/compare'
import { Icons } from '@/components/icons'

const CompareUISection = ({ competitorName, competitorLogo }: { competitorName: string, competitorLogo: string }) => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          QRdx is supercharged with customisations powers!
        </h2>
      </SectionHeader>
      
      <div className='mt-8 w-full max-w-5xl'>
        <div className='isolate w-full overflow-hidden rounded-2xl border bg-secondary'>
            <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-secondary px-4 py-2.5">
                <Icons.logo className="size-8" />
                <span className="text-sm text-muted-foreground">vs.</span>
                <img src={competitorLogo} alt={competitorName} className="size-8 rounded-full" />
            </div>
            <Compare slideMode='drag' className='w-full' />
        </div>
      </div>
      
    </section>
  )
}

export default CompareUISection
