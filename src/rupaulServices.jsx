//imports

export function birdWhisperer(message) {
  let tag;

  if (message.includes("INCORRECT")) {
    tag = "INCORRECT";
    console.log("tag set to"+tag);
  } else if (message.includes("CORRECT")) {
    tag = "CORRECT";
    console.log("tag set to"+tag);
  } else {
    // Handle cases where no tag is found
    tag = "UNKNOWN";
    console.log("tag set to"+tag);
  }

  return { tag };
}

export function getQuestionByColor(color) {
  const questionDefinitions = {
    red: {
      color: "red",
      prompt: 'Ask me a multiple choice quiz question about US state Capitals. I will respond with A, B, C, or D.',
    },

    blue: {
      color: "blue",
      prompt: 'Ask me a multiple choice quiz question about US History. I will respond with A, B, C, or D.',
    },
  
    green: {
      color: "green",
      prompt: 'Ask me a multiple choice quiz question about music. I will respond with A, B, C, or D.',
    },
  };

  if (questionDefinitions[color]) {
    return questionDefinitions[color].prompt;
  } else {
    // Handle case where the color is not found
    return "Color not recognized. Please choose red, blue, or green.";
  }

}