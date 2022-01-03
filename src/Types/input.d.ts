declare global {
  type TypeInputOnChange = (id: string, value: any, validity: boolean) => void;

  interface TypeInput {
    isValid: boolean;
    isTouched: boolean;
    value: string;
  }

  interface TypeInputs {
    [fieldName: string]: TypeInput;
  }
}

export {};
