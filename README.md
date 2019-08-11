# zgm

## Project setup
```
npm install
```

## Configuration

Add a file src/firebase/config.js and enter your cloud firestore setup.

```
export default {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGE_SENDER_ID',
    appId: 'YOUR_APP_ID'
};
```

Add a file file .firebasesrc in the project root and enter your cloud firestore project-id.

```
{
  "projects":{
    "default" : "YOUR_PROJECT_ID"
  }
}
```

### Initial Firebase deployment
```
firebase init
npm run build
firebase deploy
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
firebase deploy
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
