const markdownIt = require("markdown-it");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  
  // 1. Fixes subfolder URL issues for GitHub Pages automatically
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // 2. Ensure CSS is copied to the build folder
  eleventyConfig.addPassthroughCopy("src/css");

  // 3. Configure Markdown rendering
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  const mdRender = markdownIt(options);
  eleventyConfig.setLibrary("md", mdRender);

  // 4. Filter for rich text in front matter: {{ variable | md | safe }}
  eleventyConfig.addFilter("md", function(content) {
    if (!content) return "";
    return mdRender.render(content);
  });

  // 5. Filter for splitting Summary from Experience: {{ content | splitContent(0) | safe }}
  eleventyConfig.addFilter("splitContent", function(content, index) {
    const delimiter = "";
    if (!content) return "";
    const parts = content.split(delimiter);
    return parts[index] ? parts[index] : (index === 0 ? "" : content);
  });

  // 6. Build Configuration
  return {
    // This MUST match your GitHub repository name
    pathPrefix: "/resume/", 
    
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};