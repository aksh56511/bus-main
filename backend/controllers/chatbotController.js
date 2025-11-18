const chatbotAPI = require('../utils/chatbotAPI');

// @desc    Query the chatbot
// @route   POST /api/chatbot/query
// @access  Public
exports.query = async (req, res) => {
  try {
    const prompt = req.body.prompt || req.body.message || '';
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const response = await chatbotAPI.queryChatbot(prompt);
    res.json({ prompt, response });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      message: error.message 
    });
  }
};