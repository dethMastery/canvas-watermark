# cam-mark
This is an watermark generator for a bunch of image with a box of theme that you can fully customize!

## Table of Content
 - [Usage](#usage)
    - [Installation](#installation)
    - [How to use this tool?](#how-to-use-this)
 - [Configuration](#configuration)
    - [Frame Theme name](#frame-theme-name)

---

## Usage

### Installation
For installation you can use 2 ways
  1. Cloning this Repository and use global installation like this
``` zsh
git clone https://github.com/dethMastery/canvas-watermark.git
```
and then
```zsh
cd canvas-watermark
yarn global add .
```
  2. Installing through npmjs
```zsh
yarn global add com-mark
```

### How to use this tool?
Just run like this
```zsh
com-mark <Folder Path> -t <Album Title>
```
And now see the result in 
```
<Folder Path>/marked
```

## Configuration
For configuration part. I used JSON file that can easily help to config this frame. Don't worry if you install this package and don't see config file try to run once or add `camMark.config.json` to your user root folder and add this box of code to your file.

```json
{
  "theme": "frame",
  "colors": {
    "backgroundColor": "#2e2f2f",
    "titleColor": "whitesmoke",
    "modelColor": "whitesmoke",
    "settingColor": "whitesmoke",
    "watermarkColors": {
      "line1": "whitesmoke",
      "line2": "#fe6e6f"
    }
  },
  "fonts": {
    "titleFont": "Sarabun",
    "modelFont": "Sarabun",
    "settingsFont": "Sarabun",
    "waterMarkFonts": {
      "line1": "Sarabun",
      "line2": "Sarabun"
    }
  },
  "watermark": {
    "line1": "dethz",
    "line2": "2018"
  }
}
```

It's okay if you want to change anything but making sure to read theme name in [next section](#frame-theme-name) and some of this reminder :)

 - in colors section must be in `HEX`, `html color format` or `rgba`
 - before changing fonts in fonts section PLEASE install font in your computer first and please making sure that font name is same to which is show in your font family

### Frame Theme name
  <ol>
    <li>
      <code>frame</code>
      <p align="center">
        <img src="./docs/src/frame.jpeg" alt="frame" width="80%" />
      </p>
    </li>
    <li>
      <code>minimal</code>
      <p align="center">
        <img src="./docs/src/minimal.jpeg" alt="minimal" width="80%" />
      </p>
    </li>
    <li>
      <code>detailed</code>
      <p align="center">
        <img src="./docs/src/detailed.jpeg" alt="detailed" width="80%" />
      </p>
    </li>
    <li>
      <code>frame-detailed</code>
      <p align="center">
        <img src="./docs/src/frame-detailed.jpeg" alt="frame-detailed" width="80%" />
      </p>
    </li>
  </ol>

---

<p align="center">
  made with 🤍 by <a href="https://suphakit.net">Suphakit P.</a>
</p>