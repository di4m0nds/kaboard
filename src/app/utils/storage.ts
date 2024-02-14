import { STORAGE_PREFIX } from '../configs'

/**
 * Saves data to local storage with a specified key.
 * @param key - The key under which the data will be stored.
 * @param data - The data to be stored.
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    // Serialize the data to a JSON string
    const serializedData = JSON.stringify(data)

    // Save the serialized data to local storage
    if (typeof window !==  'undefined') // check for client side
      window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedData)
  } catch (error) {
    console.error('Error saving to local storage:', error)
  }
}


/**
 * Retrieves data from local storage using a specified key.
 * @param key - The key under which the data is stored.
 * @returns The retrieved data or null if the data does not exist.
 */
export const getFromLocalStorage = <T>(key: string): T[] | null => {
  try {
    // Retrieve the serialized data from local storage
    const serializedData = (typeof window !== 'undefined') // check for client side
      ? window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      : null

    // Return null if no data is found
    if (serializedData === null) return null

    // Parse the serialized data and return the result
    return JSON.parse(serializedData)
  } catch (error) {
    console.error('Error getting from local storage:', error)
    return null
  }
}
