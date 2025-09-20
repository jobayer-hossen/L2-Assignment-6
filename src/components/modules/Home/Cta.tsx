import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto ">
          Join millions of riders who trust RideShare for their daily
          transportation needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3 cursor-pointer"
          >
            Download App
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 cursor-pointer border-primary-foreground bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
