import { useState } from "react";
import axios from "axios";
import './App.css';

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
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC6QaRjb52-nl9AF5idJKCjNJs7LsV4YMc",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

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
      setError("Error generating answer. Please try again later.");
    } finally {
      setLoading(false);
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

      {error && (
        <p className="text-red-500 mt-4 text-sm">{error}</p>
      )}

      {answer && (
        <div className="mt-6 max-w-4xl bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
          <p className="p-4 text-2xl text-justify text-gray-700">{answer}</p>
        </div>
      )}
    </>
  );
}

export default App;
