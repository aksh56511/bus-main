import { Bus, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, getCurrentUser, logout, type User as UserType } from "@/utils/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status on component mount and when location changes
    const checkAuth = () => {
      setAuthState(isAuthenticated());
      setCurrentUser(getCurrentUser());
    };

    checkAuth();
  }, [location]); // Re-run when location changes

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Bus className="h-6 w-6 text-primary" />
            <span>Transit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/routes">
              <Button variant="ghost">Routes</Button>
            </Link>
            <Link to="/trips">
              <Button variant="ghost">Trips</Button>
            </Link>
            {authState ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Welcome, {currentUser?.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    logout();
                    // Force re-render by updating local state
                    setAuthState(false);
                    setCurrentUser(null);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>
            <Link to="/routes" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Routes
              </Button>
            </Link>
            <Link to="/trips" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Trips
              </Button>
            </Link>
            {authState ? (
              <div className="space-y-2">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Welcome, {currentUser?.name}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    setAuthState(false);
                    setCurrentUser(null);
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="hero" className="w-full justify-start">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
