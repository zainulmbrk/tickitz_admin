import axios from 'axios'
// import { useState } from 'react'

//GET
const GetMoviesRequest = () => {
  return {
    type: 'GET_MOVIES_REQUEST',
  }
}

const GetMoviesSuccess = (data) => {
  return {
    type: 'GET_MOVIES_SUCCESS',
    payload: data,
  }
}

const GetMoviesError = (error) => {
  return {
    type: 'GET_MOVIES_ERROR',
    payload: error,
  }
}

//POST
const PostMoviesRequest = () => {
  return {
    type: 'POST_MOVIES_REQUEST',
  }
}

const PostMoviesSuccess = (data) => {
  return {
    type: 'POST_MOVIES_SUCCESS',
    payload: data,
  }
}

const PostMoviesError = (error) => {
  return {
    type: 'POST_MOVIES_ERROR',
    payload: error,
  }
}

//DELETE
const DeleteMoviesRequest = () => {
  return {
    type: 'DELETE_MOVIES_REQUEST',
  }
}

const DeleteMoviesSuccess = (data) => {
  return {
    type: 'DELETE_MOVIES_SUCCESS',
    payload: data,
  }
}

const DeleteMoviesError = (error) => {
  return {
    type: 'DELETE_MOVIES_ERROR',
    payload: error,
  }
}

//GET
export const GetMovies = () => {
  return (dispatch) => {
    dispatch(GetMoviesRequest())
    axios({
      method: 'GET',
      url: `https://tickitzz.herokuapp.com/api/v5/movies`,
    })
      .then((res) => {
        dispatch(GetMoviesSuccess(res.data.data))
        // return res.data.data
      })
      .catch((err) => {
        dispatch(GetMoviesError(err))
      })
  }
}

//POST
export const PostMovies = (
  title,
  genre,
  cover,
  release_date,
  hours,
  minutes,
  director,
  description,
  casts,
  token,
) => {
  return (dispatch) => {
    dispatch(PostMoviesRequest())
    axios({
      method: 'POST',
      url: `https://tickitzz.herokuapp.com/api/v5/movies`,
      data: {
        title: title,
        genre: genre,
        cover: cover,
        release_date: release_date,
        hours: hours,
        minutes: minutes,
        director: director,
        description: description,
        casts: casts,
      },
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        dispatch(PostMoviesSuccess(res.data))
      })
      .catch((err) => {
        dispatch(PostMoviesError(err))
      })
  }
}

//DELETE
// const [refetch, setRefetch] = useState(false)
export const DeleteMovies = (movies_id, token) => {
  return (dispatch) => {
    dispatch(DeleteMoviesRequest())
    axios({
      method: 'DELETE',
      url: `https://tickitzz.herokuapp.com/api/v5/movies/${movies_id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        dispatch(DeleteMoviesSuccess(res.data.message))
        // setRefetch(!refetch)
      })
      .catch((err) => {
        dispatch(DeleteMoviesError(err))
      })
  }
}
