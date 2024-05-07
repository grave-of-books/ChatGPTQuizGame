
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import card1 from './assets/card_1.png';
import card2 from './assets/card_2.png';
import card3 from './assets/card_3.png';
import portrait from './assets/portrait.png'
import { getQuestionByColor } from './rupaulServices';
import { useBirdMaster } from './questionServices';

export function LeftContainer({messages}) {

    //display the latest message from chatgpt

    return (
        <div className="container-left">
            <div className="host-portrait">
                <div className="portrait-content">
                <img src={portrait} className="host" />
                </div>
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
    )
}

LeftContainer.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        role: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    })).isRequired,
};

export function RightContainer({streak, score, setAnswerColor, askedQuestions, setAskedQuestions }) {
    const { BirdMaster } = useBirdMaster();

    //Always display the current score
    //always display the current streak

    
    //when player clicks a card 
function CardClick(color) {
    console.log("card was clicked");

    //log the color of what card
    setAnswerColor(color);

    //use logged color to select what prompt to sendS
   let quizPrompt =getQuestionByColor(color, askedQuestions, setAskedQuestions);

   //send prompt to ChatGPT
   console.log("prompt sent to ChatGPT= "+quizPrompt);
    BirdMaster(quizPrompt);
}

    return (
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
          <img src={card1} className="card" alt="Clear Red Boxes" onClick={() => CardClick('red')} style={{ cursor: 'pointer' }} />
          <img src={card2} className="card" alt="Clear Green Boxes" onClick={() => CardClick('green')} style={{ cursor: 'pointer' }} />
          <img src={card3} className="card" alt="Clear Blue Boxes" onClick={() => CardClick('blue')} style={{ cursor: 'pointer' }} />
          </div>
      </div>
    )
}

RightContainer.propTypes = {
    streak: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    setAnswerColor: PropTypes.func.isRequired,
    setAskedQuestions: PropTypes.func.isRequired,
    askedQuestions: PropTypes.arrayOf(PropTypes.number).isRequired
};

export function Canvas({ canvasRef }) {
    
    const drawGrid = useCallback(() => {
        const gridSize = 50;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas first
        console.log('Grid rendering');
        ctx.strokeStyle = "#ccc"; // Color of the grid lines
        ctx.fillStyle = "#fff"; // Font color for displaying coordinates
        ctx.font = "12px Arial"; // Font for displaying coordinates
    
        for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
            for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
                // Draw grid cell
                ctx.beginPath();
                ctx.rect(x, y, gridSize, gridSize);
                ctx.stroke();

                // Calculate grid coordinates
                const gridX = Math.floor(x / gridSize) + 1;
                const gridY = Math.floor(y / gridSize) + 1;
            
                // Display grid coordinates in each cell
                ctx.fillText(`(${gridX},${gridY})`, x + 5, y + 15);
            }
        }
    }, [canvasRef]); // Dependency array includes canvasRef

    useEffect(() => {
        drawGrid();
    }, [canvasRef, drawGrid]); // Dependency on canvasRef to redraw grid if the ref changes

    return (
        <canvas
        ref={canvasRef}
        id="gameCanvas"
        width="400"
        height="400"
        style={{ border: "2px solid #d3d3d3", backgroundColor: "black" }}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    );
}

Canvas.propTypes = {
    canvasRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired
};

export function CardContainer() {
  const { BirdMaster } = useBirdMaster();

function ButtonClick(answer) {
    console.log("button was clicked");
    console.log("player picked option "+answer);
    const modifiedAnswer = `The player selected ${answer}. Respond accordingly. You must include 'CORRECT' in your response if the player is correct, otherwise include 'INCORRECT'`;
    BirdMaster(modifiedAnswer);
  }

    return (
    <div className="card-container">
        <button className="answer-A" onClick={() => ButtonClick('Option: A')} style={{ cursor: 'pointer'}}>A</button>
        <button className="answer-B" onClick={() => ButtonClick('Option: B')} style={{ cursor: 'pointer'}}>B</button>
        <button className="answer-C" onClick={() => ButtonClick('Option: C')} style={{ cursor: 'pointer'}}>C</button>
        <button className="answer-D" onClick={() => ButtonClick('Option: D')} style={{ cursor: 'pointer'}}>D</button>
     </div>       
    )
}
