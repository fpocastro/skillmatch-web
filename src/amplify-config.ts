import { Amplify } from "aws-amplify";

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolClientId: process.env.COGNITO_CLIENT_ID,
        region: process.env.COGNITO_REGION || "us-east-1",
      },
    },
  });
}
