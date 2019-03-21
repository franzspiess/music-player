const initState = {
  query: {
    term: '',
    attribute:''
  },
  result: [],
  currentSong: {}
};

const reducer = (state = initState, action) => {

  console.log(action)

  if (!action.data) return state;

  switch (action.type) {

    case 'FETCH_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state, result: [
          ...state.result,
          ...action.data.results
        ],
        loading: false
      };
      case 'FETCH_ONE_PENDING':
      return {
        ...state,
        loading: true,
      };
      case 'FETCH_ONE_SUCCESS':
      return {
        ...state, currentSong:
          action.data.results
        ,
        loading: false
      };
  case 'QUERY':
    return {
      ...state,
      query: {
        ...state.query,
        ...action.data
      }
    };
    default:
      return state;
  };
};

  export default reducer;