/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.on('issues.opened', async context => { 
    const { body } = context.payload.issue;

    const comment = context.issue({
      body: body.includes("Thanks for the PR!"),
    });
    return context.github.issues.createComment(comment);
  })
};
