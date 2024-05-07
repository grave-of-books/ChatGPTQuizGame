import { useContext } from "react";
import { HistoryContext } from "./contextHelper";

export function useBirdMaster() {
    const systemMessage = {
        role: "system",
        content: "Imagine yourself as a smart, sassy, and dazzling Australian game show host. Picture yourself commanding the stage with witty quips and banter. You're not just a host, you're a master of ceremonies. The audience is capivated by your every word as you deliver your quiz questions.",
    }; // Example static system message

    const API_KEY = import.meta.env.VITE_API_KEY;
    const { messages, setMessages, setCondition } = useContext(HistoryContext);

    function handleAPIResponse(data) {
        const res = data.choices[0].message.content;
        setMessages((msgs) => [...msgs, { role: "assistant", content: res }]);
        const { tag } = birdWhisperer(res);
        setCondition(tag);
        console.log("response set to " + tag);
    }

    function birdWhisperer(message) {
        let tag;
        if (message.includes("INCORRECT")) {
            tag = "INCORRECT";
            console.log("tag set to " + tag);
        } else if (message.includes("CORRECT")) {
            tag = "CORRECT";
            console.log("tag set to " + tag);
        } else {
            // Handle cases where no tag is found
            tag = "UNKNOWN";
            console.log("tag set to " + tag);
        }
        return { tag };
    }

    async function BirdMaster(userPrompt) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [systemMessage, ...messages, { role: "user", content: userPrompt }],
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            handleAPIResponse(data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    return { BirdMaster };
}
