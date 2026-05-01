const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

const metroConfig = withNativeWind(config, { input: "./global.css" });

metroConfig.resolver = metroConfig.resolver || {};
metroConfig.resolver.extraNodeModules = Object.assign(
  {},
  metroConfig.resolver.extraNodeModules,
  {
    "react-native-css-interop": path.resolve(
      __dirname,
      "shims/react-native-css-interop",
    ),
  },
);

metroConfig.watchFolders = metroConfig.watchFolders || [];
metroConfig.watchFolders.push(path.resolve(__dirname, "shims"));

module.exports = metroConfig;
