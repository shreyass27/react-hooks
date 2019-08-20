
import React, { useReducer, useCallback } from 'react';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingIndicator from '../components/UI/LoadingIndicator';

const actionTypes = {
    REQ: 'REQ',
    RES: 'RES',
    ERR: 'ERR',
    CLR: 'CLR'
};
const httpStateReducer = (currentState, action) => {
    switch (action.type) {
        case actionTypes.REQ:
            return {
                ...currentState,
                loading: true,
                error: null,
            };
        case actionTypes.RES:
        case actionTypes.CLR:
            return {
                ...currentState,
                loading: false,
                error: null
            };
        case actionTypes.ERR:
            return {
                ...currentState,
                loading: true,
                error: action.error
            };
        default: return currentState;
    }
}
const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(httpStateReducer, {
        loading: false,
        error: null
    });

    const sendRequest = useCallback(async (request, errorMsg, ...params) => {
        try {
            dispatchHttp({ type: actionTypes.REQ });
            const data = await request(...params);
            dispatchHttp({ type: actionTypes.RES });
            return data;
        } catch (error) {
            dispatchHttp({ type: actionTypes.ERR, error: 'Something went wrong' });
            console.log(errorMsg, error);
        }
    }, [dispatchHttp]);

    const clear = useCallback(() => {
        dispatchHttp({ type: actionTypes.CLR });
    }, [dispatchHttp]);

    return {
        loading: httpState.loading,
        error: httpState.error,
        sendRequest,
        clear,
        loader: httpState.loading && <LoadingIndicator />,
        errorLoader: httpState.error && <ErrorModal onClose={clear}>{httpState.error}</ErrorModal>
    }
}

export default useHttp;