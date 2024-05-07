function questionDictionary(color, askedQuestions, setAskedQuestions) {
  const exampleQuestions = {
    red: [
      {
        questionID: "1",
         example: "winding up",
         definition: "process after dissolution where debts are paid and assets are distributed"
      },
      {
        questionID: "2",
        example: "Federal Trade Commission",
        definition: "governing body that regulates franchisors. "
      },
      {
        questionID: "3",
        example: "length of time it takes to adopt a permissible accounting method",
        definition: "one year"
      },
      {
        questionID: "4",
        example: "length of time it takes to adopt an impermissible accounting method",
        definition: "two years"
      },
      {
        questionID: "5",
        example: "Schedule E",
        definition: "1040 schedule for reporting transactions from flow-through entities"
      },
      {
        questionID: "6",
        example: "amount of capital loss deduction against ordinary income for an individual",
        definition: "$3000"
      },
      {
        questionID: "7",
        example: "time limit in years for IRS to assess tax",
        definition: "three years after the return due date or date recieved "
      },
      {
        questionID: "8",
        example: "self-employment tax",
        definition: "15.3% of net income from self employment"
      },
      {
        questionID: "9",
        example: "qualified education loan interest expense deduction limit",
        definition: "$2500 and phases out depending on AGI"
      },
      {
        questionID: "10",
        example: "medical expense deduction limit",
        definition: "7.5% of individual's AGI"
      },
      {
        questionID: "31",
        example: "ad valoreum tax",
        definition: "a tax that is based on the value of the taxed property"
      },
      {
        questionID: "31",
        example: "ad valoreum tax",
        definition: "a tax that is based on the value of the taxed property"
      },
      {
        questionID: "32",
        example: "length of time taxpayer has to petition the Tax Court in response to a Notice of Deficiency",
        definition: "90 days"
      },
    ],

    blue: [
      {
        questionID: "11",
        example: "binding authority",
        definition: "source of law a court must follow when deciding a case"
      },
      {
        questionID: "12",
        example: "specific performance",
        definition: "court order for a party to perform an agreement as promised"
      },
      {
        questionID: "13",
        example: "contract",
        definition: "legally enforceable agreement between at least two parties - a promise given in exchange for consideration"
      },
      {
        questionID: "14",
        example: "age of majority law",
        definition: "contracts entered into by minors are voidable at the minor's discretion"
      },
      {
        questionID: "15",
        example: "statute of frauds",
        definition: "state-level law that requires certain contracts to be written"
      },
      {
        questionID: "16",
        example: "parol contracts",
        definition: "orally created contract or modification of a contract"
      },
      {
        questionID: "17",
        example: "implied contracts",
        definition: "established by parties' actions & can still be legally binding"
      },
      {
        questionID: "18",
        example: "bilateral contractions",
        definition: "a contract in which both parties make a promise of performance"
      },
      {
        questionID: "19",
        example: "principal",
        definition: "owner of a business entity"
      },
      {
        questionID: "20",
        example: "partnership",
        definition: "business entity with more than one principal"
      },
      {
        questionID: "33",
        example: "statue of limitations in the case of a fraud",
        definition: "unlimited"
      },
      {
        questionID: "34",
        example: "limited liability company",
        definition: "a partnership that gives all members limited liability"
      },
    ],

    green: [
      {
        questionID: "21",
        example: "implied partnership",
        definition: "created through the actions of the parties, but still recognized by law"
      },
      {
        questionID: "22",
        example: "joint and severally liable",
        definition: "general partners personal assets are at risk both together(joint) and seperately(severally)"
      },
      {
        questionID: "23",
        example: "information return",
        definition: "tax filing submitted by partnerships that document income information about the partnership"
      },
      {
        questionID: "24",
        example: "default method for splitting partnership profits",
        definition: "split evenly regardless of involvement in the business"
      },
      {
        questionID: "25",
        example: "fiduciary duty",
        definition: "set of duties that ensure all partners act in the best interest of the partnership"
      },
      {
        questionID: "26",
        example: "limited partnership",
        definition: "has at least one general partner and one limited partner"
      },
      {
        questionID: "27",
        example: "general partner",
        definition: "the managing principal"
      },
      {
        questionID: "28",
        example: "limited partner",
        definition: "the investing principal"
      },
      {
        questionID: "29",
        example: "Revised Uniform Limted Partership Act(RULPA)",
        definition: "governs limited partnerships in the absence of a partnership agreement"
      },
      {
        questionID: "30",
        example: "primary exception to RULPA liability rule",
        definition: "limited partner has acted illegally or negligently in the scope of partnership duties."
      },
      {
        questionID: "35",
        example: "max amount of shareholders an S corporation can have",
        definition: "100 shareholders"
      },
      {
        questionID: "36",
        example: "The first event that occurs when a partnership ends",
        definition: "Dissolution"
      },
    ],
  };

  if (exampleQuestions[color]) {

    const categoryQuestions = exampleQuestions[color];
    const unansweredQuestions = categoryQuestions.filter(question => !askedQuestions.includes(question.questionID));
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    const randomQuestion = unansweredQuestions[randomIndex];

     // Ensure that objects in exampleQuestions array are structured like { example, definition }
     const { example, definition } = exampleQuestions[color][randomIndex];

    setAskedQuestions([...askedQuestions, parseInt(randomQuestion.questionID)]);

    const questionPromptTemplate = {
      example: `Ask me a multiple choice quiz question based on the following tax or business law concept: ${example}. Make sure to include four answer choices in your question, one choice that is true and three that are plausible but false. Don't use the definition directly in the question, but please provide it as the correct answer option. Be careful to ensure the question can be answered with the provided definition. I will answer in the form of Option A, Option B, Option C, or Option D.`,
      definition: `${definition}`,  // Corrected to use template literals for interpolation

    };
    console.log("chose the following items: "+example + definition);

    return questionPromptTemplate;

  } else {
    return "Invalid color.";
  }
}

export function getQuestionByColor(color, askedQuestions, setAskedQuestions) {
  const questionPrompt = questionDictionary(color, askedQuestions, setAskedQuestions);

  if (questionPrompt === 'string') {  // Handle invalid colors
    return questionPrompt;
  }

  console.log("selected question prompt" + questionPrompt)
  const fullPrompt = `${questionPrompt.example} Definition: ${questionPrompt.definition}`;
  console.log("example is" + questionPrompt.example);
  return fullPrompt;
}
