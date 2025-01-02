export function logout(setUser) {
  localStorage.removeItem('token')
  window.location.reload()
  setUser(null)
}