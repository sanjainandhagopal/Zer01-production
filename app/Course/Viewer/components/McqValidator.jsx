import React, { useState, useEffect } from "react";
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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle array utility
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle questions and limit to 15
    const shuffled = shuffleArray(assessments).slice(0, 15);

    // Shuffle options for each question
    const randomizedQuestions = shuffled.map((question) => ({
      ...question,
      Options: shuffleArray(question.Options),
    }));

    setShuffledQuestions(randomizedQuestions);
  }, [assessments]);

  const handleOptionChange = (optionValue) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionValue,
    });
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let correctCount = 0;

    // Calculate the score
    shuffledQuestions.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.CorrectOption) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / shuffledQuestions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Update module progress in the backend
    await updateScore(calculatedScore);
  };

  const updateScore = async (calculatedScore) => {
    setIsUpdating(true);

    try {
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
    <div className="max-w-4xl mx-auto p-6 text-gray-900 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Module Assessment</h2>
      {shuffledQuestions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <p className="font-medium text-lg mb-4">{shuffledQuestions[currentQuestion].Question}</p>
                <ul className="space-y-4 ml-5">
                  {shuffledQuestions[currentQuestion].Options.map((option, optionIdx) => (
                    <li key={optionIdx} className="flex items-center cursor-pointer">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option.Option}
                          checked={selectedAnswers[currentQuestion] === option.Option}
                          onChange={() => handleOptionChange(option.Option)}
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-3 text-gray-800">{option.Option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center mt-6">
                {currentQuestion < shuffledQuestions.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion]}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                      selectedAnswers[currentQuestion]
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                )}
                {currentQuestion === shuffledQuestions.length - 1 && (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-6 text-center">
              <h3 className="text-4xl font-semibold text-green-600">Final Score: {score}%</h3>
              <p className="text-xl text-gray-700 mt-4">
                {score === 100
                  ? "Congratulations! 🎉 You got everything correct!"
                  : score >= 50
                  ? "Great effort! Keep practicing!"
                  : "Don't worry, try again and improve!"}
              </p>
              {isUpdating && <p className="text-blue-500 mt-4">Updating progress...</p>}
            </div>
          )}
        </form>
      ) : (
        <p className="text-center text-gray-500">No assessments available.</p>
      )}
    </div>
  );
}
