const SERVER_URL = import.meta.env.VITE_SERVER_URL
const templateUser = {
  username: '',
  password: '',
  outletName: '',
  userDetail: {
    gold: 500,
    popularity: 0,
    ingredients: [
      {
        id: 1,
        amount: 5
      }
    ],
    recipes: [
      {
        id: 1,
        isUnlock: true
      },
      {
        id: 2,
        isUnlock: true
      },
      {
        id: 3,
        isUnlock: true
      },
      {
        id: 4,
        isUnlock: true
      },
      {
        id: 5,
        isUnlock: true
      },
      {
        id: 6,
        isUnlock: true
      },
      {
        id: 7,
        isUnlock: true
      },
      {
        id: 8,
        isUnlock: true
      },
      {
        id: 9,
        isUnlock: true
      },
      {
        id: 10,
        isUnlock: true
      }
    ],
    currentOrder: {
      customerId: 1,
      foodId: 1,
      specialRequirementId: 1
    },
    fiveStarMenus: [
      {
        foodId: 1,
        isUnlock: false
      },
      {
        foodId: 2,
        isUnlock: false
      },
      {
        foodId: 3,
        isUnlock: false
      },
      {
        foodId: 4,
        isUnlock: false
      },
      {
        foodId: 5,
        isUnlock: false
      },
      {
        foodId: 6,
        isUnlock: false
      },
      {
        foodId: 7,
        isUnlock: false
      },
      {
        foodId: 8,
        isUnlock: false
      },
      {
        foodId: 9,
        isUnlock: false
      },
      {
        foodId: 10,
        isUnlock: false
      }
    ]
  }
}

//Add method - create new user
export async function getUserByUsername(username) {
  try {
    const response = await fetch(SERVER_URL + `/users?username=${username}`)
    const data = await response.json()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error(error)
  }
}

//Post method - Load new user
export async function createUser(username, password) {
  const newUser = { ...templateUser }
  newUser.username = username
  newUser.password = password
  const response = await fetch(SERVER_URL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  const createdUser = await response.json()
  return createdUser
}

export async function validateUsername(username) {
  const user = await getUserByUsername(username)
  return user === null
}

//Delete method - Delete account
export async function deleteUser(username) {
  try {
    const res = await fetch(SERVER_URL + '/users', {
      method: 'DELETE'
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

//Patch method - Edit user data
export async function patchUser(userId, patchData) {
  try {
    const res = await fetch(`${SERVER_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchData)
    })
    const patchedData = await res.json()
    console.log('Patch data', patchData, patchedData)
    return patchedData
  } catch (error) {
    console.log('Error:', error)
  }
}
