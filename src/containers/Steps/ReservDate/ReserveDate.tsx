import React, { useState } from "react";
import validatorjs from "validator";

import { useLocalStorage, useForm } from "../../../hooks";
import { Portlet, Button, TextField } from "../../../components";

import formClasses from "../../../components/Form/Form.module.scss";

let afterTwoDays: string | Date = new Date();
afterTwoDays.setDate(afterTwoDays.getDate() + 1);
afterTwoDays = afterTwoDays.toString();


const step: TypeStep = {
  index: 0,
  isValid: false,
  inputs: {
    checkin: {
      value: "",
      isTouched: false,
      isValid: false,
    },
    checkout: {
      value: "",
      isTouched: false,
      isValid: false,
    },
    adults: {
      value: "1",
      isTouched: false,
      isValid: false,
    },
  },
};

interface TypeReservationStep {
  stepChangeHandler: (
    stepIndex: number,
    formState: TypeFormState,
    targetStep: number
  ) => void;
}

const ReservDate: React.FC<TypeReservationStep> = (
  props: TypeReservationStep
) => {
  const [storedValue, setLocalStorageValue] = useLocalStorage(
    `step-${step.index}`,
    step
  );
  
  const [formState, inputHandler] = useForm(
    storedValue.inputs,
    storedValue.isValid
  );

  const [checkinValidators, setCheckinValidators] = useState<TypeValidator[]>([
    [validatorjs.isDate],
    [validatorjs.isAfter],
  ]);
  const [checkoutValidators, setCheckoutValidators] = useState<TypeValidator[]>(
    [[validatorjs.isDate], [validatorjs.isAfter, afterTwoDays]]
  );

  // const hotelsNames = useSelector((state: TypeAppProps) => state.kulliah.data.names);
  // const hotelsDetails = useSelector((state: TypeAppProps) => state.hotels.data.details);

 

  let maxAdultSize = 5;

  // if (
  //   selectedHotelDetails &&
  //   typeof selectedHotelDetails.max_adult_size !== "undefined"
  // ) {
  //   maxAdultSize = selectedHotelDetails.max_adult_size;
  // }

  return (
    <Portlet>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={formClasses["form__wide-row"]}>
          {/* <Select
            id="hotel"
            label="Choose a hotel"
            options={
              hotels
                ? hotels.names.map((hotel) => ({
                    label: hotel.hotel_name,
                    value: hotel.id,
                  }))
                : []
            }
            onChange={(id: string, value: any, validity: boolean) => {
              inputHandler(id, value, validity);
              // Revalidate related fields
              if (!isChildDisabled) {
                inputHandler("children", "0", true);
              }
              inputHandler("adults", "1", true);
            }}
            value={formState.inputs.hotel.value}
            validity={formState.inputs.hotel.isValid}
            isTouched={formState.inputs.hotel.isTouched}
            validators={[[validatorjs.isLength, { min: 1, max: undefined }]]}
            validationMessage="Please select a hotel"
          /> */}
        </div>
        <div className={formClasses["form__wide-row"]}>
          <TextField
            id="checkin"
            type="date"
            label="Check-in"
            value={formState.inputs.checkin.value}
            validity={formState.inputs.checkin.isValid}
            isTouched={formState.inputs.checkin.isTouched}
            validators={checkinValidators}
            validationMessage="Please select a valid check-in date."
            onChange={(id, value, validity) => {
              inputHandler(id, value, validity);
              setCheckoutValidators([
                [validatorjs.isDate],
                [validatorjs.isAfter, value],
              ]);
            }}
          />
          <TextField
            id="checkout"
            type="date"
            label="Check-out"
            value={formState.inputs.checkout.value}
            validity={formState.inputs.checkout.isValid}
            isTouched={formState.inputs.checkout.isTouched}
            validators={checkoutValidators}
            validationMessage="Please select a valid check-out date."
            onChange={(id, value, validity) => {
              inputHandler(id, value, validity);
              setCheckinValidators([
                [validatorjs.isDate],
                [validatorjs.isAfter],
                [validatorjs.isBefore, value],
              ]);
            }}
          />
          <TextField
            id="adults"
            type="number"
            label="Adults"
            value={formState.inputs.adults.value}
            validity={formState.inputs.adults.isValid}
            isTouched={formState.inputs.adults.isTouched}
            validators={[[validatorjs.isInt, { min: 1, max: maxAdultSize }]]}
            validationMessage={`Please enter a valid number between 1 and ${maxAdultSize}.`}
            onChange={inputHandler}
          />
        </div>
        <div
          className={[
            formClasses["form__normal-row"],
            formClasses["form__actions"],
          ].join(" ")}
        >
          <Button
            type="button"
            onClick={() => {
              if (!formState.isValid) return;
              props.stepChangeHandler(step.index, formState, step.index + 1);
              setLocalStorageValue({
                ...step,
                isValid: formState.isValid,
                inputs: { ...formState.inputs },
              });
            }}
            disabled={!formState.isValid}
          >
            Save and continue
          </Button>
        </div>
      </form>
    </Portlet>
  );
};

export default ReservDate;
