import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";

import useLocalStorage from "./useLocalStorage";

// Steps type declaration
declare global {
  interface TypeStepsState {
    steps: {
      [stepIndex: string]: {
        isValid: boolean;
        status: "completed" | "uncompleted";
      };
    };
    currentStep: number;
  }
}

// initial stepper state
const initialState: TypeStepsState = {
  steps: {
    0: {
      isValid: false,
      status: "completed",
    },
    1: {
      isValid: false,
      status: "uncompleted",
    },
    2: {
      isValid: false,
      status: "uncompleted",
    },
  },
  currentStep: 0,
};

// used to update the step
const useReservation = (): {
  stepsState: TypeStepsState;
  stepChangeHandler: (
    stepIndex: number,
    formState: TypeFormState,
    targetStep: number
  ) => void;
} => {
  const [storedValue, setLocalStorageValue] = useLocalStorage(
    "steps",
    initialState
  );
  const [stepsState, setStepsState] = useState<TypeStepsState>(storedValue);

  const updateStepsState = useCallback(
    (newState) => {
      setStepsState(newState);
      setLocalStorageValue(newState);
    },
    [setLocalStorageValue]
  );

  const stepChangeHandler = useCallback(
    (stepIndex: number, formState: TypeFormState, targetStep: number) => {
      const isReset =
        !formState.isValid && !Object.keys(formState.inputs).length;
      let newState = initialState;

      if (!isReset) {
        newState = {
          steps: {
            ...stepsState.steps,
            [stepIndex]: {
              isValid: formState.isValid,
              status: "completed",
            },
          },
          currentStep: targetStep,
        };
      }
      updateStepsState(newState);
    },
    [stepsState.steps, updateStepsState]
  );

  return {
    stepsState,
    stepChangeHandler,
  };
};

export default useReservation;
