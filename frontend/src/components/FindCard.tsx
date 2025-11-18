import { Bus, Clock, MapPin, ArrowRight, Hotel, Hospital, Landmark, UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FindCardProps {
  title: string;
  description: string;
  icon: "bus" | "route" | "time" | "hotel" | "hospital" | "bank" | "restaurant";
  onClick?: () => void;
}

const FindCard = ({ title, description, icon, onClick }: FindCardProps) => {
  const icons = {
    bus: <Bus className="h-8 w-8 text-primary" />,
    route: <MapPin className="h-8 w-8 text-primary" />,
    time: <Clock className="h-8 w-8 text-primary" />,
    hotel: <Hotel className="h-8 w-8 text-primary" />,
    hospital: <Hospital className="h-8 w-8 text-primary" />,
    bank: <Landmark className="h-8 w-8 text-primary" />,
    restaurant: <UtensilsCrossed className="h-8 w-8 text-primary" />,
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border bg-gradient-to-br from-card to-secondary/30">
      <CardContent className="p-6" onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="rounded-full bg-primary/10 p-3">
            {icons[icon]}
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="ghost" className="w-full" onClick={onClick}>
          Explore
        </Button>
      </CardContent>
    </Card>
  );
};

export default FindCard;
