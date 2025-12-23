import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 text-white flex items-center justify-center">
        {/* Background overlay/image could go here */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-90 z-0"></div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            A.N. Survey Instrument
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Sales, Service, and Repair of Surveying Instruments Since 1992.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8" asChild>
              <Link href="/product-list">View Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 px-8" asChild>
              <Link href="/service">Service & Repair</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro / Value Prop */}
      <section className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-heading font-bold text-slate-800">Quality Equipment & Expert Service</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you work in construction, survey engineering, manufacturing, or road building,
            we provide quick efficient service and competitive pricing on new products.
            Located in Aurora, ON, serving the GTA and beyond.
          </p>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container px-4">
        <h3 className="text-2xl font-bold mb-8 border-b pb-2">Featured Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="Laser Levels"
            description="Topcon, Leica, Site Pro, and Geomax lasers for all construction needs."
            href="/product-list/laser-levels"
            image="/uploads/3/1/7/6/3176472/published/rugby-61004ee.jpg?1669998531"
          />
          <CategoryCard
            title="Total Stations"
            description="High-precision Leica Total Stations for surveying and engineering."
            href="/product-list/leica-total-stations"
            image="/uploads/3/1/7/6/3176472/leica-builder-series-pic-2360x714_orig.jpg"
          />
          <CategoryCard
            title="Automatic Levels"
            description="Reliable auto levels for site prep and elevation."
            href="/product-list/automatic-digital-levels"
            image="/uploads/3/1/7/6/3176472/editor/25-sk24x-hero-wshadow17e1.jpg?1643467086"
          />
          <CategoryCard
            title="Digital Theodolites"
            description="Precise angle measurement tools."
            href="/product-list/theodolite-transit"
            image="/uploads/3/1/7/6/3176472/published/dt8-05p-theodoliet7506.jpg?1763600412"
          />
          <CategoryCard
            title="Machine Control"
            description="Receivers and systems for excavators and machinery."
            href="/product-list/idig-systems"
            image="/uploads/3/1/7/6/3176472/published/rlh4aef.jpg?1678893258"
          />
          <CategoryCard
            title="ZipLevel"
            description="Precision Altimeter - Laserless Digital Level and Elevation Measurement."
            href="/product-list/zip-level"
            image="/uploads/3/1/7/6/3176472/6891172.gif"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Calibration or Repair?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer pick-up and delivery in the GTA. Get your equipment serviced by experts.
          </p>
          <Button size="lg" className="bg-slate-900 text-white" asChild>
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ title, description, href, image }: { title: string, description: string, href: string, image: string }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {/* Using a standard img tag for now as Next/Image requires configured domains or local files, 
            and these paths match what we copied to public/uploads. 
            Note: We might need to adjust paths if they have query strings in filenames. 
            I'll strip query strings in the src or standardise filenames later. 
            For now, trying direct mapping.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
          <Link href={href}>Learn More &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
