export const config = {
    signInRedirectURL: "http://localhost:3000",
    signOutRedirectURL: "http://localhost:3000",
    clientID: "2VBaeN7WTwm2NVO64T25wTxQ2tEa",
    baseUrl: "https://api.asgardeo.io/t/esandi",
    scope: ["openid", "profile", "email", "groups", "roles"],
    enablePKCE: true,
    accessTokenType: "JWT"
    // Add this if you need to customize claims
    // serverOrigin: "https://api.asgardeo.io",
    // resourceServerURLs: ["https://api.asgardeo.io/t/esandi/oauth2/userinfo"]
};
