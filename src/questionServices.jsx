// questionServices.jsx

export function scoreKeeper(type) {
    const pointValues = {
        type1: {
            points: 5,
        },
        type2: {
            points: -5,
        },
        type3: {
            points: 25,
        },
        // Define more types as needed
    };

    // Safely get points for the given type, default to 0 if type is not defined
    const pointsToAdd = pointValues[type]?.points || 0;
    return pointsToAdd;  // Return the points value
}