import Vue from 'vue'
import Vuex from 'vuex'
import person from './Person'

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
      person: person
    }

});
