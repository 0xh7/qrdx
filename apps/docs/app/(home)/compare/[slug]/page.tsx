import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compareSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { ComparisonHero } from "@/components/sections/compare/comparison-hero";
import CompareUISection from "@/components/sections/compare/compare-ui";
import ComparePlanSection from "@/components/sections/compare/compare-plan";

export default async function ComparePage(
  props: PageProps<"/compare/[slug]">,
) {
  const params = await props.params;
  const page = compareSource.getPage([params.slug]);

  if (!page) {
    notFound();
  }

  const { body: Mdx } = page.data;

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <ComparisonHero
        competitorName={page.data.title}
        competitorLogo={page.data.logo}
      />
      <CompareUISection 
        competitorName={page.data.title}
        competitorLogo={page.data.logo}  
      />
      <ComparePlanSection
        competitorName={page.data.title}
        competitorLogo={page.data.logo}
      />
      {/* MDX Content - Feature Comparison Tables */}
      <div className="w-full">
        <div className="container max-w-5xl mx-auto px-4 py-12 md:px-6 md:py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-p:text-muted-foreground prose-p:leading-7">
            <Mdx components={getMDXComponents()} />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return compareSource.generateParams().map((params) => ({
    slug: params.slug[0],
  }));
}

export async function generateMetadata(
  props: PageProps<"/compare/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = compareSource.getPage([params.slug]);

  if (!page) {
    notFound();
  }

  const title = `${page.data.title} vs. QRdx | The #1 ${page.data.title} Alternative`;
  const description = `QRdx is your best ${page.data.title} alternative for creating and customising QR codes. See how we outshine ${page.data.title} for all your QR code needs.`;

  return {
    title: `${title}`,
    description,
    openGraph: {
      title: `${title}`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | QRdx`,
      description,
    },
  };
}

