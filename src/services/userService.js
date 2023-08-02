import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createNewUserService = (data) => {
    console.log('check create', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (inputId) => {

    return axios.delete(`/api/Delete-user?id=${inputId}`)
}
const editUserService = (inputData) => {
    return axios.put('/api/Edit-user', inputData)
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService }
