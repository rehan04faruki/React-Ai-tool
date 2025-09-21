import { useState, useEffect } from "react";
import "./App.css";
import { URL } from "./const";
import RecentSearches from "./Components/RecentSearches";
import ChatBox from "./Components/ChatBox";

function App() {
  const [question, setQuestion] = useState("");
  const [qaList, setQaList] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [loader, setLoader] = useState(false);

  const askQuestion = async (customQuestion) => {
    const currentQ = customQuestion || question;
    if (!currentQ.trim()) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = [currentQ, ...history];
    localStorage.setItem("history", JSON.stringify(history));
    setRecentHistory(history);

    const payload = { contents: [{ parts: [{ text: currentQ }] }] };

    try {
      setLoader(true);
      let response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      response = await response.json();

      let dataString = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      let arr = dataString
        ? dataString.split("* ").map((item) => item.trim()).filter(Boolean)
        : ["No response from AI"];

      setQaList((prev) => [...prev, { question: currentQ, answers: arr }]);
      setQuestion("");
    } catch (err) {
      console.error(err);
      setQaList((prev) => [
        ...prev,
        { question: currentQ, answers: ["Error fetching response"] },
      ]);
      setQuestion("");
    } finally {
      setLoader(false);
    }
  };

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <RecentSearches
        recentHistory={recentHistory}
        onHistoryClick={askQuestion}
        onClearHistory={clearHistory}
      />

      <ChatBox
        qaList={qaList}
        question={question}
        setQuestion={setQuestion}
        askQuestion={askQuestion}
        loader={loader}
      />
    </div>
  );
}

export default App;
