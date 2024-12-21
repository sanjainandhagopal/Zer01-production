import React, { useState } from "react";
import axios from "axios";

export default function McqValidator({ assessments, userId, courseId, moduleId }) {
  const [update, setUpdate] = useState({
    userId: userId || "",
    courseId: courseId || "",
    moduleId: moduleId || "",
    score: 0,
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOptionChange = (optionValue) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionValue,
    });
  };

  const handleNext = () => {
    if (currentQuestion < assessments.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let correctCount = 0;

    // Calculate the score
    assessments.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.CorrectOption) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / assessments.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Update module progress in the backend
    await updateScore(calculatedScore);
  };

  const updateScore = async (calculatedScore) => {
    setIsUpdating(true);

    try {
      // Send data to the backend to update the module progress
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/score/forCourseModule`,
        {
          userId: update.userId,
          courseId: update.courseId,
          moduleId: update.moduleId,
          score: calculatedScore,
        }
      );

      if (response.status === 200) {
        console.log("Score and progress updated successfully:", response.data.message);
      } else {
        console.error("Failed to update the score:", response.data.message);
      }
    } catch (error) {
      console.error("Error while updating the score:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Module Assessment</h2>
      {assessments.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {!isSubmitted ? (
            <>
              <div className="mb-5">
                <p className="font-medium mb-2">{assessments[currentQuestion].Question}</p>
                <ul className="ml-5 text-gray-600">
                  {assessments[currentQuestion].Options.map((option, optionIdx) => (
                    <li key={optionIdx} className="flex items-center mb-1">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option.Option}
                          checked={selectedAnswers[currentQuestion] === option.Option}
                          onChange={() => handleOptionChange(option.Option)}
                          className="mr-2"
                        />
                        {option.Option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-4">
                {currentQuestion < assessments.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion]}
                    className={`px-4 py-2 font-semibold rounded ${
                      selectedAnswers[currentQuestion]
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                )}
                {currentQuestion === assessments.length - 1 && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-center">Final Score: {score}%</h3>
              <p className="text-center mt-2">
                {score === 100
                  ? "Congratulations! 🎉 You got everything correct!"
                  : score >= 50
                  ? "Great effort! Keep practicing!"
                  : "Don't worry, try again and improve!"}
              </p>
              {isUpdating && <p className="text-center text-blue-500">Updating progress...</p>}
            </div>
          )}
        </form>
      ) : (
        <p>No assessments available.</p>
      )}
    </div>
  );
}
