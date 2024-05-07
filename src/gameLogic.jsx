// components.jsx
import { boxTypes } from './boxTypes';
import { useNavigate } from 'react-router-dom';
import { useRef,useEffect,useState } from "react";

export function useBoxGenerator() {
    let canvasRef = useRef(null);
    const gridSize = 50;
    const navigate = useNavigate();  // Initialize useNavigate

    // Initialize grid states outside useEffect but inside the component body to set it up on first render
    const [gridStates, setGridStates] = useState(() => {
        const states = {};
        const rows = 7;
        const cols = 7;
        for (let x = 0; x <= rows; x++) {
            for (let y = 0; y <= cols; y++) {
                const address = `add${x}-${y}`;
                states[address] = { x, y, occupied: false, color: null };
            }
        }
        return states;
    });


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rows = 7;
        const cols = 7;

        const gridAddresses = {};
        for (let x = 0; x <= rows; x++) {
            for (let y = 0; y <= cols; y++) {
                const address = `add${x}-${y}`;
                gridAddresses[address] = { x, y }; // Storing pixel coordinates as an object
            }
        }

        const intervalID = setInterval(() => {
            const addressArray = Object.keys(gridStates).filter(address => !gridStates[address].occupied);
            //check if all occupied
            if (addressArray.length === 0) {
                clearInterval(intervalID); // Stop interval if all squares are occupied
                navigate('/game-over', { state: { hasWon: false } }); // If the player loses
                return;
            }

            // Fisher-Yates shuffle algorithm to shuffle the addressArray
            for (let i = addressArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [addressArray[i], addressArray[j]] = [addressArray[j], addressArray[i]];
            }

            // Choose a random grid address from the shuffled array
            const randomAddress = addressArray[Math.floor(Math.random() * addressArray.length)];
            const selectedSquare = gridStates[randomAddress];

            if (!selectedSquare.occupied) { // Check if the selected square is not already occupied
            
            // Randomly select a box type to determine the color
            const boxTypeKeys = Object.keys(boxTypes);
            const randomColor = boxTypes[boxTypeKeys[Math.floor(Math.random() * boxTypeKeys.length)]];

            //mark as occupied
            setGridStates(prev => {
                const newState = {
                    ...prev,
                    [randomAddress]: { ...prev[randomAddress], occupied: true, color: randomColor.color }
                };

                return newState;
            });

            // Retrieve the pixel coordinates for the random grid address
            const { x, y } = selectedSquare;

            const offset = (gridSize - 40) / 2;
            
            // Calculate the top-left corner coordinates for drawing the box at the center of the grid cell
            const topLeftX = (x * gridSize) + offset; // Adjusted for centering
            const topLeftY = (y * gridSize) + offset; // Adjusted for centering

            // Draw the new box on the canvas at the calculated top-left corner coordinates
            ctx.fillStyle = randomColor.color; // Set fill color to boxType selected
            ctx.fillRect(topLeftX, topLeftY, 40, 40); // Draw a 40x40 box at the calculated position
        } else {
            console.log(`Attempt to occupy an already occupied square at ${randomAddress} was prevented.`);
        }

        }, 1500); // Adjust the interval as necessary

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalID);
    }, [canvasRef, gridSize, gridStates, navigate]); // Dependency array for useEffect

    const clearBoxes = (color) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        Object.keys(gridStates).forEach(address => {
            const square = gridStates[address];

            if (square.occupied && square.color === color) {
                const { x, y } = square;
                const topLeftX = x * gridSize;
                const topLeftY = y * gridSize;
                ctx.clearRect(topLeftX, topLeftY, 49, 49); // Adjust the size as necessary
                setGridStates(prev => ({
                    ...prev,
                    [address]: { ...prev[address], occupied: false, color: null }
                }));
            }
        });
};
    return { canvasRef, clearBoxes };
}
