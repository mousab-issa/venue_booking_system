import { put } from 'redux-saga/effects';

import { setKulliah, fetchKulliahFailed } from './actions';
import api from '../../lib/helpers/apis';
import { logger, handleCatchedError } from '../../lib/helpers/utils';

export function* getKulliahSaga(): any {
    logger.debug('[saga]', 'getKulliahSaga');

    try {
        const kulliahs = yield api.getKulliah();
        yield put(setKulliah({kulliahs}));
    } catch (error) {
        yield put(handleCatchedError(fetchKulliahFailed)(error));
    }
}
