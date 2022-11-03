const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "orgName",
    projectName: "app-team-2",
    webpackConfigEnv
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
