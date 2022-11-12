"use strict";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const identityPoolId = "ap-south-1:568f3dba-766a-4d0c-ad49-9e1e1e4ad044"; //from identity
const identityProvider =
  "cognito-idp.ap-south-1.amazonaws.com/ap-south-1_gVrL51R2k"; // from poolid
const userPoolId = "ap-south-1_gVrL51R2k";
const clientId = "1gol90ibbic53huc40nd3p6m6q";
const region = "ap-south-1";

const buildErrorPayload = (error) => {
  return {
    statusCode: 500,
    body: JSON.stringify(
      {
        error: error,
      },
      null,
      2
    ),
  };
};

const buildSuccessPayload = (result) => {
  return {
    statusCode: 500,
    body: JSON.stringify(
      {
        credentials: result,
      },
      null,
      2
    ),
  };
};

async function createCredentialsFromToken(idToken: string) {
  const cognito = fromCognitoIdentityPool({
    clientConfig: {
      region,
    },
    identityPoolId,
    logins: {
      [identityProvider]: idToken,
    },
  });

  return cognito();
}

module.exports.open = async (event) => {
  console.log("input event: ", { event });

  try {
    const { username, password } = JSON.parse(event.body);
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId,
    });
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async function (authDetails) {
          const idToken = authDetails.getIdToken().getJwtToken();
          console.log("Id Token generated from user cred", { idToken });

          const result = await createCredentialsFromToken(idToken);
          console.log("aws generated credentials ", { result });
          resolve(buildSuccessPayload(result));
        },
        onFailure: function (error) {
          console.log(
            "failed to authenticate the user ",
            JSON.stringify(error, null, 2)
          );
          reject(buildErrorPayload(error));
        },
      });
    });
  } catch (error) {
    console.log("something went wrong", { error });
    return buildErrorPayload(error);
  }
};
