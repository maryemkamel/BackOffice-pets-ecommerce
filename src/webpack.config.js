const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  tailwindcss,
                  autoprefixer,
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
