// when rolve image would return image
export const loadImage = async (path: string): Promise<HTMLImageElement> => await new Promise((resolve, reject) => {
  const platformImg = new Image()
  platformImg.src = path

  platformImg.onload = () => { resolve(platformImg) }
  platformImg.onerror = reject
})
