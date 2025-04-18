const BASE_URL = "http://localhost:3001"; // Replace with your API URL

// Register new user
export const register = ({ email, password, name, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((response) => {
    return response.ok ? response.json() : Promise.reject(response.status);
  });
};

// Login user
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response.status);
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

// Check token validity
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.ok ? response.json() : Promise.reject(response.status);
  });
};

// Get token from local storage
export const getToken = () => {
  return localStorage.getItem("jwt");
};

// Remove token (for logout)
export const removeToken = () => {
  localStorage.removeItem("jwt");
};
