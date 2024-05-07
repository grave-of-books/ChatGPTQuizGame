// GamePages.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import titleImage from './assets/title2.png'

export function GameOver() {
    const navigate = useNavigate();
    const location = useLocation(); // Get location object
    const { hasWon } = location.state || { hasWon: false }; // Default to losing if state is not passed

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Redirects to the home page
        }, 10000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>{hasWon ? "Congratulations, you won!" : "Game over!"}</h1>
            <p>Thank you for playing. You will be redirected to the home page shortly.</p>
        </div>
    );
}

export function HomePage() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game');
    };

    return (
        <div>
        <div className="titleContainer">
            <img src={titleImage} className="titleImage" />
            <button className="startButton" onClick={handleStartGame}>Start Game</button>
        </div>
        </div>
    );
}
