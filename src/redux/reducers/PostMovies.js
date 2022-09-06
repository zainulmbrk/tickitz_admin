const initialState = {
  loading: false,
  data: {},
  isLogin: false,
}

const Fetch = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'POST_MOVIES_REQUEST':
      return { ...state, loading: true }
    case 'POST_MOVIES_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'POST_MOVIES_SUCCESS':
      return { ...state, loading: false, data: action.payload, isLogin: true }
    default:
      return state
  }
}

export default Fetch
