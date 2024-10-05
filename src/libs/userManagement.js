const SERVER_URL = import.meta.env.VITE_SERVER_URL

export async function getUserbyUserName(userName) {
  const response = await fetch(SERVER_URL + `/game`)
  const data = await response.json()
  console.log(data)
  return data
}

// export async function createUser(username) {
//   const response = await fetch(SERVER_URL + `/game`, {
//     method: 'POST',
//   })
// }
