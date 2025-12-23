"use client";

import { Icons } from "@/components/icons";
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";

interface ComparisonHeroProps {
    competitorName: string;
    competitorLogo: string;
}

export function ComparisonHero({
    competitorName,
    competitorLogo,
}: ComparisonHeroProps) {
    return (
        <div className="border-b relative z-10 mx-auto mt-[72px] w-full max-w-7xl overflow-hidden rounded-2xl p-12 text-center sm:p-12 sm:px-0 sm:pb-16 lg:px-10 lg:py-[100px]">
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                backgroundImage: `
                    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
                repeating-linear-gradient(
                        to right,
                        black 0px,
                        black 3px,
                        transparent 3px,
                        transparent 8px
                        ),
                        repeating-linear-gradient(
                        to bottom,
                        black 0px,
                        black 3px,
                        transparent 3px,
                        transparent 8px
                        ),
                    radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
                `,
                WebkitMaskImage: `
            repeating-linear-gradient(
                        to right,
                        black 0px,
                        black 3px,
                        transparent 3px,
                        transparent 8px
                        ),
                        repeating-linear-gradient(
                        to bottom,
                        black 0px,
                        black 3px,
                        transparent 3px,
                        transparent 8px
                        ),
                    radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
                `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
                }}
            />
            <div className="relative hidden h-[242px] w-full overflow-hidden md:block">
                <div className="mx-auto h-full w-[562px]"><svg width="562" height="242" viewBox="0 0 562 242" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full -translate-x-[3px]"><path d="M1 1H232.586C237.636 1 242.146 4.16226 243.868 8.91041L284.5 121L243.868 233.09C242.146 237.838 237.636 241 232.586 241H1V1Z" fill="url(#_R_a5bsnpfniivb_-a)" stroke="url(#_R_a5bsnpfniivb_-b)"></path><path d="M318.412 9.50797C319.949 4.45422 324.61 1 329.893 1H561V241H329.893C324.61 241 319.949 237.546 318.412 232.492L284.5 121L318.412 9.50797Z" fill="url(#_R_a5bsnpfniivb_-c)" stroke="url(#_R_a5bsnpfniivb_-d)"></path><defs><linearGradient id="_R_a5bsnpfniivb_-a" x1="241" y1="121" x2="1" y2="121" gradientUnits="userSpaceOnUse"><stop stopColor="var(--muted)"></stop><stop offset="1" stopColor="var(--muted)" stopOpacity="0"></stop></linearGradient><linearGradient id="_R_a5bsnpfniivb_-b" x1="241" y1="121" x2="1" y2="121" gradientUnits="userSpaceOnUse"><stop stopColor="#D4D4D4"></stop><stop offset="1" stopColor="#D4D4D4" stopOpacity="0"></stop></linearGradient><linearGradient id="_R_a5bsnpfniivb_-c" x1="321" y1="121" x2="561" y2="121" gradientUnits="userSpaceOnUse"><stop stopColor="var(--muted)"></stop><stop offset="1" stopColor="var(--muted)" stopOpacity="0"></stop></linearGradient><linearGradient id="_R_a5bsnpfniivb_-d" x1="321" y1="121" x2="561" y2="121" gradientUnits="userSpaceOnUse"><stop stopColor="#D4D4D4"></stop><stop offset="1" stopColor="#D4D4D4" stopOpacity="0"></stop></linearGradient></defs></svg></div>
                <div className="absolute inset-0 flex items-center justify-center gap-36">
                    <div className="size-24" style={{ opacity: 1, transform: "none" }}>
                        <Icons.logo className="size-full" />
                    </div>
                    <div className="size-24" style={{ opacity: 1, transform: "none" }}>
                        <img
                            src={competitorLogo}
                            alt={`${competitorName} logo`}
                            className="size-full rounded-md drop-shadow-xl"
                            draggable="false"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-md flex-col items-center px-2.5 pb-16 text-center sm:max-w-xl sm:px-0 md:pb-0">
                <div className="mb-5 flex items-center space-x-3 pb-4 pt-16 md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right size-5 text-muted-foreground"
                    >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </div>
                <div className="relative flex flex-col">
                    <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:mt-12">
                        QRdx vs {competitorName}
                    </h1>
                    <p className="relative z-10 mt-6 text-pretty text-muted-foreground sm:text-balance sm:text-lg xl:text-pretty">
                        Learn how QRdx compares to {competitorName} and why QRdx is the
                        best {competitorName} alternative for all your QR code needs.
                    </p>
                </div>
                <div className="relative z-10 mx-auto mt-10 flex max-w-fit flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Link href="/playground"><Button>Try the Playground</Button></Link>
                </div>
            </div>
        </div>
    );
}

