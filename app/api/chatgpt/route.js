import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const getGeminiResponse = async (prompt) => {
  try {
    // Generate response for the same prompt twice
    const result1 = await model.generateContent(prompt);
    const result2 = await model.generateContent(prompt);

    return {
      response1: result1.response.text(),
      response2: result2.response.text(),
    };
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Error generating content');
  }
};

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      age,
      curriculum,
      topic,
      subject,
      fourCs,
      duration,
      difficulty,
      energy,
      additional,
    } = data;

    // Construct the prompt string
    const prompt = `Make a lesson plan for students of age: ${age}, curriculum: ${curriculum}, subject: ${subject}, topic: ${topic} and include the FourC's: ${fourCs}. The class duration is ${duration} in minutes. The difficulty should be ${difficulty}, and give Energy option ${energy}. Here is any additional information, ${additional}`;

    // Get the Gemini response using the same prompt twice
    const geminiResponse = await getGeminiResponse(prompt);

    return NextResponse.json({ response1: geminiResponse.response1, response2: geminiResponse.response2 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";

// // Function to send request to ChatGPT API
// const getChatGptResponse = async (prompt) => {
//   const apiKey = process.env.OPENAI_API_KEY; // Ensure your API key is stored in environment variables
//   console.log(apiKey);
//   const response = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo", // or another model you prefer
//       prompt,
//       max_tokens: 150,
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error(`Error: ${response.statusText}`, errorText);
//     throw new Error(`Error: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.choices[0].text.trim();
// };

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const {
//       age,
//       curriculum,
//       topic,
//       fourCs,
//       duration,
//       difficulty,
//       energy,
//       additional,
//     } = data;

//     // Construct the string
//     const prompt = `Make a lesson plan for students of age: ${age}, curriculum: ${curriculum}, topic: ${topic} and include the FourC's: ${fourCs}. The class duration is ${duration} in minutes. The difficulty should be ${difficulty}, and give Energy option ${energy}. Here is any additional information, ${additional}`;

//     // Get the ChatGPT response
//     const chatGptResponse = await getChatGptResponse(prompt);

//     return NextResponse.json({ response: chatGptResponse });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
