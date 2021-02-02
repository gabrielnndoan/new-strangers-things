export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
}

export function login(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function logout() {
  localStorage.removeItem("token");
}
