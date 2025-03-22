const createExpoWebpackConfigAsync = require("@expo/webpack-config")

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // Customize the config before returning it.
  // For example, to add support for Ant Design Mobile:
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "@ant-design/react-native": "@ant-design/react-native/lib",
  }

  return config
}

