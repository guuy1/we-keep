README.md

<h3>WeKeep App</h3>

---

<p > 
This App is developed as part of the requirements for our final project at the software engineering department
- Azrieli College of Engineering, Jerusalem, Israel.
</p>
<p >
Our App is suitable do all smart devices.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The main purpose of the application is to help pepole mange better there house keeping.
<br>
The application enables the user to:
<br>

1. Live scan of products barcode,after getting a match user enter expiration date <br>
2. The app marks products by there expiration date.
   red - expierd yellow - will expierde soon, green - valid products.<br>
   3)Sharing lists as shopping list, to do list and more with all your house.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

To clone and run this repository you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

```
# Clone this repository
git clone https://github.com/guuy1/we-keep.git
# Go into the repository
cd we-keep
# Install dependencies
npm install

```

you'll need to add a config.js to we-keep/src/js path that initilaize your firebase database.

```
# the config.js file should contain only this:
var config = {
    apiKey: "xxxxxx",
    authDomain: "xxxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxx.firebaseio.com",
    projectId: "xxxxxxxx",
    storageBucket: "xxxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxx"
};

firebase.initializeApp(config);
```

```
# Run the app
npm start
```

## 🎈 Usage <a name="usage"></a>

This app was created to help pepole to manage there household in a smarter way.
One member of the home need to sign in with email and password, after this he only need to share
the info with the other members.

## 🚀 Deployment <a name = "deployment"></a>

To get a realse-build of your app you'll need to change the icons on src/icons for win/mac/linux to your app logo, and after that run the following scripts:

```
# Packaging for windows:
npm run package-win
# Packaging for mac:
npm run package-mac
# Packaging for linux:
npm run package-linux
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Firebase](http://firebase.google.com) - Database
- [React](https://reactjs.org/) - Framework for app building
- [NodeJs](https://nodejs.org/en/)
- [git](https://git-scm.com/) - version control system
- [github](https://github.com/) - hosting platform for collaboration and version control

## ✍️ Authors <a name = "authors"></a>

- [Guy Udi](https://github.com/guuy1)
- [Sarai Zarbib](https://github.com/saraize)
