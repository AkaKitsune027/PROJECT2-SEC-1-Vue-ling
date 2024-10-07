const SERVER_URL = import.meta.env.VITE_SERVER_URL

const templateUser = {
  username: "",
  password: "",
  outletName: "",
  userDetail: {
    gold: 500,
    popularity: 0,
    ingredients: [
      {
        id: 1,
        amount: 5,
      },
    ],
    currentOrder: {
      customerId: 1,
      foodId: 1,
      specialRequirementId: 1,
    },
    fiveStarMenus: [
      {
        foodId: 1,
        isUnlock: "false",
      },
      {
        foodId: 2,
        isUnlock: "false",
      },
      {
        foodId: 3,
        isUnlock: "false",
      },
      {
        foodId: 4,
        isUnlock: "false",
      },
      {
        foodId: 5,
        isUnlock: "false",
      },
      {
        foodId: 6,
        isUnlock: "false",
      },
      {
        foodId: 7,
        isUnlock: "false",
      },
      {
        foodId: 8,
        isUnlock: "false",
      },
      {
        foodId: 9,
        isUnlock: "false",
      },
      {
        foodId: 10,
        isUnlock: "false",
      },
    ],
  },
}

export async function getUserByUsername(username) {
  let response
  try {
    response = await fetch(SERVER_URL + `/user?username=${username}`)
    const data = await response.json()
    console.log('fetching user by username: ', data)
    return data[0] || null
  } catch (error) {
    console.error(error)
  }
}
export async function createUser(username, password) {
  const newUser = { ...templateUser }
  newUser.username = username
  newUser.password = password
  const response = await fetch(SERVER_URL + `/user?username=${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
  const createdUser = await response.json()
  return createdUser
}

// export async function createUser(username) {
//   const response = await fetch(SERVER_URL + `/game`, {
//     method: 'POST',
//   })
// }

export async function validateUsername(username) {
  const user = await getUserByUsername(username)
  return user === null
}
