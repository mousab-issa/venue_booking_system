import { logger } from "../../lib/helpers/utils";
import { SET_KULLIAH, FETCH_KULLIAH_FAILED, FETCH_KULLIAH } from "./actionTypes";

export const setKulliah = (resData: { kulliahs: TypeKulliah[] }) => {
  logger.debug("[actions]", "setKulliah", resData);

  return {
    type: SET_KULLIAH,
    payload: resData,
  };
};

export const getKulliah = () => {
  logger.debug("[actions]", "getKulliah");

  return {
    type: FETCH_KULLIAH,
  };
};

export const fetchKulliahFailed = (error: string) => {
  logger.debug("[actions]", "fetchKulliahFailed");

  return {
    type: FETCH_KULLIAH_FAILED,
    error,
  };
};
