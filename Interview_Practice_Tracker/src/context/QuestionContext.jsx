import { createContext, useEffect, useState } from "react";
import { getData, setData } from "../utils/localStorage";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {

    const [questions, setQuestions] = useState(getData());
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus,] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    //Calling setData helper function to set new updated data into localStorage 
    useEffect(() => {
        setData(questions);
    }, [questions])

    return (
        <QuestionContext.Provider value={{
            questions,
            setQuestions,
            editingQuestion,
            setEditingQuestion,
            selectedCategory,
            setSelectedCategory,
            selectedStatus,
            setSelectedStatus,
            selectedDifficulty,
            setSelectedDifficulty,
            searchQuery, 
            setSearchQuery
        }}>
            {children}
        </QuestionContext.Provider>
    );
}