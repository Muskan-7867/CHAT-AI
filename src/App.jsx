import { useState } from "react";
import axios from "axios";
import "./App.css";
import React from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    setAnswer("");
    setError("");
    try {
      // Use apiKey in your API request
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          import.meta.env.REACT_APP_GEMINI_API_KEY
        }`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0]
      ) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error generating answer:", error);
      // Handle specific error cases, e.g., network error, server error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
      setAnswer("Error generating answer. Please try again later.");
    }
  }

  return (
    <>
      <h1 className="text-black font-bold">CHAT AI</h1>
      <input
        className="p-4 text-lg border-2 mt-3 border-gray-300 rounded-md w-96 focus:outline-none focus:border-blue-500"
        placeholder="Ask me anything?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        className={`mt-4 p-4 text-lg font-semibold border-2 border-blue-500 rounded-md transition duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        onClick={generateAnswer}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Answer"}
      </button>

      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

      {answer && (
        <div className="mt-6 max-w-4xl bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
          <p className="p-4 text-2xl text-justify text-gray-700">{answer}</p>
        </div>
      )}
    </>
  );
}

export default App;
