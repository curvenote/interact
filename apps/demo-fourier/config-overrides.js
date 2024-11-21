module.exports = function override(config, env) {
  config.module.rules.push({
    test: /pypi\/.*/,
    type: 'asset/source',
  });

  return config;
};
