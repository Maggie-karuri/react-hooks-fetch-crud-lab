import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        console.log(response); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        console.error("Error fetching questions:", error);
      });
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      // Remove the deleted question from the list
      setQuestions(questions.filter(question => question.id !== id));
    })
    .catch((error) => {
      console.error("Error deleting question:", error);
    });
  };
  const handleCreateQuestion = (formData) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add question");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <section>
       <QuestionForm onCreateQuestion={handleCreateQuestion} />
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((question)=> (
        <QuestionItem key={question.id} question={question} onDelete={handleDelete} />
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
