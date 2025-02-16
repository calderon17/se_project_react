const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : checkResponse(res);
  });
}

function handleDeleteCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkResponse(res));
}

function addItem(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then((res) => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { getItems, handleDeleteCard, addItem, checkResponse };
