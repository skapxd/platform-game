export const delay = async (milliseconds = 0) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds))
}
