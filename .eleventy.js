module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css/");

  return {
    pathPrefix: "/hugommarins.github.io/",
    dir: {
      input: "src",
      output: "_site"
    }
  };
};