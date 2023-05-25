const fs = require('fs')
const os = require('os')
const path = require('path')
const ExifParser = require('exif-parser')

const lists = require('./ignored.json').ignored
const canvasFrame = require('./canvas/Frame')
const { redBan, logReset } = require('./consoleColor')
const canvasConfig = require('./canvasConfig')
const canvasMinimal = require('./canvas/Minimal')

function mark(folderPath, title) {
  const pattern = /\.(jpg|png|jpeg)$/i
  const configPath = path.join(os.homedir(), 'camMark.config.json')
  let config

  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath).toString())
  } else {
    try {
      fs.writeFileSync(configPath, JSON.stringify(canvasConfig, null, 2))
    } catch (err) {
      console.error(`${redBan}Error${logReset}:`, err)
    }

    config = JSON.parse(fs.readFileSync(configPath).toString())
  }

  fs.readdirSync(folderPath).forEach((file) => {
    if (!lists.includes(file)) {
      if (pattern.test(file)) {
        const path = `${folderPath}/${file}`

        try {
          const data = fs.readFileSync(path)
          const parser = ExifParser.create(data)
          const result = parser.parse()

          let imgResolution

          if (result.tags.Orientation == 8) {
            imgResolution = [result.imageSize.height, result.imageSize.width]
          } else {
            imgResolution = [result.imageSize.width, result.imageSize.height]
          }

          const imageLog = `ISO: ${result.tags.ISO} | F: ${result.tags.FNumber}`

          const model = [
            result.tags.Model,
            result.tags.LensModel,
            imageLog,
            new Date(result.tags.DateTimeOriginal * 1000).toLocaleDateString() +
              ' | ' +
              title,
          ]

          switch (config.theme) {
            case 'frame':
              canvasFrame(path, imgResolution, model, config)
              break

            case 'minimal':
              canvasMinimal(path, imgResolution, model, config)
              break

            default:
              canvasFrame(path, imgResolution, model, config)
              break
          }
        } catch (error) {
          console.log(
            `${redBan}Error reading or parsing the image file${logReset}:`,
            error
          )
        }
      }
    }
  })
}

module.exports = mark
