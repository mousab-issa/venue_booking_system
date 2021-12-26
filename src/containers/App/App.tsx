import React, { useEffect } from "react";
import { ConnectedProps } from "react-redux";
import withErrorHandler from "../../hocs/withErrorHandler";
import connector from "./connector";

import {
  Header,
  CircularProgress,
  Steps,
  StepsIndicator,
} from "../../components";
// steps
import { useSteps } from "../../hooks";
import ReservDate from "./Steps/ReservDate";

import iconCalendar from "../../lib/media/icons/calendar.svg";
import Venue from "../../lib/media/icons/lecture-class-svgrepo-com.svg";
import reviewReserv from "../../lib/media/icons/survey-svgrepo-com.svg";


type TypeAppReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<any> = (props) => {
  const { stepsState, stepChangeHandler } = useSteps();

  useEffect(() => {}, []);

  const renderStep = () => {
    if (stepsState.currentStep === 0) {
      return <ReservDate stepChangeHandler={stepChangeHandler} />;
    }
    if (stepsState.currentStep === 1) {
      return <h1>Step 2 </h1>;
    }
    if (stepsState.currentStep === 2) {
      return <h1>Step 3 </h1>;
    }
    if (stepsState.currentStep === 3) {
      return <h1>Step 4</h1>;
    }
  };

  return (
    <>
      <Header
        activeStep={stepsState.currentStep}
        stepChangeHandler={stepChangeHandler}
      />
      <main className={"container"}>
        <Steps>
          <StepsIndicator
            imgUrl={iconCalendar}
            title="Venue &amp; Date"
            index={0}
            stepChangeHandler={stepChangeHandler}
          />
          <StepsIndicator
            imgUrl={Venue}
            title="Venue type &amp; View"
            index={1}
            stepChangeHandler={stepChangeHandler}
          />
          <StepsIndicator
            imgUrl={reviewReserv}
            title="Review &amp; Submit"
            index={2}
            stepChangeHandler={stepChangeHandler}
          />
        </Steps>
        {renderStep()}
      </main>
    </>
  );
};

export default withErrorHandler(App);
