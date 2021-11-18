import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_REST_API,
  }),
  options
)

export default client
