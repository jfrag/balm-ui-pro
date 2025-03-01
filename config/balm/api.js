const env = require('../env');
const buildIndividual = require('../build/individual');
const buildESModule = require('../build/esm');
const config = require('../build/config');

module.exports = (mix) => {
  if (env.buildDocs) {
    mix.remove(['./dist/rev-manifest.json', './dist/service-worker.js']);
  } else {
    if (mix.env.isProd) {
      buildIndividual(mix);
      buildESModule(mix);

      // For sass entry
      mix.copy(`${config.input.sass}/*.scss`, config.output.dist);

      // createVeturHelper();
    } else {
      mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts');
    }
  }
};
