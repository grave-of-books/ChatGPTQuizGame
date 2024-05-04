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
