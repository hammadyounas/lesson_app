"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, clearFormData } from "../redux/slices/formSlice";
import { CircleX } from "lucide-react";
import TextInput from "./ui/TextInput";
import CheckboxInput from "./ui/CheckboxInput";
import RadioInput from "./ui/RadioInput";
import TextareaInput from "./ui/TextAreaInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";


const FormComponent = ({
  onSubmit,
  setIsLoading,
  isLoading,
  disableGenerate,
  freeResponseCount,
  FREE_RESPONSE_LIMIT,
  setShowLimitModal,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const maxLength = 200;
  // State for Active Tab
  const [activeTab, setActiveTab] = useState("Lesson");
  const [mobileActiveTab, setMobileActiveTab] = useState("Lesson");

  // Toggle selection for 4 C's (allows multiple selections)
  const handleSelectionToggle = (selection, values, setFieldValue) => {
    const updatedFourCs = values.fourCs.includes(selection)
      ? values.fourCs.filter((item) => item !== selection)
      : [...values.fourCs, selection];

    // Update the Formik field value
    setFieldValue("fourCs", updatedFourCs);
  };

  // Handle Tab Click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleMobileTabClick = (tab) => {
    setMobileActiveTab(tab);
  };

  const clearForm = (resetForm) => {
    // console.log("Clear form triggered");
    dispatch(clearFormData());
    resetForm();
  };
  // Yup validation schema
  const validationSchema = Yup.object().shape({
    age: Yup.string()
      .required("Age is required."),
    duration: Yup.number()
      .required("Class duration is required.")
      .positive("Duration must be a positive number."),
    curriculum: Yup.string().required("Curriculum is required."),
    topic: Yup.string().required("Topic is required."),
    subject: Yup.string().required("Subject is required."),
    // indoorOutdoor: Yup.string().required(" indoorOutdoor is required."),
    additional: Yup.string().max(
      maxLength,
      `Exceeded max length of ${maxLength} characters.`
    ),
    difficulty: Yup.string().required("Difficulty level is required."),
    energy: Yup.string().required("Energy option is required."),
    noOfStudents: Yup.string().required("No of Students is required."),
    // noOfAdults: Yup.string().required("No of Adults is required."),
    fourCs: Yup.array()
      .of(Yup.string())
      .min(1, "At least one 4 C's item must be selected."),
  });

  return (
    <Formik
      initialValues={formData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log("Selected Duration (in minutes):", values.duration);
        if (freeResponseCount >= FREE_RESPONSE_LIMIT) {
          // Show modal when the limit is reached
          setShowLimitModal(true); // This should be a state variable for the modal
          return; // Prevent further execution
        }

        setIsLoading(true);
        try {
          const response = await fetch("/api/chatgpt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch response from the API.");
          }

          const result = await response.json();
          onSubmit(result.response);
          dispatch(setFormData(values));
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, resetForm }) => (
        <Form className="flex flex-col justify-between shadow-xl shadow-primary border border-primary bg-gray-50 max-sm:mt-5 w-full h-full rounded-xl p-4 text-black">
          {/* Responsive Select for Mobile */}
          {/* <div className="sm:hidden mb-4">
            <label htmlFor="tabs" className="sr-only">
              Select Tab
            </label>
            <select
              id="tabs"
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full max-sm:py-3 p-2.5"
              value={mobileActiveTab}
              onChange={(e) => handleMobileTabClick(e.target.value)}
            >
              <option value=" ">Please Choose</option>
              <option value="Lesson">Lesson</option>
              <option value="Homework">Homework</option>
              <option value="Quiz">Quiz</option>
              <option value="Term Planner">Term Planner</option>
            </select>
          </div> */}

          {/* Tabs for Desktop */}
          {/* <ul className="hidden bg-primary xl:text-sm text-xs font-medium text-center text-black shadow sm:flex sm:items-center divide-primary relative mb-4 ">
            <div
              className={`absolute h-full w-1/4 bg-white transition-transform duration-200 ease-in-out transform ${activeTab === "Lesson"
                ? "translate-x-0"
                : activeTab === "Homework"
                  ? "translate-x-full"
                  : activeTab === "Quiz"
                    ? "translate-x-[200%]"
                    : "translate-x-[300%]"
                }`}
            />
            {["Lesson", "Homework", "Quiz", "Homework/Play"].map((tab) => (
              <li className="w-full z-10" key={tab}>
                <button
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`inline-block w-full xl:p-4 p-2 ${activeTab === tab
                    ? "text-black"
                    : "text-white hover:text-black"
                    } border-r border-white focus:outline-none`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul> */}

          <div className="xl:block mb-4">
            <label htmlFor="tabs" className="sr-only">
              Select Tab
            </label>
            <select
              id="tabs"
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full max-sm:py-3 p-2.5"
              value={mobileActiveTab}
              onChange={(e) => handleMobileTabClick(e.target.value)}
            >
              {/* <option value=" ">Please Choose</option> */}
              <option value="Lesson">Lesson</option>
              <option value="Homework">Homework</option>
              <option value="Quiz">Quiz</option>
              <option value="Term Planner">Term Planner</option>
            </select>
          </div>

          {/* Tabs for Desktop */}
          <ul className="hidden bg-primary xl:text-sm text-xs font-medium text-center text-black shadow sm:flex sm:items-center divide-primary relative mb-4 ">
            <div
              className={`absolute h-full w-1/4 bg-white transition-transform duration-200 ease-in-out transform ${
                activeTab === "Lesson"
                  ? "translate-x-0"
                  : activeTab === "Homework"
                  ? "translate-x-full"
                  : activeTab === "Quiz"
                  ? "translate-x-[200%]"
                  : "translate-x-[300%]"
              }`}
            />
            {/* {["Lesson", "Homework", "Quiz", "Homework/Play"].map((tab) => (
    <li className="w-full z-10" key={tab}>
      <button
        type="button"
        onClick={() => handleTabClick(tab)}
        className={`inline-block w-full xl:p-4 p-2 ${activeTab === tab
          ? "text-black"
          : "text-white hover:text-black"
          } border-r border-white focus:outline-none`}
      >
        {tab}
      </button>
    </li>
  ))} */}
          </ul>

          {/* Age and Class Duration Inputs */}
          <div className="flex flex-col xl:flex-row w-full gap-4 mb-3 ">
            <div className="flex-1">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age Range
              </label>
              <input
                id="age"
                type="number"
                value={values.age}
                onChange={(e) => setFieldValue("age", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-l-7 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter Age"
                min="1"
                max="65"
              />
              {touched.age && errors.age && (
                <div className="text-red-600 mt-1 text-sm">{errors.age}</div>
              )}
            </div>

            {/* Duration Dropdown */}
            <div className="flex-1 ">
              <label
                htmlFor="age"
                className="block text-sm font-medium  text-gray-700"
              >
                Class Duration
              </label>
              {/* Custom Duration Selector */}
              <div className="flex items-center space-x-4  mt-1">
                {/* Hours Dropdown */}
                <div className="relative w-28   ">
                  <select
                    value={values.hours || 0}
                    onChange={(e) => {
                      const selectedHours = Number(e.target.value);
                      setFieldValue("hours", selectedHours);

                      // Calculate total duration in minutes: hours * 60 + minutes
                      const selectedMinutes = values.minutes || 0; // Ensure minutes are a number
                      const totalMinutes = selectedHours * 60 + selectedMinutes;

                      setFieldValue("duration", totalMinutes); // Store as number
                    }}
                    className="block w-full border border-gray-700 rounded-md shadow-sm px-2 py-2 focus:ring-primary focus:border-primary text-gray-700"
                  >
                    {[...Array(6)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-1/2  left-8 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    Hour
                  </span>
                </div>

                {/* Separator */}
                <span className="text-lg font-semibold  text-gray-700">:</span>

                {/* Minutes Dropdown */}
                <div className="relative w-28">
                  <select
                    value={values.minutes || 0}
                    onChange={(e) => {
                      const selectedMinutes = Number(e.target.value);
                      setFieldValue("minutes", selectedMinutes);

                      // Calculate total duration in minutes: hours * 60 + minutes
                      const selectedHours = values.hours || 0; // Ensure hours are a number
                      const totalMinutes = selectedHours * 60 + selectedMinutes;

                      setFieldValue("duration", totalMinutes); // Store as number
                    }}
                    className="block w-full border border-gray-700 rounded-md shadow-sm px-2 py-2 focus:ring-primary focus:border-primary text-gray-700"
                  >
                    {/* Dynamically generate minute options */}
                    {values.hours > 0
                      ? [0, 15, 30, 45, 59].map((minute) => (
                          <option key={minute} value={minute}>
                            {minute < 10 ? `0${minute}` : minute}
                          </option>
                        ))
                      : [0, 15, 30, 45].map((minute) => (
                          <option key={minute} value={minute}>
                            {minute < 10 ? `0${minute}` : minute}
                          </option>
                        ))}
                  </select>
                  <span className="absolute top-1/2  left-8 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    Minutes
                  </span>
                </div>
              </div>

              {/* Error Messages */}
              {touched.duration && errors.duration && (
                <p className="text-red-600 text-sm ">{errors.duration}</p>
              )}
            </div>
          </div>

          {/* Subject and Topic Inputs */}
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <TextInput
              label="Subject"
              id="subject"
              type="text"
              value={values.subject}
              onChange={(e) => setFieldValue("subject", e.target.value)}
              error={touched.subject && errors.subject}
              className="flex-1 border-blue-800"
            />
            <TextInput
              label="Topic"
              id="topic"
              type="text"
              value={values.topic}
              onChange={(e) => setFieldValue("topic", e.target.value)}
              error={touched.topic && errors.topic}
              className="flex-1 border-blue-800"
            />
          </div>

          {/* No of children and adults */}

          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <TextInput
              label="No of Students"
              id="noOfStudents"
              type="text"
              value={values.noOfStudents}
              onChange={(e) => setFieldValue("noOfStudents", e.target.value)}
              error={touched.noOfChildren && errors.noOfChildren}
              className="flex-1 border-blue-800"
            />
            {/* <TextInput
              label="No of Adults"
              id="noOfAdults"
              type="text"
              value={values.noOfAdults}
              onChange={(e) => setFieldValue("noOfAdults", e.target.value)}
              error={touched.noOfAdults && errors.noOfAdults}
              className="flex-1 border-blue-800"
            /> */}
          </div>

          {/* Curriculum Input */}
          <TextInput
            label="Curriculum"
            id="curriculum"
            type="text"
            value={values.curriculum}
            onChange={(e) => setFieldValue("curriculum", e.target.value)}
            error={touched.curriculum && errors.curriculum}
            className={"mb-4 border-blue-800"}
          />

          {/* indoor/outdoor */}
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <TextInput
              label="Indoor/Outdoor"
              id="indoorOutdoor"
              type="text"
              value={values.indoorOutdoor}
              onChange={(e) => setFieldValue("indoorOutdoor", e.target.value)}
              error={touched.indoorOutdoor && errors.indoorOutdoor}
              className="flex-1 border-blue-800"
            />
          </div>

          {/* 4 C's Selection */}
          <CheckboxInput
            options={[
              "Critical Thinking",
              "Collaboration",
              "Creativity",
              "Communication",
            ]}
            selectedOptions={values.fourCs}
            onToggle={(selection) =>
              handleSelectionToggle(selection, values, setFieldValue)
            }
            error={touched.fourCs && errors.fourCs}
            className="mb-4 border-primary checked:bg-primary"
          />

          {/* Difficulty Level & Energy Buttons */}
          <div className="flex lg:flex-col flex-col">
            {/* Difficulty Level */}
            <RadioInput
              name="Difficulty Level"
              options={["Low", "Medium", "High"]}
              selectedValue={values.difficulty}
              onChange={(e) => setFieldValue("difficulty", e.target.value)}
              error={touched.difficulty && errors.difficulty}
              // className="flex-1"
            />
            <RadioInput
              name="Energy Options"
              options={["Low", "Medium", "High"]}
              selectedValue={values.energy}
              onChange={(e) => setFieldValue("energy", e.target.value)}
              error={touched.energy && errors.energy}
              // className="flex-1"
            />
          </div>

          {/* Additional Information Input */}
          <TextareaInput
            id="additional"
            label="Additional Information"
            value={values.additional}
            onChange={(e) => setFieldValue("additional", e.target.value)}
            maxLength={maxLength}
            charactersTyped={values.additional.length}
            error={touched.additional && errors.additional}
            className="mb-4 border-blue-800"
            maxLengthClassName="text-right"
          />

          {/* Generate and Clear Buttons */}
          <div className="flex gap-4 pt-2">
            {/* Clear Form Button */}
            {/* <button
              type="button"
              onClick={() => clearForm(resetForm)}
              // className="flex items-center justify-center bg-red-500 p-3 rounded-full text-white hover:bg-red-400 transition-all duration-200 ease-in-out"
            >
              <CircleX className="h-8 w-8" />
            </button> */}

            {/* Generate Button */}
            <button
              type="submit"
              className={`bg-primary p-3 flex items-center justify-center w-full text-white rounded-xl hover:bg-green-700 `}
              disabled={isLoading}
              onClick={() => console.log(`Value is ${values.duration}`)} // Log the value of duration
            >
              {isLoading ? (
                <div className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;

// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setFormData, clearFormData } from "../redux/slices/formSlice";
// import { CircleX } from "lucide-react";
// import TextInput from "./ui/TextInput";
// import CheckboxInput from "./ui/CheckboxInput";
// import RadioInput from "./ui/RadioInput";
// import TextareaInput from "./ui/TextAreaInput";

// const Form = ({ onSubmit, setIsLoading, isLoading, disableGenerate }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.form.formData);
//   const [errors, setErrors] = useState({
//     age: "",
//     duration: "",
//     curriculum: "",
//     topic: "",
//     subject: "",
//     additional: "",
//     difficulty: "",
//     energy: "",
//     fourCs: "",
//   });

//   const maxLength = 200;

//   // State for Active Tab
//   const [activeTab, setActiveTab] = useState("Lesson");

//   // Toggle selection for 4 C's (allows multiple selections)
//   const handleSelectionToggle = (selection) => {
//     const updatedFourCs = formData.fourCs.includes(selection)
//       ? formData.fourCs.filter((item) => item !== selection)
//       : [...formData.fourCs, selection];

//     // Dispatch updated fourCs
//     dispatch(setFormData({ ...formData, fourCs: updatedFourCs }));
//     setErrors({ ...errors, fourCs: validateFourCs(updatedFourCs) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const {
//       age,
//       duration,
//       curriculum,
//       topic,
//       subject,
//       additional,
//       difficulty,
//       energy,
//       fourCs,
//     } = formData;

//     const ageError = validateAge(age);
//     const durationError = validateDuration(duration);
//     const curriculumError = validateCurriculum(curriculum);
//     const topicError = validateTopic(topic);
//     const subjectError = validateSubject(subject);
//     const additionalError = validateAdditional(additional);
//     const difficultyError = validateDifficulty(difficulty);
//     const energyError = validateEnergy(energy);
//     const fourCsError = validateFourCs(fourCs);

//     if (
//       ageError ||
//       durationError ||
//       curriculumError ||
//       topicError ||
//       subjectError ||
//       additionalError ||
//       difficultyError ||
//       energyError ||
//       fourCsError
//     ) {
//       setErrors({
//         age: ageError,
//         duration: durationError,
//         curriculum: curriculumError,
//         topic: topicError,
//         subject: subjectError,
//         additional: additionalError,
//         difficulty: difficultyError,
//         energy: energyError,
//         fourCs: fourCsError,
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Send the form data to the API route
//     try {
//       const response = await fetch("/api/chatgpt", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch response from the API.");
//       }

//       const result = await response.json();
//       onSubmit(result.response);
//       setErrors({});
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (event) => {
//     const { id, value, type } = event.target;

//     if (type === "checkbox") {
//       handleSelectionToggle(value);
//       setErrors({ ...errors, fourCs: validateFourCs(formData.fourCs) });
//     } else {
//       // Update the formData in Redux directly
//       const updatedData = { ...formData, [id]: value };
//       dispatch(setFormData(updatedData)); // Dispatch updated form data

//       // Validate based on the field changed
//       switch (id) {
//         case "age":
//           setErrors({ ...errors, age: validateAge(value) });
//           break;
//         case "duration":
//           setErrors({ ...errors, duration: validateDuration(value) });
//           break;
//         case "curriculum":
//           setErrors({ ...errors, curriculum: validateCurriculum(value) });
//           break;
//         case "topic":
//           setErrors({ ...errors, topic: validateTopic(value) });
//           break;
//         case "subject":
//           setErrors({ ...errors, subject: validateSubject(value) });
//           break;
//         case "additional":
//           setErrors({ ...errors, additional: validateAdditional(value) });
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const validateAge = (value) => {
//     if (!value) return "Age is required.";
//     if (value <= 0) return "Age must be a positive number.";
//     if (value > 100) return "Enter valid age";
//     return "";
//   };

//   const validateDuration = (value) => {
//     if (!value) return "Class duration is required.";
//     if (value <= 0) return "Duration must be a positive number.";
//     return "";
//   };

//   const validateCurriculum = (value) => {
//     if (!value) return "Curriculum is required.";
//     return "";
//   };

//   const validateTopic = (value) => {
//     if (!value) return "Topic is required.";
//     return "";
//   };
//   const validateSubject = (value) => {
//     if (!value) return "Subject is required.";
//     return "";
//   };

//   const validateAdditional = (value) => {
//     if (value.length > maxLength)
//       return `Exceeded max length of ${maxLength} characters.`;
//     return "";
//   };

//   const validateDifficulty = (value) => {
//     if (!value) return "Difficulty level is required.";
//     return "";
//   };
//   const validateEnergy = (value) => {
//     if (!value) return "Energy option is required.";
//     return "";
//   };

//   const validateFourCs = (selectedItems) => {
//     if (selectedItems.length === 0)
//       return "At least one 4 C's item must be selected.";
//     return "";
//   };

//   // Handle Tab Click
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };
//   const clearForm = async (e) => {
//     e.preventDefault();
//     dispatch(clearFormData());
//   };
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col justify-between shadow-lg bg-gray-200 w-full h-full rounded-xl p-4 text-black"
//       >
//         {/* Responsive Select for Mobile */}
//         <div className="sm:hidden">
//           <label htmlFor="tabs" className="sr-only">
//             Select Tab
//           </label>
//           <select
//             id="tabs"
//             className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             value={activeTab}
//             onChange={(e) => handleTabClick(e.target.value)}
//           >
//             <option value="Lesson">Lesson</option>
//             <option value="Homework">Homework</option>
//             <option value="Quiz">Quiz</option>
//             <option value="Term Planner">Term Planner</option>
//           </select>
//         </div>

//         {/* Tabs for Desktop */}
//         <ul className="hidden bg-gray-800 text-sm font-medium text-center text-gray-400 rounded-lg shadow sm:flex divide-gray-700 relative">
//           <div
//             className={`absolute h-full w-1/4 bg-gray-600 rounded-lg transition-transform duration-200 ease-in-out transform ${
//               activeTab === "Lesson"
//                 ? "translate-x-0"
//                 : activeTab === "Homework"
//                 ? "translate-x-full"
//                 : activeTab === "Quiz"
//                 ? "translate-x-[200%]"
//                 : "translate-x-[300%]"
//             }`}
//           >
//           </div>
//           {["Lesson", "Homework", "Quiz", "Term Planner"].map((tab, index) => (
//             <li className="w-full z-10" key={tab}>
//               <button
//                 type="button"
//                 onClick={() => handleTabClick(tab)}
//                 className={`inline-block w-full p-4 ${
//                   activeTab === tab
//                     ? "text-white"
//                     : "text-gray-400 hover:text-white"
//                 } border-r border-gray-700 rounded-lg focus:outline-none`}
//               >
//                 {tab}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Age and Class Duration Inputs */}
//         <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
//           <TextInput
//             label="Age"
//             id="age"
//             type="number"
//             value={formData.age}
//             onChange={handleChange}
//             error={errors.age}
//           />
//           <TextInput
//             label="Class Duration"
//             id="duration"
//             type="number"
//             value={formData.duration}
//             onChange={handleChange}
//             error={errors.duration}
//           />
//         </div>

//         {/* Curriculum Input */}
//         <TextInput
//           label="Curriculum"
//           id="curriculum"
//           type="text"
//           value={formData.curriculum}
//           onChange={handleChange}
//           error={errors.curriculum}
//         />

//         {/* Subject and Topic Inputs */}
//         <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
//           <TextInput
//             label="Subject"
//             id="subject"
//             type="text"
//             value={formData.subject}
//             onChange={handleChange}
//             error={errors.subject}
//           />
//           <TextInput
//             label="Topic"
//             id="topic"
//             type="text"
//             value={formData.topic}
//             onChange={handleChange}
//             error={errors.topic}
//           />
//         </div>

//         {/* 4 C's Selection */}
//         <CheckboxInput
//           options={[
//             "Critical Thinking",
//             "Collaboration",
//             "Creativity",
//             "Communication",
//           ]}
//           selectedOptions={formData.fourCs}
//           onToggle={handleSelectionToggle}
//           error={errors.fourCs}
//         />

//         {/* Difficulty Level & Energy Buttons */}
//         <div className="flex flex-col gap-4 sm:flex-row">
//           {/* Difficulty Level */}
//           <RadioInput
//             name="Difficulty Level"
//             options={["Low", "Medium", "High"]}
//             selectedValue={formData.difficulty}
//             onChange={(e) => {
//               const updatedValue = e.target.value;
//               const updatedData = { ...formData, difficulty: updatedValue };
//               dispatch(setFormData(updatedData));
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 difficulty: validateDifficulty(updatedValue),
//               }));
//             }}
//             error={errors.difficulty}
//           />
//           <RadioInput
//             name="Energy Options"
//             options={["Low", "Medium", "High"]}
//             selectedValue={formData.energy}
//             onChange={(e) => {
//               const updatedValue = e.target.value;
//               const updatedData = { ...formData, energy: updatedValue };
//               dispatch(setFormData(updatedData));
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 energy: validateEnergy(updatedValue),
//               }));
//             }}
//             error={errors.difficulty}
//           />
//         </div>

//         {/* Additional Information Input */}
//         <TextareaInput
//           id="additional"
//           label="Additional Information"
//           value={formData.additional}
//           onChange={(e) => handleChange(e)}
//           maxLength={200}
//           charactersTyped={formData.additional.length}
//           error={errors.additional}
//         />

//         {/* Generate Button */}
//         <div className="flex gap-4">
//           <button onClick={clearForm}>
//             <CircleX className="h-8 w-8" />
//           </button>
//           <button
//             className={`bg-blue-700 p-3 flex items-center justify-center w-full text-white rounded-xl hover:bg-blue-500 ${
//               disableGenerate ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={disableGenerate || isLoading}
//           >
//             {isLoading ? (
//               <div className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//             ) : (
//               "Generate"
//             )}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };
// export default Form;
