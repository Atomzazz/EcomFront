import axios from 'axios';

const API = 'https://ecom-eight-brown.vercel.app/api/home-images';

export const getHomeImages = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createHomeImage = async (form, token) => {
  return axios.post(API, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteHomeImage = async (id, token) => {
  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const editHomeImage = async (id, data, token) => {
  return axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleFeaturedImage = async (id, token) => {
  return await axios.patch(`https://ecom-eight-brown.vercel.app/api/home-images/${id}/toggle-featured`, null, {
  headers: { Authorization: `Bearer ${token}` }
})
}