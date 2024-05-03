import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] =useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);
  const handleCreateQuestion = (formData) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newQuestion => {
        // Update questions state with the newly created question
        setQuestions([...questions, newQuestion]);
      })
      .catch(error => console.error("Error creating question:", error));
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
