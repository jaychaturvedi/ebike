const AWS = require('aws-sdk');
let awsCredentials = {
  region: "us-east-2",
  accessKeyId: "",
  secretAccessKey: ""
};
AWS.config.update(awsCredentials);
function getQuickSightUrl(idToken: any, username: any) {
  console.log('called');
  AWS.config.region = 'us-east-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:80f54e71-a2f9-48c8-9b39-3dde366b9410",
    Logins: {
      'cognito-idp.us-east-2.amazonaws.com/us-east-2_4yqT9fdQs': idToken
    }
  });
  var params = {
    RoleArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
    RoleSessionName: username
  };
  var sts = new AWS.STS({
    apiVersion: '2011-06-15',
    //change1
    "region": "us-east-1"
  });
  sts.assumeRole(params, function (err: any, data: any) {
    if (err) console.log("Assumwe erri :::::::::::::::::: ", err, err.stack); // an error occurred
    else {
      // console.log("data: "+data);
      var params = {
        AwsAccountId: '447347746650',//fixed
        Email: username, //used in creating userpool
        IdentityType: 'IAM', //| QUICKSIGHT, /* required */
        Namespace: 'default',
        UserRole: 'READER', //ADMIN | AUTHOR | READER | RESTRICTED_AUTHOR | RESTRICTED_READER, /* required */
        IamArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
        SessionName: username
      };
      AWS.config.update({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken,
        "region": "us-east-2"
      });
      let quicksight = new AWS.QuickSight({
        apiVersion: '2018-04-01',
        region : "us-east-1"
      });
      quicksight.registerUser(params, function (err: any, data: any) {
        if (err) {
          console.log(JSON.stringify(err));
          if (err.statusCode == 409) {
            quicksight.getDashboardEmbedUrl({
              AwsAccountId: "447347746650",
              DashboardId: "e3cf1a0d-04f4-442b-8276-a359cada2b32",
              IdentityType: "IAM",
              ResetDisabled: true,
              SessionLifetimeInMinutes: 400,
              UndoRedoDisabled: false
            },
              function (err: any, data: any) {
                if (!err) {
                  console.log(Date());
                  console.log(data);
                } else {
                  console.log(err);
                }
              }
            );
          }
          console.log("err register user ::::::::::::::::::", err, err.stack);
        } // an error occurred
        // else {
          quicksight = new AWS.QuickSight({
            apiVersion: '2018-04-01',
            region : "us-east-2"
          });
          console.log("Register User :::::::::::::::: =========================>\n", data);
          quicksight.getDashboardEmbedUrl({
            AwsAccountId: "447347746650",
            DashboardId: "e3cf1a0d-04f4-442b-8276-a359cada2b32",
            IdentityType: "IAM",
            ResetDisabled: true,
            SessionLifetimeInMinutes: 400,
            UndoRedoDisabled: false
          },
            function (err: any, data: any) {
              if (!err) {
                console.log(Date());
                console.log(data);
              } else {
                console.log(err);
              }
            }
          );
        
      });
    }
  });
}

let idToken ="eyJraWQiOiJwY2t2ZFZleEFaQTJyQXdzbU1iYVY4YTk0NU05RHBkSUtOdVNNUWRMVlJzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwYmM5MjRmOS0xMGNmLTQ4ZjEtODJiNS00YTY3MjM2MjU0ZTMiLCJhdWQiOiIzdDBhcGNibWxuMW5zOGdwOTcwajBscWp2ZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImE0ZjQ5YzE0LTRiMDgtNGQwNi1iM2MxLTgyMzU5NmIwZThiMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzMDk0MTI2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl80eXFUOWZkUXMiLCJjb2duaXRvOnVzZXJuYW1lIjoiMGJjOTI0ZjktMTBjZi00OGYxLTgyYjUtNGE2NzIzNjI1NGUzIiwiZXhwIjoxNjAzMTc1NTUzLCJjdXN0b206cm9sZSI6IkFETUlOIiwiaWF0IjoxNjAzMTcxOTUzLCJlbWFpbCI6InNvbnVAemVscC5pbyJ9.Rx_VGI4ilA58glp8FuvO1UY6HbrwRzh75ZExUGre2lVVBm5nhSWevNYSrIAxF0DBS3zUiVAVqcIhDhut2EEd_qzMtMVa77lJ1nqvMiEs4TBKOKhnXbaDP8kw6UL3QpzZ9uO_-76bd8VhvsPAerbuApTpDfwn041z8BoOVmqlQcO9wnoNT4iVzDblD5S6mFJMjBSFOmdtRWwWLUNxv9gZp9W06oiOjiGI2iQmr3NpKsDRc-T_DoXAjq_jqxIEFqZxg9tXz7H8UJHLHvJDHUyBxKIEV5a0QN6ul2zTyL4Xth_D7m0DMJXqOOIFGKN43yTN6Y7PXaUr9KFctpZIpY-M2A"
getQuickSightUrl(idToken, "sonu@zelp.io")


/*
1. user pool  --  application user details
2. identity pool -- quicksight

*/