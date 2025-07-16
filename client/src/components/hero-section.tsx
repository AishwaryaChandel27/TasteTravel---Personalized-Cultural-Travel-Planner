import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-travel-blue to-travel-dark text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Perfect
            <span className="text-cultural-gold block">Cultural Journey</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-3xl mx-auto">
            Let AI understand your cultural preferences and create personalized travel experiences 
            that connect you with the world's most meaningful destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-cultural-gold text-slate-900 hover:bg-yellow-500 font-semibold"
              onClick={() => document.getElementById('preferences')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Planning
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-travel-blue font-semibold"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
