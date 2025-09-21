import { useEffect, useRef } from "react";
import Answers from "./Answers";

function ChatBox({ qaList, question, setQuestion, askQuestion, loader }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [qaList, loader]);

  return (
    <div className="col-span-1 md:col-span-4 flex flex-col h-screen relative">
      <div className="flex-1 bg-zinc-900 p-5 md:p-10 overflow-y-auto scrollbar-hide">
        <h1 className="text-2xl md:text-3xl text-center mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-1">
          Hello User, Ask Me Anything
        </h1>

        <div className="text-zinc-300 space-y-5">
          {qaList.map((qa, qIndex) => (
            <div key={qIndex} className="space-y-4">
              {/* Question bubble */}
              <div className="flex justify-end">
                <div
                  className="bg-zinc-800 text-white px-4 py-2 max-w-full md:max-w-lg 
                    rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-none 
                    shadow-md"
                >
                  {qa.question}
                </div>
              </div>

              {/* Answer bubble */}
              <div className="flex justify-start">
                <div>
                  {qa.answers.map((item, index) => (
                    <Answers
                      key={index}
                      ans={item}
                      index={index}
                      totalResult={qa.answers.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {loader && (
            <div className="flex justify-start">
              <div className="px-4 py-2">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-purple-600"
                  viewBox="0 0 100 101"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 
                    50 100.591C22.3858 100.591 0 78.2051 
                    0 50.5908C0 22.9766 22.3858 0.59082 
                    50 0.59082C77.6142 0.59082 100 22.9766 
                    100 50.5908ZM9.08144 50.5908C9.08144 
                    73.1895 27.4013 91.5094 50 91.5094C72.5987 
                    91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 
                    27.9921 72.5987 9.67226 50 9.67226C27.4013 
                    9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 
                    35.9116 97.0079 33.5539C95.2932 28.8227 
                    92.871 24.3692 89.8167 20.348C85.8452 
                    15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
                    4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
                    0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
                    1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
                    9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
                    9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 
                    10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
                    17.9648 79.3347 21.5619 82.5849 25.841C84.9175 
                    28.9121 86.7997 32.2913 88.1811 35.8758C89.083 
                    38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          askQuestion();
        }}
        className="bg-zinc-900 w-full md:w-3/4 text-white m-auto 
        rounded-4xl border border-zinc-700 flex p-1 pr-5  h-16 
        transition-all duration-200 ease-in-out hover:border-blue-500 mb-5"
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="flex-1 h-full p-3 outline-none bg-transparent rounded-l-3xl"
          type="text"
          placeholder="Ask me anything"
        />
        <button
          type="submit"
          className="px-5 py-2 text-white font-medium cursor-pointer"
        >
          Ask
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
