const SERVER_URL = import.meta.env.VITE_SERVER_URL

export async function getUserByUsername(username) {

  let response
  try {
    response = await fetch(SERVER_URL + `/game`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// export async function createUser(username) {
//   const response = await fetch(SERVER_URL + `/game`, {
//     method: 'POST',
//   })
// }



