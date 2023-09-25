interface IProps {
  canvas: HTMLCanvasElement
}

export const a = ({ canvas }: IProps) => {
  const element = document.querySelector('button')
  if (element == null) throw new Error('Button not found')
  // Solicitar pantalla completa al hacer clic en el botón
  element.addEventListener('click', () => {
    if (canvas == null) throw new Error('Canvas context not found')

    if (typeof canvas.requestFullscreen === 'function') {
      canvas.requestFullscreen()
        .catch((error) => { console.error(error) })
    }
  })

  // Ajustar tamaño del canvas al entrar o salir del modo de pantalla completa
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement != null) {
      canvas.width = screen.width
      canvas.height = screen.height
    } else {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  })
}
