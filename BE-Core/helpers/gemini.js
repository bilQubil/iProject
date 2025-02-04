const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
// console.log(process.env.GEMINI_API_KEY)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function run(prompt){
    try {        
        const result = await model.generateContent(prompt);
        return result.response.text()
    } catch (error) {
        console.log(error)
    }
   
  }
  module.exports = run;