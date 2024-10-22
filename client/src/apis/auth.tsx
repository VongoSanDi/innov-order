import { ApiResponse } from "@/types/index";

interface AuthProvider {
  password?: string,
  signIn(username: string, password: string): Promise<ApiResponse>,
  signOut(): void,
  createUser(username: string, password: string): Promise<ApiResponse>
}

export const authProvider: AuthProvider = {

  async signIn(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
      // const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password: password,
      }),
    });


    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    localStorage.setItem('token', result.data.access_token)
    return result;
  },

  signOut() {
    localStorage.removeItem('token')
  },

  async createUser(username: string, password: string): Promise<ApiResponse> {
    const response = await fetch('/api/users/', {
      // const response = await fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password: password
      })
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message)
    }
    return result
  }
}

