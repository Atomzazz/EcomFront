import axios from "axios";


export const getOrderAdmin = async (token) => {
    return axios.get('https://ecom-eight-brown.vercel.app/api/admin/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeOrderStatus = async (token, orderId, orderStatus) => {
    return axios.put('https://ecom-eight-brown.vercel.app/api/user/order-status', { orderId, orderStatus }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const getListUser = async (token) => {
    return axios.get('https://ecom-eight-brown.vercel.app/api/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const changeStatusUser = async (token, value) => {
    return axios.post('https://ecom-eight-brown.vercel.app/api/change-status', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeRoleUser = async (token, value) => {
    return axios.post('https://ecom-eight-brown.vercel.app/api/change-role', value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}