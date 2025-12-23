import React from "react";

export interface PageContent {
    title: string;
    description?: string;
    content: React.ReactNode;
}

export const contentMap: Record<string, PageContent> = {
    "/product-list/laser-levels/topcon-laser-levels": {
        title: "Topcon Laser Levels",
        description: "High-accuracy, self-leveling construction lasers.",
        content: (
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 bg-white p-4 items-center flex justify-center border rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/uploads/3/1/7/6/3176472/editor/rl-h5a_1a50a.png?1520278962" alt="Topcon RL-H5A" className="max-w-full h-auto" />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <h2 className="text-2xl font-bold font-heading">Topcon RL-H5A Horizontal Laser Level</h2>
                        <p className="font-semibold text-red-600">Replaces the RL-H4C - Gold Standard in alkaline or rechargeable models. 5 Year Warranty!</p>
                        <p className="text-muted-foreground">With great distance and high-accuracy — The RL-H5A is a next generation self-leveling construction laser.</p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Long-range operation (800 m)</li>
                            <li>Smart long-range receiver</li>
                            <li>Simple, intuitive manual slope capability</li>
                            <li>±10 Arc second horizontal accuracy</li>
                            <li>Extra-long battery life (100 hours)</li>
                            <li>Tough IP66 weatherproof rating</li>
                        </ul>
                        <a href="/uploads/3/1/7/6/3176472/rlh5a.pdf" target="_blank" className="text-blue-600 hover:underline font-semibold block mt-2">See Brochure</a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start border-t pt-8">
                    <div className="w-full md:w-1/3 bg-white p-4 items-center flex justify-center border rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/uploads/3/1/7/6/3176472/published/rl-hv-seriesfd8a.webp?1665778175" alt="Topcon RL-SV1S" className="max-w-full h-auto" />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <h2 className="text-2xl font-bold font-heading">Topcon RL-SV1S Single Slope Grade Laser</h2>
                        <p className="text-muted-foreground">Designed for single slope applications. This cost-effective, easy-to-use laser has a solid set of features.</p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Long-range operation - 800m (diameter)</li>
                            <li>Single slope laser</li>
                            <li>Tough IP66 construction rating</li>
                            <li>Extra-long battery life (up to 120 hours)</li>
                            <li>Bluetooth display for smartphone</li>
                        </ul>
                        <a href="/uploads/3/1/7/6/3176472/rl-hv1s_new_with_bluetooth.pdf" target="_blank" className="text-blue-600 hover:underline font-semibold block mt-2">See Brochure</a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start border-t pt-8">
                    <div className="w-full md:w-1/3 bg-white p-4 items-center flex justify-center border rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/uploads/3/1/7/6/3176472/published/rl-hv-seriesc21c.webp?1665778405" alt="Topcon RL-SV2S" className="max-w-full h-auto" />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <h2 className="text-2xl font-bold font-heading">Topcon RL-SV2S Dual Slope Laser</h2>
                        <h3 className="text-lg font-semibold">We recommend the Topcon RL-SV2S!</h3>
                        <p className="text-muted-foreground">
                            The RL-SV2S is a dual slope, long range, self-leveling instrument built to outperform all of its competitors.
                            Great for flat work, single or dual slope applications. Slopes up to ±15 degrees.
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Long Range Operation (800m)</li>
                            <li>Horizontal, Multi-Slope & Vertical Applications</li>
                            <li>Extra Long Battery Life (120 hours)</li>
                            <li>Tough IP66 Construction Rating</li>
                            <li>Remote Control Bluetooth to smartphone or tablet</li>
                        </ul>
                        <a href="/uploads/3/1/7/6/3176472/rl-hv2s-brochure_new_with_bluetooth.pdf" target="_blank" className="text-blue-600 hover:underline font-semibold block mt-2">See Product Brochure</a>
                    </div>
                </div>
            </div>
        ),
    },
    "/product-list/laser-levels": {
        title: "Laser Levels",
        description: "Wide selection of laser levels from top manufacturers.",
        content: (
            <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                    Select a category below to view specific models from Topcon, Leica, Site Pro, and more.
                </p>
                {/* Sub-items are automatically listed by the page component */}
            </div>
        ),
    },
};
