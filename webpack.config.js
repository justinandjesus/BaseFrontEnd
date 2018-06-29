module.exports = {
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
              loader: 'babel-loader',
              options: {
                presets: ["env"]
              }
            }
     }
   ]
  }
};
