# ENONE Finance Customer Web App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Installation pre-requisites

To run this project locally, we need to have Node and NPM installed on our machine. Below are tutorial suggestions on how to install the aforementioned on different Operating Systems

_It's very important to have the latest version of Node installed_

- [Install Node and NPM on Windows](https://youtu.be/X-FPCwZFU_8)
- [Install Node and NPM on Linux](https://youtu.be/K6QiSKy2zoM)
- [Install Node and NPM on Mac](https://youtu.be/rF1ZHmqvm8I)

Find out more about [Node](https://nodejs.org/en/download/)

## Installing Angular CLI

The following command will install angular-cli globally on your machine

    npm install -g @angular/cli

## Cloning this project

If you wish to have this project on your machine, use the following command:

    git clone git@github.com:waynegakuo/ENONE-Finance-Customer-Web-App.git

## Installing Dependencies

After cloning this project to your PC or laptop, open up your terminal of choice ([GitBash](https://git-scm.com/downloads) or the inbuilt Operating System terminal) inside the project and run `npm install` to install all dependencies that come with this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment

If you wish to deploy this application to any platform of your choice (e.g. GCP, AWS, Netlify etc), kindly check their respective documentation by 'Googling' for example "Deploying Angular app on GCP"

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Firebase

This application's backend makes use of Firebase's powerful capabilities such as authentication, simple querying language, fast retrieval of data and analytics.

1. Go to [Firebase](https://firebase.google.com/). If you don't have a Google account, kindly create one.
   _We recommend you creating a Google account that will be specific for this project for easy tracking of your project_

2. Click on `Get Started` to be directed to the Firebase Console. This is where all your projects are listed.

3. To create a project, click on `Add Project`. With the pages that follow create the project name, **enable Google Analytics**, select **Default Account For Firebase** for the "Configure Google Analytics" step and click "Create Project".

4. Click on "Continue" after the project is created. This will take you to your newly created project's Dashboard.

5. ### Adding Firebase to your app

   - On the Dashboard, click on the `</>` icon to get started on adding Firebase to this web application. Give it a nickname of your choice such as 'edge360-app'. Don't tick the checkbox on Firebase Hosting unless you plan on hosting the app on Firebase. Click on "Register App".
   - On the "Add Firebase SDK section", within the `var firebaseConfig ={...}` section, copy the contents inside the curly braces `{}`.
   - Inside your `src` folder of this application, go to the `enviroments` folder, then `environment.prod.ts` file. Paste the contents initially copied from the Firebase SDK section, in the previous step, into the empty `firebaseConfig` object.

6. On the left-hand-side panel, you will see the various tabs which will be vital to your app's performance and storage needs. Listed below are those that are relevant to this project:

   - [Authentication](https://firebase.google.com/docs/auth): All registered users of your app can be viewed here.
   - [Cloud Firestore](https://firebase.google.com/docs/firestore): Data recorded in terms of collections.
   - [Storage](https://firebase.google.com/docs/storage/web/start): Any uploaded documents or images are stored here.
   - [Functions](https://firebase.google.com/docs/functions): Lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests.

7. Click on `Authentication` and select `Get Started`. This will provide you with a page on 'Sign-in Method'. Hover over the "Email/Password" row and click on the pencil-like icon. On the small pop-up that will appear, click on the first toggle button to 'Enable' and click on 'Save'. This will enable the Email/Password sign-in method which is required for this application.
   NB: _Don't click on the 'Email link (passwordless sign-in)' toggle button_

8. Click on `Cloud Firestore` and then click on "Create Database". A pop-up will appear which gives you the option of selecting either having the your data stored in 'production mode' or 'test mode'. For security purposes, select 'Start in production mode' which will lockdown our database by default; no one will be able to read or write to our database unless authorized to do so. Click on 'Next'. Select the 'Cloud Firestore location' of your choice and click 'Enable'.

   - After the database is set up, you will be provided with the view of the Cloud Firestore Dashboard. On the top, select the 'Rules' tab. The displayed playground allows you to edit the database rules to your liking. Below `match /{document=**} {allow read, write: if false;}`, paste the following:

   ```javascript

   match /files/{fileId} {
     allow read, write: if request.auth.uid != null;
   }
   match /loans/{loanId} {
     allow read, write: if request.auth.uid != null;
   }

   match /users/{userId}{
     allow read, write: if isOwner(userId);
   }

    match /clients/{clientId} {
      allow read, write: if true;
   }

   match /lenderProfile/{lenderProfileId}{
     allow read, write: if request.auth.uid !=null;
   }
   match /lenderAccounts/{lenderAccountId}{
     allow read, write: if request.auth.uid !=null;
   }

   match /repayments/{repaymentId}{
     allow read, write: if request.auth.uid !=null;
   }

   // Reusable function to determine document ownership
   // If you're not logged into the correct account you can't read or write the user doc
   function isOwner(userId) {
     return request.auth.uid == userId;
   }

   ```
