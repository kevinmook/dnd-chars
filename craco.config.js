const CracoLinariaPlugin = require('craco-linaria');

module.exports = {
  plugins: [
    {
      plugin: CracoLinariaPlugin,
      options: {
        // Linaria options
      },
    },
  ],
  webpack: {
    plugins: [
      // Plugin to show any webpack warnings and prevent tests from running
      function () {
        let errors = []
        this.plugin("done", function (stats) {
          if (stats.compilation.errors.length) {
            // Log each of the warnings
            stats.compilation.errors.forEach(function (error) {
              errors.push(error.message || error)
            })

            // Pretend no assets were generated. This prevents the tests from running, making it clear that there were warnings.
            // throw new Error(errors)
          }
        })
      },
    ],
  },
};
