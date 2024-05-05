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

export function generatePrompt(color) {
    const questionTypes = {
        red: {
            question: "Ask me a multiple choice quiz question about US state Capitals. I will answer with either A, B, C, or D."
        },
        green: {
            question: "Ask me a multiple choice quiz question about popular music. I will answer with either A, B, C, or D."
        },
        blue: {
            question: "Ask me a multiple choice quiz question about US history. I will answer with either A, B, C, or D."
        },
        //more question types can be here

    };
    const questionToAsk = questionTypes[color]?.color || "red";
    return questionToAsk;
}