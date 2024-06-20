export function getToken() {
  const loggedUserData = localStorage.getItem('logged_user')
  if (!loggedUserData) return null
  const loggedUser = JSON.parse(loggedUserData)
  return loggedUser.token
}
