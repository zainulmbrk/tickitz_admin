const initialState = {
  loading: false,
  data: {},
  success: false,
}

const Fetch = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'DELETE_MOVIES_REQUEST':
      return { ...state, loading: true }
    case 'DELETE_MOVIES_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_MOVIES_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    default:
      return state
  }
}

export default Fetch
