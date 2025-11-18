import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import MapPlaceholder from "@/components/MapPlaceholder";
import ChatbotPanel from "@/components/ChatbotPanel";
import FindCard from "@/components/FindCard";
import { Bus, Route, Clock, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement search functionality with API
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Your Journey,{" "}
              <span className="bg-gradient-to-r from-primary to-transit-blue bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the fastest routes, track buses in real-time, and plan your trips with confidence
            </p>
            <div className="max-w-2xl mx-auto pt-6">
              <SearchBox onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          What are you looking for?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FindCard
            title="Find a Route"
            description="Discover the best routes to your destination"
            icon="route"
            onClick={() => navigate("/routes")}
          />
          <FindCard
            title="Bus Schedules"
            description="View real-time schedules and arrivals"
            icon="bus"
            onClick={() => navigate("/routes")}
          />
          <FindCard
            title="Plan Your Trip"
            description="Get step-by-step directions for your journey"
            icon="time"
            onClick={() => navigate("/trips")}
          />
        </div>
      </section>

      {/* FIND Section - Lodges, Hospitals, ATMs, Restaurants */}
      <section className="container mx-auto px-4 py-12 md:py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          FIND
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Discover nearby places along your route
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <FindCard
            title="Lodge"
            description="Find accommodations near you"
            icon="hotel"
            onClick={() => navigate("/places")}
          />
          <FindCard
            title="Hospitals"
            description="Locate nearby medical facilities"
            icon="hospital"
            onClick={() => navigate("/places")}
          />
          <FindCard
            title="ATM / Banks"
            description="Find ATMs and banking services"
            icon="bank"
            onClick={() => navigate("/places")}
          />
          <FindCard
            title="Restaurants"
            description="Discover dining options"
            icon="restaurant"
            onClick={() => navigate("/places")}
          />
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="space-y-4 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Live Route Tracker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track buses in real-time and see all available routes on the map
          </p>
        </div>
        <MapPlaceholder />
      </section>

      {/* Features Grid */}
      <section className="border-t border-border bg-secondary/20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Real-Time Tracking</h3>
              <p className="text-sm text-muted-foreground">Live bus locations</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Smart Routes</h3>
              <p className="text-sm text-muted-foreground">Optimized paths</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Accurate Times</h3>
              <p className="text-sm text-muted-foreground">Reliable schedules</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Trip Planning</h3>
              <p className="text-sm text-muted-foreground">Easy navigation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <ChatbotPanel />
    </div>
  );
};

export default Index;
