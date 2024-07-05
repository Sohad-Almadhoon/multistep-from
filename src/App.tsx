import React, { FormEvent, useState } from "react";
import useMultistepForm from "./useMultistepForm";
import AddressForm from "./AddressForm";
import AccountForm from "./AccountForm";
import UserForm from "./UserForm";

const App = () => {
  type FormData = {
    firstName: string;
    lastName: string;
    age: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    password: string;
  };

  const INITIAL_DATA: FormData = {
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL_DATA);
  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  };
  const { steps, step, currentStepIndex,goTo, isLastStep, next, isFirstStep, back } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation 😊");
    goTo(0);
    setData(INITIAL_DATA)
  };
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth:"max-content"
      }}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          <button type="submit">{!isLastStep ? "Next" : "Finish"}</button>
        </div>
      </form>
    </div>
  );
};

export default App;
