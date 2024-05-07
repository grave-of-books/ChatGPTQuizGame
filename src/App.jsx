import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useBoxGenerator } from "./gameLogic";
import { HistoryContext } from "./contextHelper";
import { LeftContainer, RightContainer, Canvas, CardContainer } from "./containers";

import "./App.css";

export default function App() {
  const { 

    messages, 
    answerColor,
    setAnswerColor, 
    condition,
    setCondition,
    streak,
    setStreak,
    score,
    setScore,
    askedQuestions,
    setAskedQuestions
    
} = useContext(HistoryContext);

  const navigate = useNavigate();
  const { canvasRef, clearBoxes } = useBoxGenerator();  
    //Player reads question from ChatGPT in "messages"
    //Player clicks an answer button
    //Response is sent to ChatGPT S
    //Response from ChatGPT is displayed
    //Player is scored 
    //streak counter is updated
    useEffect(() => {
      console.log("player was " + condition);
      console.log("players streak is " + streak);
      console.log("player color is " + answerColor);
    
      if (condition === "CORRECT") {
        const milestone = streak === 4 || streak === 9 || streak === 14;
    
        // Update streak and score outside of dependencies to avoid retrigger
        setStreak(currentStreak => currentStreak + 1);
        setScore(currentScore => currentScore + (milestone ? 10 : 5));
    
        if (milestone) {
          setAnswerColor("yellow"); // Consider whether this needs to trigger re-render
          clearBoxes("yellow");
        } else {
          clearBoxes(answerColor);
        }
      } else if (condition === "INCORRECT") {
        setStreak(0);
        setScore(currentScore => currentScore - 5);
        setAnswerColor(null); // Use null, not "null"
        setCondition(null);  // Use null here as well, ensure handlers can manage null
      }
    }, [condition]);

  useEffect(() => {
    console.log("Current score is: " + score);
    
    if (score >= 100) {
      console.log("congratulations!");

    } else {

      console.log("Not game over yet.");
    }
  }, [ score, navigate ]);

  return (
          <>
            <div className="game-container">
              <LeftContainer messages={messages} />c 
              <Canvas canvasRef={canvasRef} />
              <RightContainer streak={streak} score={score} setAnswerColor={setAnswerColor} askedQuestions={askedQuestions} setAskedQuestions={setAskedQuestions} />
            </div>
              <CardContainer answerColor={answerColor} condition={condition} setAnswerColor={setAnswerColor} />
          </>
  );
}