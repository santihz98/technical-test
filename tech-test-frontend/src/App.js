import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import InteractionsList from "./components/InteractionsList";
import axios from "axios";

function App() {
  const [interactions, setInteractions] = useState([]);

  const handleAskQuestion = async ({ question, context }) => {
    try {
      const response = await axios.post(
        "https://q9vz1ywkg8.execute-api.us-east-1.amazonaws.com/tech-test-sanagude/questions",
        {
          question,
          context,
        }
      );

      const newInteraction = {
        question,
        context,
        answer: response.data.answer,
        score: response.data.score,
        start: response.data.start,
        end: response.data.end,
      };

      setInteractions([...interactions, newInteraction]);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Question Answering System
        </h1>
        <QuestionForm onAskQuestion={handleAskQuestion} />
        <InteractionsList interactions={interactions} />
      </div>
    </div>
  );
}

export default App;
