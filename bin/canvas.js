const { createCanvas, Image } = require('canvas')
const fs = require('fs')

async function canvasFooter(path, reso, model) {
  const sptPath = path.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/marked`
  const fileName = `${path.split('/').pop().split('.')[0]}_marked.jpeg`

  const canvas = createCanvas(reso[0], parseInt(reso[1]) + 450)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2e2f2f'
  ctx.fillRect(0, 0, reso[0], reso[1] + 450)

  var img = new Image()
  img.src = path

  if (canvas.width < canvas.height) {
    var scale = canvas.width / img.height
    var angle = Math.PI / 2
    ctx.save()
    ctx.rotate(angle)
    ctx.rotate(angle)
    ctx.rotate(angle)
    ctx.scale(scale, scale)
    ctx.drawImage(img, -reso[1], 0)
    console.log(reso[0]);
    ctx.restore()
  } else {
    // Draw the image at the desired position
    ctx.drawImage(img, 0, 0)
  }

  const buffer = canvas.toBuffer('image/jpeg')
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  }
}

module.exports = canvasFooter
