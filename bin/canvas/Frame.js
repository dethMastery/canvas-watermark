const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const { greenSuccess, logReset } = require('../consoleColor')

async function canvasFrame(path, reso, model, config) {
  const sptPath = path.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/marked`
  const fileName = `${path.split('/').pop().split('.')[0]}_marked.jpeg`

  const canvas = createCanvas(parseInt(reso[0]), parseInt(reso[1]) + 450)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2e2f2f'
  ctx.fillRect(0, 0, reso[0], reso[1] + 450)

  var img = new Image()
  img.src = `data:image/jpeg;base64,${fs.readFileSync(path).toString('base64')}`

  if (canvas.width < canvas.height) {
    ctx.drawImage(img, 0, 0)
  } else {
    // Draw the image at the desired position
    ctx.drawImage(img, 0, 0)
  }

  const pos1 = [50, canvas.height - 325]
  const pos2 = [50, canvas.height - 240]
  const pos3 = [50, canvas.height - 150]

  // Date w/ title
  ctx.font = `80px ${config.fonts.titleFont}`
  ctx.fillStyle = config.colors.titleColor
  ctx.fillText(model[3], pos1[0], pos1[1])

  // Camera Model
  ctx.font = `50px ${config.fonts.modelFont}`
  ctx.fillStyle = config.colors.modelColor
  ctx.fillText(`${model[0]} | ${model[1]}`, pos2[0], pos2[1])

  // Camera Settings
  ctx.font = `50px ${config.fonts.settingFont}`
  ctx.fillStyle = config.colors.settingColor
  ctx.fillText(model[2], pos3[0], pos3[1])

  // Watermark
  const wtmText1 = config.watermark.line1
  const wtmText2 = config.watermark.line2

  ctx.font = `Bold 95px ${config.fonts.waterMarkFonts.line1}`
  ctx.fillStyle = config.colors.watermarkColors.line1
  const pos4 = [
    canvas.width - ctx.measureText(wtmText1).width - 50,
    canvas.height - 190,
  ]
  ctx.fillText(wtmText1, pos4[0], pos4[1])

  ctx.font = `Bold 120px ${config.fonts.waterMarkFonts.line2}`
  ctx.fillStyle = config.colors.watermarkColors.line2
  const pos5 = [
    canvas.width - ctx.measureText(wtmText2).width - 50,
    canvas.height - 75,
  ]
  ctx.fillText(wtmText2, pos5[0], pos5[1])

  const buffer = canvas.toBuffer('image/jpeg')
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  }
  
  console.log(`${greenSuccess}Added watermarked to ${fileName} successfully!${logReset}`);
}

module.exports = canvasFrame
