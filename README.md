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

## Developer documentation

### To add a new Firestore Collection:

read documentation: (https://firebase.google.com/docs/firestore) and (https://mesqueeb.github.io/vuex-easy-firestore/).

#### Create new entry in api/menu.js
```
{
  title: "Test Collection Detail",
  named_route: "TestCollectionDetail"
},
```

#### Create new entries in router/config.js
```
//datastore
{
  path: "/datastore",
  component: DefaultLayout,
  meta: { title: "Datastore"},
  redirect: "/datastore/list",
  children: [
    {
      path: "/datastore/list",
      name: "DatastoreList",
      meta: { title: "Datastore", authRequired: true },
      component: () => import(/* webpackChunkName: "datastore-list" */ "@/views/datastore/DatastoreList.vue")
    },
    {
      path: "/datastore/test",
      name: "TestCollectionDetail",
      meta: { title: "Test Collection", authRequired: true },
      component: () => import(/* webpackChunkName: "test-collection-detail" */ "@/views/datastore/TestCollectionDetail.vue")
    },
  ]
},
```

#### Create new vue-file under /src/views/datastore, i.e: DatastoreTestDetail.vue
```
<template>
  <div id="datastore-test-detail">
    <span>DatastoreTestDetail</span>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
  }
}
</script>
```

#### In /src/store/index.js import a new module for this datastore / document / collection and inject it
```
import testCollectionModule from './testCollectionModule'
// do the magic for vuex-easy-firestore
const easyFirestore = VuexEasyFirestore( 
  [testCollectionModule], // add all modules here as an array-list
  {logging: true, FirebaseDependency: Firebase}
)
// Remember to turn off logging here for production builds
```

#### Add and edit /src/store/testCollectionModule.js
```
const testCollectionModule = {
  firestorePath: 'tests',
  firestoreRefType: 'collection', // or 'collection' or doc'
  moduleName: 'testCollectionModule',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/testCollectionModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}
  
export default testCollectionModule
```

#### Add the collection to /src/frirebase/firestore.rules
```
service cloud.firestore {
  match /databases/{database}/documents {
    function authenticated() { return request.auth.uid != null }
    ...    
    match /tests/{test} {
      allow read: if authenticated();
      allow create, update, delete: if authenticated();
      allow list: if authenticated();
    }
    ...
  }
}
```
