import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useBoxGenerator, drawGrid } from "./components";
import { birdWhisperer } from "./rupaulServices";
import { scoreKeeper } from "./questionServices";
import { LeftContainer, RightContainer, Canvas, CardContainer } from "./containers";

import "./App.css";

export default function App() {

  const navigate = useNavigate();
  const { canvasRef, clearBoxes } = useBoxGenerator();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [score, setScore] = useState(0); 
  const [streak, setStreak] = useState(0); 
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
    const { tag } = birdWhisperer(res); 

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

  BirdMaster(question);
}, [streak, setAnswerColor, BirdMaster]);

  const ButtonClick = useCallback((answer) => {
    const modifiedPrompt = `The player selected ${answer}. Respond accordingly. Include 'CORRECT' in your response if the player is correct, otherwise 'INCORRECT'`;
    BirdMaster(modifiedPrompt); 
}, [BirdMaster]); 


useEffect(() => {
  if (condition === "CORRECT") {
    clearBoxes(answerColor, condition);
    handleScoreUpdate("type1");
    streakCount();
    console.log("new streak is "+streak);

    if (answerColor === "yellow") {
      handleScoreUpdate("type3"); 
      console.log("Awarding type3 points for 5 correct answers in a row");
    }

    setAnswerColor("null");
    setCondition("null");

  } else if (condition === "INCORRECT") {
    handleScoreUpdate("type2"); 
    setStreak(0); 
    setAnswerColor("null");
    setCondition("null");

  } else {
    console.log("Nothing interesting happens.");
  }
}, [answerColor, streak, condition, clearBoxes]);

const endGame = useCallback(() => {
  console.log("Now returning score..."+score);
  if (score >= 25) { 
    navigate('/game-over', { state: { hasWon: true } });
  }
}, [score, navigate]); 

  useEffect(() => {
    console.log("Current score is: "+score);
    endGame();
  }, [endGame, score]);

  return (
          <>
            <div className="game-container">
              <LeftContainer messages={messages} />
              <Canvas canvasRef={canvasRef} />
              <RightContainer streak={streak} score={score} CardClick={CardClick} />
            </div>
              <CardContainer ButtonClick={ButtonClick} />
          </>
  );
}