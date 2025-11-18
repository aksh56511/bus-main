import { MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

const MapPlaceholder = () => {
  return (
    <Card className="relative overflow-hidden h-[400px] bg-gradient-to-br from-secondary to-muted border-border shadow-md">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Map visualization will display routes and stops here
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-card px-3 py-2 rounded-lg shadow-sm border border-border">
        <Navigation className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Live Routes</span>
      </div>
    </Card>
  );
};

export default MapPlaceholder;
