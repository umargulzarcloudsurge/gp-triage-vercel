import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
const conf: AxiosRequestConfig = {
	baseURL: process.env.TOKEN_URL
}
const HTTP: AxiosInstance = axios.create(conf)

export const getAcessTokenForDataverse = () => {

}