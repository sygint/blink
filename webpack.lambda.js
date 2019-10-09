const path = require("path");
const webpack = require("webpack"); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /jsdom/,
      path.join(__dirname, "src") // location of your src
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /parse5/,
      /(parser(\/parser_stream|plain_text_conversion_stream)|serializer\/serializer_stream|sax)/
    )
  ]
};
