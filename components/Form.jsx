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
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const maxLength = 200;

  // State for Active Tab
  const [activeTab, setActiveTab] = useState("Lesson");

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

  const clearForm = async (resetForm) => {
    dispatch(clearFormData());
    resetForm();
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    age: Yup.number()
      .required("Age is required.")
      .positive("Age must be a positive number.")
      .max(100, "Enter a valid age."),
    duration: Yup.number()
      .required("Class duration is required.")
      .positive("Duration must be a positive number."),
    curriculum: Yup.string().required("Curriculum is required."),
    topic: Yup.string().required("Topic is required."),
    subject: Yup.string().required("Subject is required."),
    additional: Yup.string().max(
      maxLength,
      `Exceeded max length of ${maxLength} characters.`
    ),
    difficulty: Yup.string().required("Difficulty level is required."),
    energy: Yup.string().required("Energy option is required."),
    fourCs: Yup.array()
      .of(Yup.string())
      .min(1, "At least one 4 C's item must be selected."),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        // Send the form data to the API route
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
        <Form className="flex flex-col justify-between shadow-lg bg-gray-200 w-full h-full rounded-xl p-4 text-black">
          {/* Responsive Select for Mobile */}
          <div className="sm:hidden mb-4">
            <label htmlFor="tabs" className="sr-only">
              Select Tab
            </label>
            <select
              id="tabs"
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <ul className="hidden bg-gray-800 text-sm font-medium text-center text-gray-400 rounded-lg shadow sm:flex divide-gray-700 relative mb-4">
            <div
              className={`absolute h-full w-1/4 bg-gray-600 rounded-lg transition-transform duration-200 ease-in-out transform ${
                activeTab === "Lesson"
                  ? "translate-x-0"
                  : activeTab === "Homework"
                  ? "translate-x-full"
                  : activeTab === "Quiz"
                  ? "translate-x-[200%]"
                  : "translate-x-[300%]"
              }`}
            />
            {["Lesson", "Homework", "Quiz", "Term Planner"].map((tab) => (
              <li className="w-full z-10" key={tab}>
                <button
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`inline-block w-full p-4 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  } border-r border-gray-700 rounded-lg focus:outline-none`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Age and Class Duration Inputs */}
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <TextInput
              label="Age"
              id="age"
              type="number"
              value={values.age}
              onChange={(e) => setFieldValue("age", e.target.value)}
              error={touched.age && errors.age}
              className="flex-1"
            />
            <TextInput
              label="Class Duration"
              id="duration"
              type="number"
              value={values.duration}
              onChange={(e) => setFieldValue("duration", e.target.value)}
              error={touched.duration && errors.duration}
              className="flex-1"
            />
          </div>

          {/* Curriculum Input */}
          <TextInput
            label="Curriculum"
            id="curriculum"
            type="text"
            value={values.curriculum}
            onChange={(e) => setFieldValue("curriculum", e.target.value)}
            error={touched.curriculum && errors.curriculum}
            className={'mb-4'}
          />

          {/* Subject and Topic Inputs */}
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <TextInput
              label="Subject"
              id="subject"
              type="text"
              value={values.subject}
              onChange={(e) => setFieldValue("subject", e.target.value)}
              error={touched.subject && errors.subject}
              className="flex-1"
            />
            <TextInput
              label="Topic"
              id="topic"
              type="text"
              value={values.topic}
              onChange={(e) => setFieldValue("topic", e.target.value)}
              error={touched.topic && errors.topic}
              className="flex-1"
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
            className="mb-4"
          />

          {/* Difficulty Level & Energy Buttons */}
          <div className="flex lg:flex-row flex-col gap-4 ">
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
            className="mb-4"
          />

          {/* Generate Button */}
          <div className="flex gap-4">
            <button type="button" onClick={() => clearForm(resetForm)}>
              <CircleX className="h-8 w-8" />
            </button>
            <button
              type="submit"
              className={`bg-blue-700 p-3 flex items-center justify-center w-full text-white rounded-xl hover:bg-blue-500 ${
                disableGenerate ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={disableGenerate || isLoading}
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
