//import { Firebase  } from '@/firebase/init.js' //eslint-disable-line
//import "firebase/storage"
//import Vue from 'vue' //eslint-disable-line

const testCollectionModule = {
  firestorePath: 'tests',
  firestoreRefType: 'collection', // or 'collection' or doc'
  moduleName: 'testCollectionModule',
  statePropName: 'data',
  namespaced: true, // automatically added

  sync: {
    defaultValues: {
      numvalue: 1,
      stringvalue: "stringvalue",
      boolvalue: true,
      nestedvalue: {
        col1: "hi",
        col2: "ho"
      }
    },
  },

  // this object is your store module (will be added as '/testCollectionModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
   
}
  
export default testCollectionModule