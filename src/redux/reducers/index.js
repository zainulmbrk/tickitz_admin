import { combineReducers } from 'redux'
import Movies from '../reducers/Movies'
import Auth from '../reducers/Auth'
import Register from '../reducers/Register'
import PostMovies  from '../reducers/PostMovies'
import DeleteMovies  from '../reducers/DeleteMovies'
const rootReducers = combineReducers({
    movies: Movies,
    post: PostMovies,
    delete:DeleteMovies,
    auth:Auth,
    register:Register
})
export default rootReducers