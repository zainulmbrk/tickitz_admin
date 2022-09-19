import axios from 'axios'

//REGISTER
const RegisterRequest = () => {
  return {
    type: 'REGISTER_REQUEST',
  }
}

const RegisterSuccess = (data) => {
  return {
    type: 'REGISTER_SUCCESS',
    payload: data,
  }
}

const RegisterError = (error) => {
  return {
    type: 'REGISTER_ERROR',
    payload: error,
  }
}

export const AuthRegister = (formData) => {
  return (dispatch) => {
    dispatch(RegisterRequest())
    axios({
      method: 'POST',
      url: `https://tickitzz.herokuapp.com/api/v5/auth/register`,
      data: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone_number: formData.phone_number,
      },
    })
      .then((res) => {
        dispatch(RegisterSuccess(res.data.data))
      })
      .catch((err) => {
        dispatch(RegisterError(err.response.data))
      })
  }
}
