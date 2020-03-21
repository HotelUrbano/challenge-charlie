import { takeLatest, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import openGateApi from '../../../services/openGateApi';
import { LocationDataSucess, LocationDatafailure } from './actions';
import { WeatherDataRequest } from '../weather/actions';

export function* GetLocationDataWithCoords({ payload }) {
    try {
        const { latitude, longitude } = payload.coordinates;
        const response = yield openGateApi.get('/json', {
            params: {
                q: `${latitude} ${longitude}`,
                key: 'c63386b4f77e46de817bdf94f552cddf'
            }
        });
        yield put(LocationDataSucess(response.data));
        yield put(WeatherDataRequest(response.data));
    } catch (err) {
        toast.error('Erro ao Localizar a Região');
        yield put(LocationDatafailure());
    }
}

export default all([
    takeLatest('@location/REQUEST', GetLocationDataWithCoords)
]);
