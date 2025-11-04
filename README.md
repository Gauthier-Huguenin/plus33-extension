![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue)
![Status](https://img.shields.io/badge/status-stable-success)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green)
![GitHub Release](https://img.shields.io/github/v/release/2Montmirail/plus33-extension)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue)](https://chromewebstore.google.com/detail/%2B-33/cjkgpjlbkilpockfcadeadljpeclfolg)


# +33# Chrome Extension

A simple Chrome extension to quickly format French phone numbers into multiple formats:

- International: +33XXXXXXXXX
- National (spaces): 0X XX XX XX XX
- National (dots):   0X.XX.XX.XX.XX
- National (dashes): 0X-XX-XX-XX-XX
- National (plain):  0XXXXXXXXX

Paste one or multiple numbers → choose a format → results are automatically copied to your clipboard.

## Features

- Cleans and normalizes French phone numbers
- Detects formats: `0033`, `+33`, `0`, or raw 9-digit numbers
- Multiple output styles
- Multi-line input supported
- Invalid lines reported inline

## Install from Chrome Web Store

You can install the extension directly here:

https://chromewebstore.google.com/detail/%2B-33/cjkgpjlbkilpockfcadeadljpeclfolg


## Installation (Developer Mode)

1. Download the files from this repository
2. Open Chrome and visit: `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

The extension will appear in your Chrome toolbar.

## Motivation

I built this tool to save time when preparing and cleaning French phone numbers.  
If it helps others, happy to share it.

## License

This project is released under **The Unlicense**  
The code is **public domain** — you are free to do absolutely anything with it.
