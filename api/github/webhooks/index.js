const { createNodeMiddleware, createProbot } = require("probot");

const app = require("../../../index.js");
//test
module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});