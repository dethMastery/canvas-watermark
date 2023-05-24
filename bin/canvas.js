const { createCanvas, Image, loadImage } = require('canvas')
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
    ctx.restore()
  } else {
    // Draw the image at the desired position
    ctx.drawImage(img, 0, 0)
  }

  const pos1 = [50, canvas.height - 325]
  const pos2 = [50, canvas.height - 240]
  const pos3 = [50, canvas.height - 115]

  // Date w/ title
  ctx.font = '80px Sarabun'
  ctx.fillStyle = 'whitesmoke'
  ctx.fillText(model[3], pos1[0], pos1[1])

  // Camera Model
  ctx.font = '50px Sarabun'
  ctx.fillStyle = 'whitesmoke'
  ctx.fillText(`${model[0]} | ${model[1]}`, pos2[0], pos2[1])

  // Camera Settings
  ctx.font = '50px Sarabun'
  ctx.fillStyle = 'whitesmoke'
  ctx.fillText(model[2], pos3[0], pos3[1])

  // Watermark
  const wtmText1 = 'dethz'
  const wtmText2 = '2018'

  ctx.font = 'Bold 95px Sarabun'
  ctx.fillStyle = '#fe6e6f'
  const pos4 = [
    canvas.width - ctx.measureText(wtmText1).width - 50,
    canvas.height - 325,
  ]
  ctx.fillText(wtmText1, pos4[0], pos4[1])

  ctx.font = 'Bold 120px Sarabun'
  ctx.fillStyle = 'whitesmoke'
  const pos5 = [
    canvas.width - ctx.measureText(wtmText2).width - 50,
    canvas.height - 220,
  ]
  ctx.fillText(wtmText2, pos5[0], pos5[1])

  const buffer = canvas.toBuffer('image/jpeg')
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  }
}

module.exports = canvasFooter
