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
        isUnlock: false
      },
      {
        id: 2,
        isUnlock: false
      },
      {
        id: 3,
        isUnlock: false
      },
      {
        id: 4,
        isUnlock: true
      },
      {
        id: 5,
        isUnlock: false
      },
      {
        id: 6,
        isUnlock: false
      },
      {
        id: 7,
        isUnlock: false
      },
      {
        id: 8,
        isUnlock: false
      },
      {
        id: 9,
        isUnlock: false
      },
      {
        id: 10,
        isUnlock: false
      }
    ],
    isCurrentOrderCommitted: false,
    currentOrder: {
      customerId: 1,
      foodId: 4,
      specialRequirementId: 14
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

export async function getUserById(id) {
  try {
    const response = await fetch(SERVER_URL + `/users?id=${id}`)
    const data = await response.json()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error(error)
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
export async function deleteUser(id) {
  try {
    const response = await fetch(`${SERVER_URL}/users/${id}`, {
      method: "DELETE",
    })
    
    const deletedUser = await response.json()

    console.log("Deleted user:", deletedUser)
    return deletedUser
  } catch (error) {
    console.log("Error:", error)
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

export async function updateUserDetails(userId, updateData) {
  let oldUserDetail = null
  try {
    const userData = await getUserById(userId)
    oldUserDetail = userData.userDetail
  } catch (error) {
    console.error(error)
  }

  const newUserDetail = {
    ...oldUserDetail,
    ...updateData
  }

  let patchedUser = null
  try {
    patchedUser = await patchUser(userId, { userDetail: newUserDetail })
  } catch (error) {
    console.error(error)
  }
  return patchedUser.userDetail
}

export async function updateUser(userId, updateData) {
  try {
    const res = await fetch(`${SERVER_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
    const updatedData = await res.json()
    return updatedData
  } catch (error) {
    console.log("Error:", error)
  }
}

export async function resetUser(userId) {
  try {
    // ดึงข้อมูล user ปัจจุบันมาก่อน เพื่อเก็บ username และ password
    const user = await getUserById(userId)
    const { username, password } = user

    const resetData = {
      username, // คงค่า username เดิม
      password, // คงค่า password เดิม
      outletName: templateUser.outletName,
      userDetail: templateUser.userDetail
        
    
    }

    // ส่งข้อมูลที่รีเซ็ตไปยังเซิร์ฟเวอร์ด้วยการ PATCH
    const patchedUser = await patchUser(userId, resetData)
    return patchedUser

  } catch (error) {
    console.error("Failed to reset user:", error)
  }
}

