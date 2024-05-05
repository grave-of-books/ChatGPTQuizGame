import { createContext, useState } from "react";
import PropTypes from 'prop-types';

// Create the context
export const HistoryContext = createContext();

export const HistoryContextProvider = ({ children }) => {
    const [score, setScore] = useState(0); 
    const [streak, setStreak] = useState(0); 
    const [messages, setMessages] = useState([]);
    const [answerColor, setAnswerColor] = useState(" ");
    const [condition, setCondition] = useState(" ");

    return (
        <HistoryContext.Provider value={{ 
            score, streak, messages, answerColor, condition,
            setScore, setStreak, setMessages, setAnswerColor, setCondition }}>
            {children}
        </HistoryContext.Provider>
    );
};

// PropTypes for HistoryContextProvider
HistoryContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};