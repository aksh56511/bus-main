const { GoogleGenerativeAI } = require("@google/generative-ai");
const Stop = require('../models/Stop');
const Bus = require('../models/Bus');
const Route = require('../models/Route');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.queryChatbot = async (prompt) => {
  try {
    // Get all bus data for context
    const stops = Stop.getAllStops();
    const buses = Bus.getAllBuses();
    const routes = Route.getAllRoutes();

    // Create context about the bus system
    const systemContext = `You are a helpful assistant for the Mangalore-Udupi Transit System. 
You help users find bus routes, timings, and fares.

Available Bus Stops:
${stops.map(s => `- ${s.name} (${s.location})`).join('\n')}

Available Routes:
${routes.map(r => {
  const routeStops = r.stops.map(s => {
    const stop = stops.find(st => st.id === s.stopId);
    return stop ? stop.name : 'Unknown';
  }).join(' → ');
  return `- ${r.name}: ${routeStops} (${r.distance}km, ${r.frequency})`;
}).join('\n')}

Bus Types and Fares:
${buses.map(b => `- ${b.type} (${b.number}): ₹${b.farePerKm}/km - ${b.amenities.join(', ')}`).join('\n')}

Answer questions about:
- Finding routes between locations
- Bus timings and frequencies
- Fare calculations
- Bus amenities
- Transfer points

Be concise, helpful, and friendly. If you don't have exact information, provide the closest match.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm ready to help users with the Mangalore-Udupi Transit System. I'll provide accurate information about routes, timings, and fares based on the data you've provided." }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to rule-based responses
    return getFallbackResponse(prompt);
  }
};

// Fallback responses if API fails
function getFallbackResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('mangalore') && lowerPrompt.includes('udupi')) {
    return "There are several buses from Mangalore to Udupi:\n\n" +
           "1. Express Bus (MNG-102): Every 30 minutes, ₹87 (58km)\n" +
           "2. Volvo AC (MNG-V01): Every hour, ₹145\n" +
           "3. Via Manipal: Every 20 minutes\n\n" +
           "Journey time: 1.5-2 hours";
  }
  
  if (lowerPrompt.includes('manipal')) {
    return "For Manipal:\n" +
           "- Direct buses every 20 minutes from Mangalore KSRTC\n" +
           "- Also buses from Udupi every 20 minutes\n" +
           "- Fare: ₹75-93 from Mangalore, ₹15-18 from Udupi";
  }
  
  if (lowerPrompt.includes('fare') || lowerPrompt.includes('cost') || lowerPrompt.includes('price')) {
    return "Bus fares vary by type:\n" +
           "- Ordinary: ₹1.2 per km\n" +
           "- Express: ₹1.5 per km\n" +
           "- Volvo AC: ₹2.5 per km\n\n" +
           "Example: Mangalore to Udupi (58km)\n" +
           "Ordinary: ₹70, Express: ₹87, Volvo: ₹145";
  }
  
  if (lowerPrompt.includes('timing') || lowerPrompt.includes('schedule')) {
    return "Bus timings:\n" +
           "- Mangalore-Udupi: 06:00 AM to 10:00 PM (every 30 min)\n" +
           "- Mangalore-Manipal: 05:30 AM to 11:00 PM (every 20 min)\n" +
           "- City buses: 06:00 AM to 10:00 PM (every 15 min)";
  }
  
  return "I can help you with:\n" +
         "- Finding bus routes between locations\n" +
         "- Bus timings and schedules\n" +
         "- Fare information\n" +
         "- Bus types and amenities\n\n" +
         "Try asking: 'How to go from Mangalore to Udupi?' or 'What is the fare to Manipal?'";
}
