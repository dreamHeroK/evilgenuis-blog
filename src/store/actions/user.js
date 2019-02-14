import * as types from '../types.js'
import axios from 'axios'
/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: types.LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailue(data) {
  return {
    type: types.REGISTER_FAILURE,
    payload: data
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}

export function getUserInfo(userInfo) {
  return dispatch => {
    axios
      .get('/api/userInfo', {
        params: {
          id: userInfo._id
        }
      })
      .then(res => {
                console.log('res :', res.data)
        if (res.status === 200 && res.data.code === 0) {

          dispatch({ type: 'GET_USERINFO', payload: res.data.data })
        } else {
          // dispatch(listFailure(res.data.msg));
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
