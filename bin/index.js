const fs = require('fs')
const ExifParser = require('exif-parser')

const lists = require('./ignored.json').ignored
const canvasFooter = require('./canvas')
const { redBan, logReset } = require('./consoleColor')

function mark(folderPath, title) {
  const pattern = /\.(jpg|png|jpeg)$/i
  const configPath = '~/.camMark.config.json'
  let config

  fs.existsSync(configPath, (exist) => {
    if (exist) {

    } else {
      
    }
  })

  console.log(config);

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
            imgResolution = [
              result.imageSize.height,
              result.imageSize.width,
            ]
          } else {
            imgResolution = [
              result.imageSize.width,
              result.imageSize.height,
            ]
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
          console.log(`${redBan}Error reading or parsing the image file${logReset}:`, error,)
        }
      }
    }
  })
}

module.exports = mark
