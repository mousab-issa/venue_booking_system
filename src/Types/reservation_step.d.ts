declare global {
  interface TypeReservationStep {
    stepChangeHandler: (
      stepIndex: number,
      formState: TypeFormState,
      targetStep: number
    ) => void;
  }
}

export {};
