# Bus Transit App - Mangalore-Udupi Region 🚌

A comprehensive full-stack bus transit system for the Mangalore-Udupi-Kundapura region with real-time route planning, fare calculation, place discovery, and AI-powered chatbot assistance.

## ✨ Features

- 🗺️ **Smart Route Planning** - Find optimal bus routes with transfer options between 35+ stops
- 💰 **Trip Cost Calculator** - Compare fares across different bus types (Ordinary, Express, Volvo AC, Sleeper)
- 🏨 **Place Discovery** - Find nearby lodges, hospitals, ATMs/banks, and restaurants
- 🤖 **AI Travel Assistant** - Gemini-powered chatbot for transit queries
- 🔐 **User Authentication** - Secure registration and login system
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🚍 **Comprehensive Data** - 35 bus stops, 25 buses, 25 routes with realistic timings

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository:**
```bash
git clone https://github.com/aksh56511/bus.git
cd bus
```

2. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

3. **Start the application:**

**Option 1: Run both backend and frontend together (Recommended)**
```bash
# From the root directory
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Start backend (from root directory)
npm run backend

# Terminal 2 - Start frontend (from root directory)
npm run frontend
```

4. **Access the application:**
- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:5000

## 📋 Available Routes

- `/` - Home page with search and quick actions
- `/login` - User login
- `/register` - User registration
- `/routes` - Find bus routes between locations
- `/trips` - Calculate trip costs and compare fares
- `/places` - Discover nearby lodges, hospitals, banks, and restaurants

## 🎯 Key Features Explained

### Route Finding
- Search from 35 bus stops across Mangalore-Udupi region
- Direct routes and 1-transfer options
- Real bus timings (first bus 03:16, last bus 22:30)
- Frequency information and amenities display

### Trip Planning
- Distance-based fare calculation
- Multiple bus type options (₹1.0 to ₹3.2 per km)
- Duration estimates
- Comparison tables with recommendations

### Places Discovery
- **Lodges:** 5 hotels from budget to luxury
- **Hospitals:** 5 medical facilities with 24/7 emergency
- **Banks/ATMs:** 5 banking locations with operating hours
- **Restaurants:** 6 dining options from local to fine dining

### AI Chatbot
- Powered by Google Gemini 1.5 Flash
- Answers queries about routes, schedules, and fares
- Context-aware with full transit system knowledge

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- SQLite database with Sequelize ORM
- JWT Authentication
- Google Gemini AI API
- JSON file storage for transit data

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS + shadcn/ui components
- React Router v6
- Lucide React icons

## 📊 Data Coverage

**Bus Stops (35):**
- Major hubs: KSRTC Mangalore, Udupi Bus Stand, Manipal MIT
- Beaches: Malpe Beach, Kaup Beach
- Educational: NITK Surathkal, Manipal University
- Medical: Manipal Hospital, KMC Hospital area
- Towns: Kundapura, Karkala, Moodbidri, Brahmavar

**Bus Operators:**
- KSRTC (13 buses)
- VRL Travels, RDS Travels, Spectra Connect
- FlixBus India, Orange Travels, SRS Travels
- Kallada Travels, Parveen Travels

**Bus Types:**
- Ordinary (₹1.0-1.2/km)
- Express (₹1.4-1.5/km)
- Volvo AC (₹2.5-2.6/km)
- AC Sleeper (₹2.8-2.9/km)
- Multi-Axle Premium (₹3.0-3.2/km)

## 🔑 API Configuration

The Gemini API key is already configured in the codebase for team use:
- **File:** `backend/utils/chatbotAPI.js`
- **Model:** gemini-1.5-flash
- **Note:** API key will be rotated after project completion

## 📁 Project Structure

```
bus/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database configuration
│   │   └── keys.env           # Environment variables
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── busController.js   # Bus management
│   │   ├── routeController.js # Route finding algorithm
│   │   ├── tripController.js  # Fare calculation
│   │   └── chatbotController.js # AI chatbot
│   ├── data/
│   │   ├── buses.json         # 25 buses
│   │   ├── routes.json        # 25 routes
│   │   ├── stops.json         # 35 stops
│   │   └── database.sqlite    # SQLite database
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Bus.js, Route.js, Stop.js, Trip.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── busRoutes.js
│   │   ├── tripRoutes.js
│   │   └── chatbotRoutes.js
│   ├── utils/
│   │   ├── chatbotAPI.js      # Gemini AI integration
│   │   ├── fareCalculator.js  # Fare logic
│   │   └── jsonStorage.js     # Data utilities
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ChatbotPanel.tsx
│   │   │   ├── FindCard.tsx
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Index.tsx      # Home page
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Routes.tsx     # Route finder
│   │   │   ├── Trips.tsx      # Fare calculator
│   │   │   └── Places.tsx     # Places discovery
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🧪 Testing the Application

### Test Route Finding:
1. Go to `/routes`
2. Select "From: KSRTC Bus Stand Mangalore"
3. Select "To: Udupi Bus Stand"
4. Click "Search Routes"
5. View direct routes and transfer options

### Test Fare Calculator:
1. Go to `/trips`
2. Select source and destination
3. Click "Calculate Fare"
4. Compare fares across bus types

### Test Chatbot:
1. Click the floating chat button (bottom-right)
2. Ask: "What buses go from Mangalore to Udupi?"
3. Or: "What is the cheapest way to travel to Manipal?"

## 🌐 API Endpoints

**Authentication:**
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

**Routes:**
- `GET /api/routes/find?from=X&to=Y` - Find bus routes
- `GET /api/buses` - List all buses

**Trips:**
- `GET /api/trips/calculate-fare?from=X&to=Y` - Calculate fare

**Chatbot:**
- `POST /api/chatbot/query` - Send chatbot query
  ```json
  { "prompt": "Your question here" }
  ```

**Health:**
- `GET /health` - Server health check
- `GET /api/db-check` - Database status

## 👥 Team Usage

This project is configured for internal team use with API keys included in the codebase. No additional environment setup is required - just clone and run!

## 📝 License

Internal team project - Not for public distribution

---

**Built with ❤️ for the Mangalore-Udupi transit system**
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── main.tsx
│   └── package.json
└── package.json
```

## License

MIT