import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, IndianRupee, Clock, Bus, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ChatbotPanel from "@/components/ChatbotPanel";

interface FareOption {
  type: string;
  operator: string;
  farePerKm: number;
  totalFare: number;
  amenities: string[];
}

interface Stop {
  id: string;
  name: string;
  location: string;
  coordinates?: { lat: number; lng: number };
}

interface FareResult {
  from: Stop;
  to: Stop;
  distance: number;
  estimatedDuration: string;
  fares: FareOption[];
  recommendation: FareOption;
}

const STOPS = [
  "KSRTC Bus Stand Mangalore", "Hampankatta", "Surathkal NITK", "Baikampady", "Mulki",
  "Katapadi Junction", "Manipal MIT Campus", "Udupi Bus Stand", "Kadri Temple", "Falnir Road",
  "Karavali Bypass", "Kundapura Bus Stand", "Karkala", "BC Road", "Moodbidri",
  "Kalyanpura", "Jyothi Circle", "Adyar", "Mangalore Central Railway Station", "Pumpwell Circle",
  "Valencia", "Kankanady Market", "Mangalore Junction", "Bunts Hostel Circle", "Malpe Beach",
  "Manipal Hospital", "Parkala Junction", "Brahmavar", "Shirva", "Hiriyadka",
  "Padubidri", "Kaup Beach", "Santhekatte", "Ambalpady", "Nityananda Ashram"
];

const Trips = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fareData, setFareData] = useState<FareResult | null>(null);
  const { toast } = useToast();

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      toast({
        title: "Missing information",
        description: "Please enter both source and destination",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/trips/calculate-fare?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );

      const data = await response.json();

      if (response.ok) {
        setFareData(data);
        toast({
          title: "Fare calculated!",
          description: `Estimated fare from ${data.from.name} to ${data.to.name}`,
        });
      } else {
        toast({
          title: "Calculation failed",
          description: data.error || "Unable to calculate fare",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBusIcon = (type: string) => {
    if (type.toLowerCase().includes("volvo") || type.toLowerCase().includes("ac")) {
      return <Zap className="h-5 w-5" />;
    }
    return <Bus className="h-5 w-5" />;
  };

  const getBusColor = (type: string) => {
    if (type.toLowerCase().includes("volvo") || type.toLowerCase().includes("ac")) {
      return "bg-purple-500";
    }
    if (type.toLowerCase().includes("express")) {
      return "bg-blue-500";
    }
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navbar />
      <ChatbotPanel />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <IndianRupee className="h-8 w-8 text-primary" />
            Trip Cost Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate fare estimates for your journey across different bus types
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Calculate Trip Cost</CardTitle>
            <CardDescription>Enter your journey details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select value={from} onValueChange={setFrom} required>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Select source location" />
                    </SelectTrigger>
                    <SelectContent>
                      {STOPS.map((stop) => (
                        <SelectItem key={stop} value={stop}>
                          {stop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select value={to} onValueChange={setTo} required>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {STOPS.map((stop) => (
                        <SelectItem key={stop} value={stop}>
                          {stop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? "Calculating..." : "Calculate Fare"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {fareData && (
          <div className="space-y-6">
            {/* Journey Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">From</p>
                    <p className="font-semibold">{fareData.from.name}</p>
                    <p className="text-xs text-muted-foreground">{fareData.from.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">To</p>
                    <p className="font-semibold">{fareData.to.name}</p>
                    <p className="text-xs text-muted-foreground">{fareData.to.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Distance</p>
                    <p className="font-semibold text-2xl">{fareData.distance} km</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {fareData.estimatedDuration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fare Options */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Fare Options</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {fareData.fares.map((fare, index) => {
                  const isRecommended = fare.type === fareData.recommendation?.type;
                  
                  return (
                    <Card
                      key={index}
                      className={`relative overflow-hidden transition-all hover:shadow-lg ${
                        isRecommended ? "border-2 border-primary" : ""
                      }`}
                    >
                      {isRecommended && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Recommended
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getBusColor(fare.type)} variant="default">
                            {getBusIcon(fare.type)}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{fare.operator}</p>
                        </div>
                        <CardTitle className="mt-2">{fare.type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-primary flex items-center">
                            <IndianRupee className="h-6 w-6" />
                            {fare.totalFare}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            ₹{fare.farePerKm}/km
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Amenities:</p>
                          <div className="flex flex-wrap gap-1">
                            {fare.amenities.map((amenity, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {isRecommended && (
                          <div className="mt-4 bg-primary/10 p-2 rounded text-xs text-center font-medium">
                            Best Value for Money
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Bus Type</th>
                        <th className="text-left p-2">Operator</th>
                        <th className="text-right p-2">Rate/km</th>
                        <th className="text-right p-2">Total Fare</th>
                        <th className="text-left p-2">Key Amenity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fareData.fares.map((fare, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-2 font-medium">{fare.type}</td>
                          <td className="p-2 text-sm text-muted-foreground">{fare.operator}</td>
                          <td className="p-2 text-right">₹{fare.farePerKm}</td>
                          <td className="p-2 text-right font-bold text-primary">
                            ₹{fare.totalFare}
                          </td>
                          <td className="p-2 text-sm">{fare.amenities[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!fareData && !isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <IndianRupee className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Calculate Your Trip Cost</h3>
              <p className="text-muted-foreground">
                Enter your source and destination to see fare estimates
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Trips;
