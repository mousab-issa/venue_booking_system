declare global {
    interface TypeStep  {
        index: number;
        isValid: boolean;
        inputs: {
            [inputId: string]: TypeInput;
        };
    };
}

export {};
