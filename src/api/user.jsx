import axios from "axios";


export const createUserCart = async (token, cart) => {
    return axios.post('https://ecom-eight-brown.vercel.app/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}



export const listUserCart = async (token) => {
    return axios.get('https://ecom-eight-brown.vercel.app/api/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const saveAddress = async (token, address) => {
    return axios.post('https://ecom-eight-brown.vercel.app/api/user/address', { address }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const saveOrder = async (token, payLoad) => {
    return axios.post('https://ecom-eight-brown.vercel.app/api/user/order',
        payLoad, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getOrder = async (token,) => {
    return axios.get('https://ecom-eight-brown.vercel.app/api/user/order',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}
