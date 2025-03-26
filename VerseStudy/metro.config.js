const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

// Add any additional configuration here
config.resolver.assetExts.push("png", "jpg", "jpeg", "gif", "svg")

module.exports = config

