import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Hospital, Landmark, UtensilsCrossed, MapPin, Phone, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatbotPanel from "@/components/ChatbotPanel";

interface Place {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  timing?: string;
  amenities?: string[];
  type: string;
}

const LODGES: Place[] = [
  {
    id: "1",
    name: "Hotel Poonja International",
    address: "K.S. Rao Road, Mangalore",
    phone: "+91 824 442 7171",
    rating: 4.2,
    distance: "0.5 km from KSRTC",
    timing: "24/7",
    amenities: ["Free WiFi", "AC Rooms", "Restaurant", "Parking"],
    type: "lodge"
  },
  {
    id: "2",
    name: "The Ocean Pearl",
    address: "Navabharat Circle, Mangalore",
    phone: "+91 824 242 1000",
    rating: 4.5,
    distance: "1.2 km from KSRTC",
    timing: "24/7",
    amenities: ["Swimming Pool", "Spa", "Restaurant", "Bar"],
    type: "lodge"
  },
  {
    id: "3",
    name: "Hotel Srinivas",
    address: "Car Street, Udupi",
    phone: "+91 820 252 0857",
    rating: 4.0,
    distance: "0.3 km from Udupi Bus Stand",
    timing: "24/7",
    amenities: ["AC Rooms", "Restaurant", "Free Breakfast"],
    type: "lodge"
  },
  {
    id: "4",
    name: "Manipal Inn",
    address: "Tiger Circle, Manipal",
    phone: "+91 820 257 0888",
    rating: 4.3,
    distance: "0.2 km from Manipal",
    timing: "24/7",
    amenities: ["Free WiFi", "Restaurant", "Conference Hall"],
    type: "lodge"
  },
  {
    id: "5",
    name: "Paradise Isle Beach Resort",
    address: "Malpe Beach Road, Udupi",
    phone: "+91 820 253 5757",
    rating: 4.4,
    distance: "Near Malpe Beach",
    timing: "24/7",
    amenities: ["Beach View", "Restaurant", "Water Sports"],
    type: "lodge"
  }
];

const HOSPITALS: Place[] = [
  {
    id: "1",
    name: "KMC Hospital",
    address: "Ambedkar Circle, Mangalore",
    phone: "+91 824 242 1000",
    rating: 4.5,
    distance: "1.5 km from KSRTC",
    timing: "24/7 Emergency",
    amenities: ["Emergency", "ICU", "Pharmacy", "Ambulance"],
    type: "hospital"
  },
  {
    id: "2",
    name: "Manipal Hospital",
    address: "Madhav Nagar, Manipal",
    phone: "+91 820 257 1201",
    rating: 4.6,
    distance: "Near Manipal MIT",
    timing: "24/7 Emergency",
    amenities: ["Multi-Specialty", "ICU", "Pharmacy", "Blood Bank"],
    type: "hospital"
  },
  {
    id: "3",
    name: "AJ Hospital",
    address: "Kuntikana, Mangalore",
    phone: "+91 824 242 5555",
    rating: 4.4,
    distance: "2.0 km from KSRTC",
    timing: "24/7 Emergency",
    amenities: ["Emergency", "Surgery", "Lab", "Ambulance"],
    type: "hospital"
  },
  {
    id: "4",
    name: "Dr. TMA Pai Hospital",
    address: "Udupi",
    phone: "+91 820 252 0187",
    rating: 4.3,
    distance: "0.8 km from Udupi Bus Stand",
    timing: "24/7 Emergency",
    amenities: ["Emergency", "Cardiology", "Pharmacy"],
    type: "hospital"
  },
  {
    id: "5",
    name: "Father Muller Medical College",
    address: "Kankanady, Mangalore",
    phone: "+91 824 223 8000",
    rating: 4.5,
    distance: "3.0 km from KSRTC",
    timing: "24/7 Emergency",
    amenities: ["Teaching Hospital", "All Specialties", "Research"],
    type: "hospital"
  }
];

const BANKS: Place[] = [
  {
    id: "1",
    name: "State Bank of India - Hampankatta",
    address: "Hampankatta Circle, Mangalore",
    phone: "+91 824 242 0401",
    rating: 4.0,
    distance: "0.2 km from KSRTC",
    timing: "10:00 AM - 4:00 PM",
    amenities: ["ATM 24/7", "Deposit", "Withdrawal", "UPI"],
    type: "bank"
  },
  {
    id: "2",
    name: "HDFC Bank - Udupi",
    address: "Service Bus Stand, Udupi",
    phone: "+91 820 252 1234",
    rating: 4.1,
    distance: "0.1 km from Udupi Bus Stand",
    timing: "10:00 AM - 4:00 PM",
    amenities: ["ATM 24/7", "Locker", "Cards", "Net Banking"],
    type: "bank"
  },
  {
    id: "3",
    name: "Canara Bank - Manipal",
    address: "MIT Road, Manipal",
    phone: "+91 820 257 0234",
    rating: 4.2,
    distance: "Near Manipal MIT",
    timing: "10:00 AM - 5:00 PM",
    amenities: ["ATM 24/7", "Student Accounts", "Mobile Banking"],
    type: "bank"
  },
  {
    id: "4",
    name: "ICICI Bank - Pumpwell",
    address: "Pumpwell Circle, Mangalore",
    phone: "+91 824 244 5566",
    rating: 4.0,
    distance: "Near Pumpwell",
    timing: "10:00 AM - 5:00 PM",
    amenities: ["ATM 24/7", "Personal Loans", "Credit Cards"],
    type: "bank"
  },
  {
    id: "5",
    name: "Axis Bank - Kadri",
    address: "Kadri Temple Road, Mangalore",
    phone: "+91 824 242 8899",
    rating: 3.9,
    distance: "Near Kadri Temple",
    timing: "10:00 AM - 4:00 PM",
    amenities: ["ATM 24/7", "Forex", "Insurance"],
    type: "bank"
  }
];

