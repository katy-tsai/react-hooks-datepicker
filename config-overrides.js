const version = require('./package.json').version;
const WorkerPlugin = require('worker-plugin');


module.exports = function override(config, env) {
  // Change the JS output file name and path, from 'static/js/[name].[contenthash:8].js' to `static/${buildFileName}.js`
  config.output = {
    ...config.output,
    filename: `${config.output.filename}?v${version}`,
    chunkFilename: `${config.output.chunkFilename}?v${version}`,
  };
    

  config.plugins.push(new WorkerPlugin());
  // Change the CSS output file name and path, from 'static/css/[name].[contenthash:8].css' to `static/${buildFileName}.css`
  config.plugins.map((plugin, i) => {
    if (plugin.options && plugin.options.filename && plugin.options.filename.includes('static/css')) {
      config.plugins[i].options = {
        ...config.plugins[i].options,
        filename: `${config.plugins[i].options.filename}?v${version}`,
        chunkFilename: `${config.plugins[i].options.chunkFilename}?v${version}`,
      }
    }
  });


  console.log('Additional config was applied through config-overrides.js');

  return config;
};