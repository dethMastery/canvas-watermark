const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const { greenSuccess, logReset } = require('../consoleColor')

async function canvasMinimal(path, reso, model, config) {
  const sptPath = path.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/marked`
  const fileName = `${path.split('/').pop().split('.')[0]}_marked.jpeg`

  const canvas = createCanvas(parseInt(reso[0]), parseInt(reso[1]))
  const ctx = canvas.getContext('2d')

  var img = new Image()
  img.src = `data:image/jpeg;base64,${fs.readFileSync(path).toString('base64')}`

  ctx.drawImage(img, 0, 0)

  // Title
  const title = model[3]

  ctx.font = `Bold 120px ${config.fonts.titleFont}`
  ctx.fillStyle = config.colors.titleColor
  const pos1 = [
    50,
    canvas.height - 75,
  ]
  const titleWidth = ctx.measureText(title).width

  
  ctx.fillStyle = config.colors.backgroundColor
  ctx.roundRect(0, pos1[1] - 150, titleWidth + 100 , canvas.height, [0, 40]);
  ctx.fill();

  // Watermark
  const wtmText1 = config.watermark.line1
  const wtmText2 = config.watermark.line2

  ctx.font = `Bold 95px ${config.fonts.waterMarkFonts.line1}`
  ctx.fillStyle = config.colors.watermarkColors.line1
  const pos4 = [
    canvas.width - ctx.measureText(wtmText1).width - 50,
    canvas.height - 150,
  ]

  ctx.font = `Bold 120px ${config.fonts.waterMarkFonts.line2}`
  ctx.fillStyle = config.colors.watermarkColors.line2
  const pos5 = [
    canvas.width - ctx.measureText(wtmText2).width - 50,
    canvas.height - 50,
  ]

  ctx.fillStyle = config.colors.backgroundColor
  ctx.roundRect(pos5[0] - 50 , pos4[1] - 125, reso[0], reso[1], [40, 0]);
  ctx.fill();

  ctx.font = `Bold 120px ${config.fonts.titleFont}`
  ctx.fillStyle = config.colors.titleColor
  ctx.fillText(title, pos1[0], pos1[1])

  ctx.font = `Bold 95px ${config.fonts.waterMarkFonts.line1}`
  ctx.fillStyle = config.colors.watermarkColors.line1
  ctx.fillText(wtmText1, pos4[0], pos4[1])

  ctx.font = `Bold 120px ${config.fonts.waterMarkFonts.line2}`
  ctx.fillStyle = config.colors.watermarkColors.line2
  ctx.fillText(wtmText2, pos5[0], pos5[1])

  const buffer = canvas.toBuffer('image/jpeg')
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  }

  console.log(
    `${greenSuccess}Added watermarked to ${fileName} successfully!${logReset}`
  )
}

module.exports = canvasMinimal
