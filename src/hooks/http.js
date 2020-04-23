import { useCallback, useReducer } from 'react';

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...httpState, isLoading: true, data: null };
    case 'RESPONSE':
      return { ...httpState, isLoading: false, data: action.responseData };
    case 'ERROR':
      return { ...httpState, isLoading: false, error: action.error };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('httpReducer should not use default.');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  const makeRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: 'SEND' });

    let headers = {
      'Content-Type': 'application/json',
    };

    const authToken = sessionStorage.getItem('token');

    if (authToken) {
      headers = { ...headers, Authorization: 'Bearer ' + authToken };
    }

    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({ type: 'RESPONSE', responseData });

        return responseData;
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err });
      });
  }, []);

  return [httpState.isLoading, httpState.error, httpState.data, makeRequest];
};

export default useHttp;
