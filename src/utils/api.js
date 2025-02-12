const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : checkResponse(res);
  });
}

function handleDeleteCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
  }).then((res) => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { getItems, handleDeleteCard };
