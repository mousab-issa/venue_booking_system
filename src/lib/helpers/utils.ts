import _ from 'lodash';
import validatorjs from 'validator';

class Logger {
    private logs: object[];

    constructor() {
        this.logs = [];
    }

    /**
     * Runs only on development environment
     * @returns {void}
     */
    debug(...args: any[]) {
        if (process.env.NODE_ENV !== 'development') return;

        // Convert arguments to cleaned array
        const newArgs = [...args];

        const filePath = newArgs[0];
        // const fileName = filePath.replace(/^.*[\\/]/, '');
        const fileName = filePath;

        newArgs[0] = '%c' + fileName;
        newArgs.splice(1, 0, 'color: #1c6ef7; font-weight: bold;');

        this.logs.push({
            type: 'DEBUG',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.log(...newArgs);
    }

    /**
     * Runs only on production environment
     * @returns {void}
     */
    silly(...args: any[]) {
        if (process.env.NODE_ENV !== 'production') return;

        // Convert arguments to cleaned array
        const newArgs = [...args];

        const filePath = newArgs[0];
        // const fileName = filePath.replace(/^.*[\\/]/, '');
        const fileName = filePath;

        newArgs[0] = '%c' + fileName;
        newArgs.splice(1, 0, 'color: #1c6ef7; font-weight: bold;');

        this.logs.push({
            type: 'DEBUG',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.log(...newArgs);
    }

    /**
     * Runs anywhere
     * @returns {void}
     */
    error(...args: any[]) {
        // Convert arguments to cleaned array
        const newArgs = [...args];

        newArgs[0] = '%c' + newArgs[0];
        newArgs.splice(1, 0, 'color: red; font-weight: bold;');

        this.logs.push({
            type: 'ERROR',
            date: new Date(Date.now()).toISOString(),
            log: newArgs
        });

        console.error(...newArgs);
    }
}


export const logger = new Logger();

type TypeValidatorPayload = any;
declare global {
    type TypeValidator = [(val: string, ...payload: TypeValidatorPayload[]) => boolean, any?];
}

export const validator = (value: string, validators?: TypeValidator[]) => {
    let isValid = true;

    if (!(typeof validators !== 'undefined' && validators.length)) return isValid;

    const validatorsLen = validators.length;

    for (let i = 0; i < validatorsLen; i += 1) {
        const validatorArr = validators[i];
        let func = validatorArr[0];
        const args = validatorArr.slice(1);

        if (!func || typeof func !== 'function') continue;

        const result = func(value, ...args);
        isValid = isValid && result;
        if (!isValid) break;
    }

    return isValid;
};

export const isValidName = (str: string) => {
    let isValid = true;
    const strArr = str.split(' ');
    const strArrLen = strArr.length;

    if (strArr.length < 2) {
        return false;
    }

    for (let i = 0; i < strArrLen; i += 1) {
        isValid = isValid && validatorjs.isAlpha(strArr[i], 'en-US');
    }

    return isValid;
};





export const getStoredValue = <T>(key: string): T | undefined => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : '';
    } catch (error) {
        console.log('🔥', error);
    }
};

export const clearStoredValues = (): void => {
    localStorage.removeItem('step-0');
    localStorage.removeItem('step-1');
    localStorage.removeItem('step-2');
    localStorage.removeItem('steps');
    localStorage.removeItem('reservationId');
};

export const getTwoDatesDiff = (checkin: string | number, checkout: string | number): number => {
    if (typeof checkin === 'string' && checkin && typeof checkout === 'string' && checkout) {
        const timeDiff = new Date(checkout).getTime() - new Date(checkin).getTime();
        return timeDiff / (1000 * 3600 * 24);
    }
    return 0;
};

export const compareProps = <T>(a: object, b: T, keys: string[]): boolean =>
    _.isMatch(
        // check deep equality
        a, // get properties from a
        _.pick(b, keys) // get properties from b
    );


export const handleCatchedError = (cb: Function) => (e: any) => {
    console.error('🔥 catched error', e);
    if (e instanceof Error) {
        // properly handle Error e
        return cb(e.message);
    } else if (typeof e === 'string' || e instanceof String) {
        // properly handle e or...stop using libraries that throw naked strings
    } else if (typeof e === 'number' || e instanceof Number) {
        // properly handle e or...stop using libraries that throw naked numbers
    } else if (typeof e === 'boolean' || e instanceof Boolean) {
        // properly handle e or...stop using libraries that throw naked booleans
    } else {
        // if we can't figure out what what we are dealing with then
        throw e;
    }
};
