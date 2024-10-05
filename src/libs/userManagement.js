const SERVER_URL = import.meta.env.VITE_SERVER_URL

export async function getUserbyUserName(userN,ame) {
  const response = await fetch(SERVER_URL + `/game`)
  const data = await response.json()
  console.log(data)
  return data
}

// export async function transferAndDeleteStatus(statusId, newStatusId) {
//   const response = await fetchWithAuth(
//     SERVER_URL + `/v2/statuses/${statusId}/${newStatusId}`,
//     {
//       method: 'DELETE'
//     }
//   )
//   const data = await response.json()
//   console.log(data)
//   return data
// }