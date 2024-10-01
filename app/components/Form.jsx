"use client";

import React, { useState } from "react";
import { CircleX } from "lucide-react";

const Form = ({ onSubmit, setIsLoading, isloading }) => {
  const [formData, setFormData] = useState({
    age: "",
    duration: "",
    curriculum: "",
    topic: "",
    subject: "",
    additional: "",
    difficulty: "",
    energy: "",
    fourCs: [],
  });
  const [errors, setErrors] = useState({
    age: "",
    duration: "",
    curriculum: "",
    topic: "",
    subject: "",
    additional: "",
    difficulty: "",
    energy: "",
    fourCs: "",
  });
  const [charactersTyped, setCharactersTyped] = useState(0);

  const maxLength = 200;

  // State for Active Tab
  const [activeTab, setActiveTab] = useState("Lesson");

  // Toggle selection for 4 C's (allows multiple selections)
  const handleSelectionToggle = (selection) => {
    setFormData((prevData) => ({
      ...prevData,
      fourCs: prevData.fourCs.includes(selection)
        ? prevData.fourCs.filter((item) => item !== selection)
        : [...prevData.fourCs, selection],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      age,
      duration,
      curriculum,
      topic,
      subject,
      additional,
      difficulty,
      energy,
      fourCs,
    } = formData;

    const ageError = validateAge(age);
    const durationError = validateDuration(duration);
    const curriculumError = validateCurriculum(curriculum);
    const topicError = validateTopic(topic);
    const subjectError = validateSubject(subject);
    const additionalError = validateAdditional(additional);
    const difficultyError = validateDifficulty(difficulty);
    const energyError = validateEnergy(energy);
    const fourCsError = validateFourCs(fourCs);

    if (
      ageError ||
      durationError ||
      curriculumError ||
      topicError ||
      subjectError ||
      additionalError ||
      difficultyError ||
      energyError ||
      fourCsError
    ) {
      setErrors({
        age: ageError,
        duration: durationError,
        curriculum: curriculumError,
        topic: topicError,
        subject: subjectError,
        additional: additionalError,
        difficulty: difficultyError,
        energy: energyError,
        fourCs: fourCsError,
      });
      setIsLoading(false);
      return;
    }

    // Send the form data to the API route
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API.");
      }

      const result = await response.json();
      onSubmit(result.response1, result.response2);
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { id, value, type } = event.target;

    if (type === "checkbox") {
      handleSelectionToggle(value);
      setErrors({ ...errors, fourCs: validateFourCs(formData.fourCs) });
    } else if (id === "difficulty") {
      setFormData({ ...formData, difficulty: value });
      setErrors({ ...errors, difficulty: validateDifficulty(value) });
    } else if (id === "energy") {
      setFormData({ ...formData, energy: value });
      setErrors({ ...errors, energy: validateEnergy(value) });
    } else {
      setFormData({ ...formData, [id]: value });
      if (id === "age") setErrors({ ...errors, age: validateAge(value) });
      if (id === "duration")
        setErrors({ ...errors, duration: validateDuration(value) });
      if (id === "curriculum")
        setErrors({ ...errors, curriculum: validateCurriculum(value) });
      if (id === "topic") setErrors({ ...errors, topic: validateTopic(value) });
      if (id === "subject")
        setErrors({ ...errors, subject: validateSubject(value) });
      if (id === "additional")
        setErrors({ ...errors, additional: validateAdditional(value) });
    }
  };

  const validateAge = (value) => {
    if (!value) return "Age is required.";
    if (value <= 0) return "Age must be a positive number.";
    if (value > 100) return "Enter valid age";
    return "";
  };

  const validateDuration = (value) => {
    if (!value) return "Class duration is required.";
    if (value <= 0) return "Duration must be a positive number.";
    return "";
  };

  const validateCurriculum = (value) => {
    if (!value) return "Curriculum is required.";
    return "";
  };

  const validateTopic = (value) => {
    if (!value) return "Topic is required.";
    return "";
  };
  const validateSubject = (value) => {
    if (!value) return "Subject is required.";
    return "";
  };

  const validateAdditional = (value) => {
    if (value.length > maxLength)
      return `Exceeded max length of ${maxLength} characters.`;
    return "";
  };

  const validateDifficulty = (value) => {
    if (!value) return "Difficulty level is required.";
    return "";
  };
  const validateEnergy = (value) => {
    if (!value) return "Energy option is required.";
    return "";
  };

  const validateFourCs = (selectedItems) => {
    if (selectedItems.length === 0)
      return "At least one 4 C's item must be selected.";
    return "";
  };

  // Handle Tab Click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const clearForm = async (e) => {
    e.preventDefault();
    setFormData({
      age: "",
      duration: "",
      curriculum: "",
      topic: "",
      subject: "",
      additional: "",
      difficulty: "",
      energy: "",
      fourCs: "",
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-gray-200 w-full h-full rounded-xl p-4 text-black"
      >
        {/* Responsive Select for Mobile */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select Tab
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={activeTab}
            onChange={(e) => handleTabClick(e.target.value)}
          >
            <option value="Lesson">Lesson</option>
            <option value="Homework">Homework</option>
            <option value="Quiz">Quiz</option>
            <option value="Term Planner">Term Planner</option>
          </select>
        </div>

        {/* Tabs for Desktop */}
        <ul className="hidden bg-gray-800 text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          {["Lesson", "Homework", "Quiz", "Term Planner"].map((tab) => (
            <li className="w-full" key={tab}>
              <button
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`inline-block w-full p-4 ${
                  activeTab === tab
                    ? "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
                    : "bg-white dark:bg-gray-800 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                } border-r border-gray-800 dark:border-gray-800 rounded-lg focus:outline-none`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Age and Class Duration Inputs */}
        <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
          <div className="w-full md:w-1/2">
            <label htmlFor="age" className="flex items-center py-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-500 p-1 focus:outline-none w-full"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="duration" className="flex items-center py-1">
              Class Duration
            </label>
            <input
              type="number"
              id="duration"
              placeholder="Enter Duration in minutes"
              value={formData.duration}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-500 focus:outline-none p-1 w-full"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Curriculum Input */}
        <div className="flex flex-col py-6 w-full">
          <label htmlFor="curriculum" className="flex items-center py-1">
            Curriculum
          </label>
          <input
            type="text"
            id="curriculum"
            placeholder="USA curriculum"
            value={formData.curriculum}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-gray-500 focus:outline-none w-full"
          />
          {errors.curriculum && (
            <p className="text-red-500 text-sm">{errors.curriculum}</p>
          )}
        </div>

        {/* Subject and Topic Inputs */}
        <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
          <div className="w-full md:w-1/2">
            <label htmlFor="subject" className="flex items-center py-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-500 p-1 focus:outline-none w-full"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="topic" className="flex items-center py-1">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              placeholder="Enter Topic"
              value={formData.topic}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-500 focus:outline-none p-1 w-full"
            />
            {errors.topic && (
              <p className="text-red-500 text-sm">{errors.topic}</p>
            )}
          </div>
        </div>

        {/* 4 C's Selection */}
        <div className="flex flex-col w-full">
          <label htmlFor="fourCs" className="flex items-center py-1 mb-2">
            4 C's Selection
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Critical Thinking",
              "Collaboration",
              "Creativity",
              "Communication",
            ].map((selection) => (
              <label
                key={selection}
                className="flex items-center p-2 w-full rounded-xl cursor-pointer hover:bg-gray-300 hover:text-black transition duration-200 ease-in-out transform"
              >
                <input
                  id="fourCS"
                  type="checkbox"
                  value={selection}
                  checked={formData.fourCs.includes(selection)}
                  onChange={() => handleSelectionToggle(selection)}
                  className="m-1 appearance-none h-4 w-4 border border-gray-500 rounded-md checked:bg-black checked:border-transparent focus:outline-none checked:ring-black checked:ring-offset-2 checked:ring-2 transition duration-100 ease-in-out transform checked:scale-110"
                />
                <span className="ml-2">{selection}</span>
              </label>
            ))}
          </div>
          {errors.fourCs && (
            <p className="text-red-500 text-sm">{errors.fourCs}</p>
          )}
        </div>

        {/* Difficulty Level & Energy Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Difficulty Level */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="level" className="flex items-center py-1">
              Difficulty Level
            </label>
            <div className="flex">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className={`relative flex items-center p-2 cursor-pointer rounded-xl ${
                    formData.difficulty === level
                      ? "text-black"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={formData.difficulty === level}
                    onChange={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        difficulty: level,
                      }));
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        difficulty: validateDifficulty(level),
                      }));
                    }}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <span
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 transition-colors duration-200 ${
                      formData.difficulty === level
                        ? level === "Low"
                          ? "border-gray-500"
                          : level === "Medium"
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    {formData.difficulty === level && (
                      <span
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          level === "Low"
                            ? "bg-gray-500"
                            : level === "Medium"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    )}
                  </span>
                  {level}
                </label>
              ))}
            </div>
            {errors.difficulty && (
              <p className="text-red-500 text-sm">{errors.difficulty}</p>
            )}
          </div>

          {/* Energy Level */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="energy" className="flex items-center py-1">
              Energy Options
            </label>
            <div className="flex">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className={`relative flex items-center p-2 cursor-pointer rounded-xl ${
                    formData.energy === level ? "text-black" : "text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="energy"
                    value={level}
                    checked={formData.energy === level}
                    onChange={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        energy: level,
                      }));
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        energy: validateEnergy(level),
                      }));
                    }}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <span
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 transition-colors duration-200 ${
                      formData.energy === level
                        ? level === "Low"
                          ? "border-gray-500"
                          : level === "Medium"
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-gray-700"
                    }`}
                  >
                    {formData.energy === level && (
                      <span
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          level === "Low"
                            ? "bg-gray-500"
                            : level === "Medium"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    )}
                  </span>
                  {level}
                </label>
              ))}
            </div>
            {errors.energy && (
              <p className="text-red-500 text-sm">{errors.energy}</p>
            )}
          </div>
        </div>

        {/* Additional Information Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="additional" className="flex items-center p-1">
            Additional Information
          </label>
          <textarea
            id="additional"
            className="bg-transparent border-2 border-gray-500 p-1 focus:outline-none w-full resize-none"
            maxLength={maxLength}
            rows="5"
            value={formData.additional}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prevData) => ({
                ...prevData,
                additional: e.target.value,
              }));
              setCharactersTyped(value.length);
              setErrors((prevErrors) => ({
                ...prevErrors,
                additional: validateAdditional(e.target.value),
              }));
            }}
          />
          {errors.additional && (
            <p className="text-red-500 text-sm">{errors.additional}</p>
          )}
          <span className="w-full">
            {charactersTyped}/{maxLength}
          </span>
        </div>

        {/* Generate Button */}
        <div className="flex gap-4 mt-4">
          <button onClick={clearForm}>
            <CircleX className="h-8 w-8" />
          </button>
          <button
            className="bg-blue-700 p-3 flex items-center justify-center w-full text-white rounded-xl hover:bg-blue-500"
            disabled={isloading}
          >
            {isloading ? (
              <div className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;