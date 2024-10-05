const SERVER_URL = import.meta.env.VITE_SERVER_URL

//GET method - Get specific user
export async function getUserbyUserName(userName) {
  try {
    const response = await fetch(SERVER_URL + `/game`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error:', error)
  }
}

//Post method - Load new user
export async function createUser(newUser) {
  try {
    const response = await fetch(SERVER_URL + `/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error:', error)
  }
}

//Delete method - Delete account 
export async function deleteUser(username) {
  try {
    const res = await fetch(SERVER_URL + `/game`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

//Patch method - Edit user data
export async function patchUser() {
  try {
    const res = await fetch(SERVER_URL + `/game`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Edit successful.'
      }),
    })
    const editedData = await res.json()
    return editedData
  } catch (error) {
    console.log('Error:', error)
  }
}

