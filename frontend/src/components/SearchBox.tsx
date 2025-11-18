import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBox = ({ onSearch, placeholder = "Search routes, stops, or destinations..." }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base shadow-sm border-border"
          />
        </div>
        <Button type="submit" size="lg" variant="hero" className="h-12 px-6">
          <Search className="h-5 w-5" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBox;