const RESTAURANTS: Place[] = [
  {
    id: "1",
    name: "Giri Manja's",
    address: "Balmatta Road, Mangalore",
    phone: "+91 824 244 1234",
    rating: 4.5,
    distance: "0.8 km from KSRTC",
    timing: "11:00 AM - 11:00 PM",
    amenities: ["Seafood", "Mangalorean Cuisine", "AC", "Parking"],
    type: "restaurant"
  },
  {
    id: "2",
    name: "Mitra Samaj",
    address: "Car Street, Udupi",
    phone: "+91 820 252 0111",
    rating: 4.6,
    distance: "0.5 km from Udupi Bus Stand",
    timing: "7:00 AM - 9:30 PM",
    amenities: ["South Indian", "Vegetarian", "Budget-Friendly"],
    type: "restaurant"
  },
  {
    id: "3",
    name: "Dollops",
    address: "Manipal",
    phone: "+91 820 257 3333",
    rating: 4.4,
    distance: "Near Manipal MIT",
    timing: "11:00 AM - 11:00 PM",
    amenities: ["Continental", "Chinese", "Desserts", "Cafe"],
    type: "restaurant"
  },
  {
    id: "4",
    name: "Ideal Ice Cream",
    address: "Car Street, Mangalore",
    phone: "+91 824 244 0987",
    rating: 4.7,
    distance: "1.0 km from KSRTC",
    timing: "10:00 AM - 10:00 PM",
    amenities: ["Ice Cream", "Desserts", "Family-Friendly"],
    type: "restaurant"
  },
  {
    id: "5",
    name: "Woodlands Restaurant",
    address: "Udupi",
    phone: "+91 820 252 2345",
    rating: 4.3,
    distance: "0.3 km from Udupi Bus Stand",
    timing: "7:00 AM - 10:00 PM",
    amenities: ["South Indian", "North Indian", "Vegetarian", "AC"],
    type: "restaurant"
  },
  {
    id: "6",
    name: "The Coral",
    address: "Malpe Beach",
    phone: "+91 820 253 4567",
    rating: 4.5,
    distance: "Near Malpe Beach",
    timing: "11:00 AM - 11:00 PM",
    amenities: ["Seafood", "Beach View", "Bar", "Live Music"],
    type: "restaurant"
  }
];

const Places = () => {
  const [activeTab, setActiveTab] = useState("lodges");

  const renderPlaceCard = (place: Place) => {
    const getIcon = () => {
      switch (place.type) {
        case "lodge":
          return <Hotel className="h-5 w-5 text-primary" />;
        case "hospital":
          return <Hospital className="h-5 w-5 text-primary" />;
        case "bank":
          return <Landmark className="h-5 w-5 text-primary" />;
        case "restaurant":
          return <UtensilsCrossed className="h-5 w-5 text-primary" />;
        default:
          return <MapPin className="h-5 w-5 text-primary" />;
      }
    };

    return (
      <Card key={place.id} className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                {getIcon()}
              </div>
              <div>
                <CardTitle className="text-lg">{place.name}</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{place.rating}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary">{place.distance}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{place.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{place.phone}</span>
          </div>
          {place.timing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{place.timing}</span>
            </div>
          )}
          {place.amenities && place.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {place.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          )}
          <Button variant="hero" className="w-full mt-4">
            Get Directions
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navbar />
      <ChatbotPanel />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Find Nearby Places
          </h1>
          <p className="text-muted-foreground">
            Discover accommodations, hospitals, banks, and restaurants along your route
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="lodges" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Lodges</span>
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              <span className="hidden sm:inline">Hospitals</span>
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span className="hidden sm:inline">ATMs/Banks</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurants</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lodges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LODGES.map((place) => renderPlaceCard(place))}
            </div>
          </TabsContent>

          <TabsContent value="hospitals">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOSPITALS.map((place) => renderPlaceCard(place))}
            </div>
          </TabsContent>

          <TabsContent value="banks">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BANKS.map((place) => renderPlaceCard(place))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESTAURANTS.map((place) => renderPlaceCard(place))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Places;
