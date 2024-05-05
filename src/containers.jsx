
import PropTypes from 'prop-types';

import card1 from './assets/card_1.png';
import card2 from './assets/card_2.png';
import card3 from './assets/card_3.png';

export function LeftContainer({messages}) {
    return (
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
    )
}

LeftContainer.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        role: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    })).isRequired,
};

export function RightContainer({streak, score, CardClick}) {
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
          <img src={card1} className="card" alt="Clear Red Boxes" onClick={() => CardClick('red', 'Ask me a multiple choice question about capital cities. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
          <img src={card2} className="card" alt="Clear Green Boxes" onClick={() => CardClick('green', 'Ask me a multiple choice question about music. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
          <img src={card3} className="card" alt="Clear Blue Boxes" onClick={() => CardClick('blue', 'Ask me a multiple choice question about histoy. I will respond with A, B, C, or D.')} style={{ cursor: 'pointer' }} />
          </div>
      </div>
    )
}

RightContainer.propTypes = {
    streak: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    CardClick: PropTypes.func.isRequired
};

export function Canvas({canvasRef}) {
    return (
        <canvas
        ref={canvasRef}
        id="gameCanvas"
        width="400"
        height="400"
        style={{ border: "2px solid #d3d3d3", backgroundColor: "black" }}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    )
}

Canvas.propTypes = {
    canvasRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired
};

export function CardContainer({ButtonClick}) {
    return (
    <div className="card-container">
        <button className="answer-A" onClick={() => ButtonClick('Option: A')} style={{ cursor: 'pointer'}}>A</button>
        <button className="answer-B" onClick={() => ButtonClick('Option: B')} style={{ cursor: 'pointer'}}>B</button>
        <button className="answer-C" onClick={() => ButtonClick('Option: C')} style={{ cursor: 'pointer'}}>C</button>
        <button className="answer-D" onClick={() => ButtonClick('Option: D')} style={{ cursor: 'pointer'}}>D</button>
     </div>       
    )
}

CardContainer.propTypes = {
    ButtonClick: PropTypes.func.isRequired
};