const fs = require('fs')
const os = require('os')
const path = require('path')
const ExifParser = require('exif-parser')

const lists = require('./ignored.json').ignored
const canvasFooter = require('./canvas')
const { redBan, logReset } = require('./consoleColor')
const canvasConfig = require('./canvasConfig')

function mark(folderPath, title) {
  const pattern = /\.(jpg|png|jpeg)$/i
  const configPath = path.join(os.homedir(), 'camMark.config.json')
  let config

  if (fs.existsSync(configPath)) {
    config = fs.readFileSync(configPath).toString()
  } else {
    try {
      fs.writeFileSync(configPath, JSON.stringify(canvasConfig, null, 2))
    } catch (err) {
      console.error(`${redBan}Error${logReset}:`, err);
    }
    config = fs.readFileSync(configPath).toString()
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

          const imageLog = `ISO: ${result.tags.ISO} | F: ${result.tags.FocalLength}`

          const model = [
            result.tags.Model,
            result.tags.LensModel,
            imageLog,
            new Date(result.tags.DateTimeOriginal * 1000).toLocaleDateString() +
              ' | ' +
              title,
          ]

          canvasFooter(path, imgResolution, model)
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
