import axios from 'axios'

const API = axios.create({
    baseURL:"e-commerce-kappa-swart.vercel.app/api"
})

export default API;