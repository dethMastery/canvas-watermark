const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const { greenSuccess, logReset } = require('../consoleColor')

async function canvasDetailedFrame(path, reso, model, config) {
  const sptPath = path.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/marked`
  const fileName = `${path.split('/').pop().split('.')[0]}_marked.jpeg`

  const canvas = createCanvas(parseInt(reso[0]), parseInt(reso[1]))
  const ctx = canvas.getContext('2d')

  var img = new Image()
  img.src = `data:image/jpeg;base64,${fs.readFileSync(path).toString('base64')}`

  ctx.drawImage(img, 0, 0)

  // Date w/ title
  ctx.font = `100px ${config.fonts.titleFont}`
  ctx.fillStyle = config.colors.titleColor
  const titleText = model[3]
  const titlePos = [
    50,
    150
  ]
  const titleWidth = ctx.measureText(titleText).width

  ctx.fillStyle = config.colors.backgroundColor
  ctx.roundRect(titlePos[0] - 25, titlePos[1] - 125, titleWidth + 50, titlePos[1] + 25, [40, 40]);
  ctx.fill();

  // Camera Model
  ctx.font = `80px ${config.fonts.modelFont}`
  ctx.fillStyle = config.colors.modelColor
  const modelText = `${model[0]} | ${model[1]}`
  const modelWidth = ctx.measureText(modelText).width
  const modelPos = [
    canvas.width - modelWidth - 50,
    canvas.height - 90 - 100
  ]

  ctx.fillStyle = config.colors.backgroundColor
  ctx.roundRect(modelPos[0] - 25, modelPos[1] - 80 - 25, modelWidth + 50, modelPos[1] - 100, [40, 40]);
  ctx.fill();

  // Camera Settings
  ctx.font = `80px ${config.fonts.modelFont}`
  ctx.fillStyle = config.colors.modelColor
  const settingText = model[2]
  const settingPos = [
    canvas.width - ctx.measureText(settingText).width - 50,
    canvas.height - 80
  ]

  // Watermark
  const wtmText = config.watermark.line1 + ' ' + config.watermark.line2

  ctx.font = `Bold 150px ${config.fonts.waterMarkFonts.line1}`
  ctx.fillStyle = config.colors.watermarkColors.line1
  let wtmPos
  let wtmWidth = ctx.measureText(wtmText).width

  if (canvas.width < canvas.height) {
    wtmPos = [
      50,
      canvas.height - 80,
    ]
  } else {
    wtmPos = [
      (canvas.width / 2) - (wtmWidth / 2),
      canvas.height - 80,
    ]
  }

  ctx.fillStyle = config.colors.backgroundColor
  ctx.roundRect(wtmPos[0] - 25, wtmPos[1] - 150 - 25, wtmWidth + 50, wtmPos[1] + 25, [40, 40]);
  ctx.fill();

  // ---

  ctx.font = `100px ${config.fonts.titleFont}`
  ctx.fillStyle = config.colors.titleColor
  ctx.fillText(titleText, titlePos[0], titlePos[1])

  ctx.font = `80px ${config.fonts.modelFont}`
  ctx.fillStyle = config.colors.modelColor
  ctx.fillText(modelText, modelPos[0], modelPos[1])

  ctx.font = `80px ${config.fonts.modelFont}`
  ctx.fillStyle = config.colors.modelColor
  ctx.fillText(settingText, settingPos[0], settingPos[1])

  ctx.font = `Bold 150px ${config.fonts.waterMarkFonts.line1}`
  ctx.fillStyle = config.colors.watermarkColors.line1
  ctx.fillText(wtmText, wtmPos[0], wtmPos[1])

  const buffer = canvas.toBuffer('image/jpeg')
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  } else {
    fs.writeFileSync(`${outPath}/${fileName}`, buffer)
  }

  console.log(`${greenSuccess}Added watermarked to ${fileName} successfully!${logReset}`);
}

module.exports = canvasDetailedFrame
