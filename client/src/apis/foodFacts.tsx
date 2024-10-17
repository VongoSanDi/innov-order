import { FrontendProductData } from "@/types/index";

/**
 * Get user locale from browser
 */
const getLang = () => {
  if (navigator.languages != undefined) {
    return navigator.languages[0].substring(0, 2)
  }
  return navigator.language.substring(0, 2)
}

/**
 * Get
*/
export const getFoodFacts = async (barcode: string): Promise<FrontendProductData> => {

  const lang = getLang()

  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:3000/food-facts/${barcode}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      'Accept-Language': lang.toString()
    }
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  console.log('result', result)
  return result.data;
}
