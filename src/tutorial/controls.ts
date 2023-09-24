const leftArea = new Path2D()
leftArea.moveTo(200, 0)
leftArea.lineTo(200, 200)
leftArea.lineTo(0, 0)
leftArea.closePath()

const leftArrow = new Path2D('M23.6215 2.54068C24.6762 1.4873 26.1059 0.89563 27.5965 0.89563C29.0871 0.89563 30.5168 1.4873 31.5715 2.54068L52.789 23.7507C53.8437 24.8059 54.4361 26.2369 54.4357 27.7289C54.4356 28.4676 54.2899 29.1991 54.007 29.8816C53.7241 30.564 53.3096 31.1841 52.7871 31.7063C52.2646 32.2286 51.6444 32.6428 50.9618 32.9253C50.2792 33.2079 49.5477 33.3532 48.8089 33.353C48.0702 33.3529 47.3387 33.2072 46.6563 32.9243C45.9738 32.6414 45.3538 32.2269 44.8315 31.7044L27.5965 14.4694L10.3615 31.7044C9.84286 32.2419 9.22237 32.6707 8.53624 32.9658C7.85011 33.261 7.11208 33.4165 6.3652 33.4233C5.61832 33.4302 4.87756 33.2882 4.18614 33.0057C3.49471 32.7232 2.86648 32.3058 2.33809 31.7779C1.80969 31.25 1.39172 30.6222 1.10857 29.931C0.825413 29.2399 0.682743 28.4992 0.688878 27.7523C0.695014 27.0055 0.849831 26.2673 1.1443 25.5809C1.43878 24.8945 1.867 24.2736 2.404 23.7544L23.6215 2.53318V2.54068Z')

export const left = {
  pressed: false,
  arrow: leftArrow,
  area: leftArea,
  draw: (c: CanvasRenderingContext2D) => {
    c.save()
    c.fillStyle = 'rgba(217, 217, 217, 0.2)'
    c.fill(leftArea)
    c.restore()
  }
}

const rightArea = new Path2D()
rightArea.moveTo(0, 200)
rightArea.lineTo(200, 200)
rightArea.lineTo(0, 0)
rightArea.closePath()

const rightArrow = new Path2D('M30.4544 30.9571C29.4173 32.0105 28.0115 32.6022 26.5457 32.6022C25.0799 32.6022 23.674 32.0105 22.6369 30.9571L1.77305 9.74713C0.735892 8.6919 0.15342 7.2609 0.153766 5.76893C0.154111 4.27696 0.737246 2.84624 1.77489 1.7915C2.81253 0.736771 4.21969 0.144424 5.68679 0.144776C7.15389 0.145127 8.56077 0.738147 9.59792 1.79338L26.5457 19.0284L43.4934 1.79338C44.5362 0.768227 45.9331 0.20058 47.3834 0.212696C48.8337 0.224812 50.2213 0.815721 51.2473 1.85815C52.2733 2.90059 52.8557 4.31114 52.869 5.78599C52.8823 7.26085 52.3254 8.68201 51.3183 9.74338L30.4581 30.9609L30.4544 30.9571Z')

export const right = {
  pressed: false,
  arrow: rightArrow,
  area: rightArea,
  draw: (c: CanvasRenderingContext2D) => {
    c.save()
    c.fillStyle = 'rgba(217, 217, 217, 0.2)'
    c.fill(rightArea)
    c.restore()
  }
}
