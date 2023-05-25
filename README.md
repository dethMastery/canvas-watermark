# cam-mark
![npm](https://img.shields.io/npm/v/cam-mark?style=for-the-badge) ![NPM](https://img.shields.io/npm/l/cam-mark?style=for-the-badge) 
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FdethMastery%2Fcanvas-watermark&countColor=%23263759)<br />
This is an watermark generator for a bunch of image with a box of theme that you can fully customize!

> This package has got inspiration from [kana2011th/exifmark](https://github.com/kana2011th/exifmark). If you love python, don't forget to check this repository!

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
      <h4>
        Reminder:
      </h4>
      <ul>
        <li>
          This style is really up to your color style <code>But</code> not really flexible for someone 
        </li>
        <li>
          This style <code>Really</code> use all of config in config file and yes please fill it every form! (- w -)
        </li>
      </ul>
    </li>
    </li>
    <br />
    <li>
      <code>minimal</code>
      <p align="center">
        <img src="./docs/src/minimal.jpeg" alt="minimal" width="80%" />
      </p>
      <h4>
        Reminder:
      </h4>
      <ul>
        <li>
          Background of This style <code>Should</code> be in 'rgba' and set 'alpha' below 0.6 (In example picture, Alpha value is 0.4 [ rgba(0, 0, 0, 0.4) ])
        </li>
      </ul>
    </li>
    <br />
    <li>
      <code>detailed</code>
      <p align="center">
        <img src="./docs/src/detailed.jpeg" alt="detailed" width="80%" />
      </p>
      <h4>
        Reminder:
      </h4>
      <ul>
        <li>
          background config doesn't work here :x
        </li>
        <li>
          In Watermark Part, color that used in this part is only color in <pre>watermarkColors -> line1</pre>
        </li>
        <li>
          Don't forgot to check your color before publish all of your pictures :)
        </li>
      </ul>
    </li>
    <br />
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