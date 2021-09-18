/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info("the app was loaded!");
  app.on(
    ["pull_request.opened", "pull_request.synchronize"],
    async (context) => {
      app.log.info(context.payload);

      const res = await context.octokit.repos.createDeployment(
        context.repo({
          ref: context.payload.pull_request.head.ref,
          task: "deploy",
          auto_merge: true,
          required_contexts: [],
          payload: {
            schema: "rocks!",
          }, 
          environment: "production",
          description: "deploying for the first time!",
          transient_environment: false,
          production_environment: true,
        })
      );

      const deploymentId = res.data.id;
      await context.octokit.repos.createDeploymentStatus(
        context.repo({
          deployment_id: deploymentId,
          state: "success",
          log_url: "https://example.com",
          description: "Successfully set a deployment status",
          environment_url: "https://example.com",
          auto_inactive: true, 
        })
      );
    }
  );

};
