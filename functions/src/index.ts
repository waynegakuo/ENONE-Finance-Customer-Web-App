import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const addAdminRole = functions.https.onCall((data, context) => {
    if (context.auth?.token.admin !== true) {
        return { error: 'Only admins can add other admins' }
    }
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            })
        })
        .then(() => {
            return { message: `Success! ${data.email} has been made an admin` }
        })
        .catch(err => {
            return err.message;
        });
});
