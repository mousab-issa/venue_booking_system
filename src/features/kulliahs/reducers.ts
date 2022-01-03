import { FetchingStatus } from "../../lib/enums";
import { logger } from "../../lib/helpers/utils";
import {
  SET_KULLIAH,
  FETCH_KULLIAH_FAILED,
  FETCH_KULLIAH,
} from "./actionTypes";

interface TypeKulliahsReducerAction {
  type: typeof SET_KULLIAH | typeof FETCH_KULLIAH_FAILED | typeof FETCH_KULLIAH;
  payload: {
    kulliah: TypeKulliah[] | undefined;
  };
  error: string | undefined;
}

interface kulliahInitialStateType {
  kulliahs: TypeKulliah[] | [] | undefined;
  status:
    | FetchingStatus.pending
    | FetchingStatus.resolved
    | FetchingStatus.rejected;
  error: string;
}

const kulliahsInitialState: kulliahInitialStateType = {
  kulliahs: [],
  status: FetchingStatus.pending,
  error: "",
};

const kulliahReducer = (
  state: kulliahInitialStateType = kulliahsInitialState,
  action: TypeKulliahsReducerAction
): kulliahInitialStateType => {
  logger.debug("[reducer]", "reducer", "hotelsReducer", action);

  switch (action.type) {
    case SET_KULLIAH:
      return {
        ...state,
        kulliahs: action.payload.kulliah,
        status: FetchingStatus.resolved,
        error: "",
      };

    case FETCH_KULLIAH_FAILED:
      return {
        ...state,
        kulliahs: [],
        status: FetchingStatus.rejected,
        error: action.error || "Some Error Occured",
      };
    default:
      return state;
  }
};

export default kulliahReducer;
