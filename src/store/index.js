import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        tabsdata:[],
        tabactive:null,
    }
})

export default store