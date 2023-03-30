export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then((response) => {
      if (response.status === 200){
        return response.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};