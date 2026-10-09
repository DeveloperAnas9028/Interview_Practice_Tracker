const initialQuestions = [
    {
        id: 1,
        title: "Two Sum",
        category: "DSA",
        difficulty: "Easy",
        status: "Completed"
    },
    {
        id: 2,
        title: "Wrong Branch, Correct Work",
        category: "GitHub",
        difficulty: "Medium",
        status: "In Progress"
    },
    {
        id: 3,
        title: "Merge Conflict During PR",
        category: "GitHub",
        difficulty: "Medium",
        status: "In Progress"
    },
    {
        id: 4,
        title: "JavaScript Async Flow",
        category: "Technical",
        difficulty: "Medium",
        status: "Pending"
    },
];

export function getData() {
    const data = localStorage.getItem("initialQuestions");

    if(data){
        return JSON.parse(data);
    }

    return initialQuestions;
}



export function setData(questions){
    localStorage.setItem("initialQuestions",JSON.stringify(questions));
}