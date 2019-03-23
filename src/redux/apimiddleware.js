const apiMiddleware = store => next => action => {



  const {api} = action;

  if (!api) return next(action);

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'https://franzspiess.github.io'
  };

  next({
    type: `${action.type}_PENDING`
  })

  const baseURL = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/"

  fetch(`${baseURL}${api.route}`, {
    method: api.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...api.headers
    },
    body: api.body
  })
    .then(response => response.json())
    .then(data => {
      store.dispatch({
        type: `${action.type}_SUCCESS`,
        data
      })
    })
    .catch(error =>
      store.dispatch({
        type: `${action.type}_FAILURE`,
        error: error.message
      })
    );
  return api;
}


export default apiMiddleware;
