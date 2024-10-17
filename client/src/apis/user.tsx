import { EditProfilDto } from "@/types/api"

export const editProfil = async (payload: any): Promise<EditProfilDto> => {
  const { username, currentPassword, newPassword } = payload
  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:3000/users/${username}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ login: username, currentPassword: currentPassword, newPassword: newPassword })
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}
