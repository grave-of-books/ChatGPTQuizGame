import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useBoxGenerator, drawGrid } from "./components";
import { birdWhisperer } from "./rupaulServices";
import { scoreKeeper } from "./questionServices";

import "./App.css";
import card1 from './assets/card_1.png';
import card2 from './assets/card_2.png';
import card3 from './assets/card_3.png';

export default function App() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); // Initializes score to 0
  const [streak, setStreak] = useState(0); //Initialize initial streak to 0
  const { canvasRef, clearBoxes } = useBoxGenerator();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [messages, setMessages] = useState([]);
  const [answerColor, setAnswerColor] = useState("");
  const [condition, setCondition] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(ctx, 50);
  }, [canvasRef]);

  const handleScoreUpdate = (type) => {
    const points = scoreKeeper(type);
    setScore(score => score + points);
};

  const streakCount = () => {
    setStreak(streak => streak + 1);
  }

  const handleAPIResponse = useCallback((data) => {
    const res = data.choices[0].message.content;

    setMessages((msgs) => [...msgs, { role: "assistant", content: res }]);
    const { tag } = birdWhisperer(res); // Assume birdWhisperer is correctly extracting "CORRECT" or "INCORRECT"

    setCondition(tag);
    console.log("response set to "+tag)

}, [setMessages]);


  const BirdMaster = useCallback(async (prompt) => {
    const systemMessage = { role: "system", content: "Pretend you're a smart, sassy, & fabulous host of a British late-night talk show." }; // Example static system message


    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [systemMessage, ...messages, { role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      handleAPIResponse(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [API_KEY, messages, handleAPIResponse]);


useEffect(() => {
    setCondition(condition);
    console.log("player set to "+condition);
}, [condition]); 

const CardClick = useCallback((color, question) => {
  // Set the answer color to yellow if the streak is exactly 5, otherwise use the provided color
  switch(streak) {

    case 4:
      setAnswerColor("yellow");
      console.log("Answer color set to "+color);
      break;
    case 9:
      setAnswerColor("yellow");
      console.log("Answer color set to "+color);
      break;
    case 14:
      setAnswerColor("yellow");
      console.log("Answer color set to "+color);
      break;
    default:
      setAnswerColor(color);
      console.log("Answer color set to "+color);
    break;
  }

  // Call BirdMaster with the question, assuming it handles some logic based on the question
  BirdMaster(question);
}, [streak, setAnswerColor, BirdMaster]);

  const ButtonClick = useCallback((answer) => {
    const modifiedPrompt = `The player selected ${answer}. Respond accordingly. Include 'CORRECT' in your response if the player is correct, otherwise 'INCORRECT'`;
    BirdMaster(modifiedPrompt); // Correctly close this function call
}, [BirdMaster]); // Dependencies are correctly listed


useEffect(() => {
  if (condition === "CORRECT") {
    clearBoxes(answerColor, condition);
    handleScoreUpdate("type1");
    streakCount();
    console.log("new streak is "+streak);

    if (answerColor === "yellow") {
      handleScoreUpdate("type3"); // Award type3 points when streak of 5 is achieved with yellow boxes
      console.log("Awarding type3 points for 5 correct answers in a row");
    }

    setAnswerColor("null");
    setCondition("null");

  } else if (condition === "INCORRECT") {
    handleScoreUpdate("type2"); // Assuming 'type2' handles score updates for incorrect answers.
    setStreak(0); // Resets the streak count on an incorrect answer.
    setAnswerColor("null");
    setCondition("null");

  } else {
    console.log("Nothing interesting happens.");
  }
}, [answerColor, streak, condition, clearBoxes]);

const endGame = useCallback(() => {
  console.log("Now returning score..."+score);
  if (score >= 25) { //set to 100 eventually
    navigate('/game-over', { state: { hasWon: true } });  // If the player wins
  }
}, [score, navigate]); 

  // Call endGame whenever the score changes and might be 100
  useEffect(() => {
    console.log("Current score is: "+score);
    endGame();
  }, [endGame, score]);

  return (
          <>
            <div className="game-container">
              <div className="container-left">
                <div className="host-portrait">
                  <div className="portrait-content">Host Portrait Text Here</div>
                </div>
                <div className="host-dialogue-box">
                  <div className="host-dialogue">
                  {
                     messages
                    .filter(el => el.role === 'assistant')
                    .slice(-1)
                    .map((el, i) => (
                    <div key={i}>{el.content}</div>
                    ))
                  }
                  </div>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                id="gameCanvas"
                width="400"
                height="400"
                style={{ border: "2px solid #d3d3d3", backgroundColor: "black" }}>
                Your browser does not support the HTML canvas tag.
              </canvas>
              <div className="container-right">
                <div className="tile-preview">
                  <div className="streak-counter">
                  Streak: {streak}  {/* Display the current streak dynamically */} 
                  </div>
                  </div>
                <div className="score-element">
                  <div className= "score-counter">
                  Current Score: {score}  {/* Display the current score dynamically */} 
                  </div>
                  <img src={card1} className="card" alt="Clear Red Boxes" onClick={() => CardClick('red', 'Ask me a multiple choice question about capital cities. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
                  <img src={card2} className="card" alt="Clear Green Boxes" onClick={() => CardClick('green', 'Ask me a multiple choice question about music. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
                  <img src={card3} className="card" alt="Clear Blue Boxes" onClick={() => CardClick('blue', 'Ask me a multiple choice question about histoy. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
                  </div>
              </div>
            </div>
            <div className="card-container">
               <button className="answer-A" onClick={() => ButtonClick('Option: A')} style={{ cursor: 'pointer'}}>A</button>
               <button className="answer-B" onClick={() => ButtonClick('Option: B')} style={{ cursor: 'pointer'}}>B</button>
               <button className="answer-C" onClick={() => ButtonClick('Option: C')} style={{ cursor: 'pointer'}}>C</button>
               <button className="answer-D" onClick={() => ButtonClick('Option: D')} style={{ cursor: 'pointer'}}>D</button>
            </div>
          </>
  );
}