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
      numValue: 1,
      textValue: "",
      boolValue: false,
      nestedValue: {
        c1Value: "hi",
        c2Value: "ho"
      }
    },
  },

  // this object is your store module (will be added as '/testCollectionModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    getDataArray: (state) => { return Object.values(state.data)}
  },
  mutations: {},
  actions: {}
   
}
  
export default testCollectionModule