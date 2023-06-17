const { auth } = require("express-oauth2-jwt-bearer");

const authConfig = {
  domain: "dev-teymek2ygmid864g.us.auth0.com",
  clientId: "zQGvpn5bmCFr77k5gcmwX3aTFkmdg2az",
  audience: "default",
};

const verifyAuthSetup = () => {
  if (
    !authConfig.domain ||
    !authConfig.audience ||
    authConfig.audience === "capstone-api"
  ) {
    console.log(
      "Exiting: Please make sure that authConfig is populated with valid domain and audience values"
    );

    process.exit();
  } else {
    console.log("AUTH0: Auth0 config verified");
  }
};

const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

module.exports = { checkJwt, authConfig, verifyAuthSetup };
