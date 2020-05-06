## Use a Consistent Coding Style

The idea is that the code is as readable as possible for everyone, not just for those who come from quasar.

The project include a `ESlint` rules and you need any extension (in case of vs code) like [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

---

### Store access

For access to store `getters` or `mutations` you simple use the direct access like;


#### This :heavy_check_mark:

In Javascript
```javascript
//Code...
this.$store.commit('collection/SET_COLLECTION', this.$store.getters['collection/getCollectionModel'])
// More code...
```

In template
```html
 <div class="q-mt-md" v-if="$store.getters['collection/getIsTableContentReady']">
```

---

#### Not this :x:

In Javascript
```javascript
import { mapGetters } from 'vuex'
//...

this.$store.commit('collection/SET_COLLECTION', this.getCollectionModel)
```

```html
<div class="q-mt-md" v-if="getIsTableContentReady">
```

*The code turns out to be a bit longer but instantly you know that "it" comes from the store*

## Methods names

It is healthy that all the methods that are added / modified have descriptive and summarized names *(very difficult to achieve in the short term, but very beneficial in the long term).*

The structure in which these are composed is very important.

#### This :heavy_check_mark:

```javascript
//Components/Views/Layout
methods: {
  getContentCollection(){
    //code...
  }
}
```

```javascript
//Store modules
export default {
  namespaced: true,
  state: {
    collection: {
      item: [],
    },
    isTableContentReady: false
  },
  getters: {
    getCollection (state) {
      return state.collection
    },
    getIsTableContentReady (state) {
      return state.isTableContentReady
    },
  },
  mutations: {
    SET_COLLECTION (state, payload) {
      state.collection = payload
    },
    SET_TABLE_CONTENT_READY (state, value) {
      state.isTableContentReady = value
    }
  }
}
```

#### Not this :x:

```javascript
methods: {
  content(){
    //code...
  }
}

// Or

methods: {
  content:(){
    //code...
  }
}
```

```javascript
//Store modules
export default {
  state: {
    data: {},
    readyT: false
  },
  getters: {
    getData (state) {
      return state.data
    },
    getReadyT (state) {
      return state.readyT
    },
  },
  mutations: {
    setdata (state, data) {
      state.data = data
    },
    setreadyT (state, data) {
      state.readyT = data
    }
  }
}
```

For the `store` i recomend [Vuex conventions
](https://docs.vuestorefront.io/guide/vuex/vuex-conventions.html#mutations)
