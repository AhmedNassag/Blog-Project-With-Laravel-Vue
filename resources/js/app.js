/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('global-home', require('./components/GlobalHome.vue').default);
Vue.component('register', require('./components/Register.vue').default);
Vue.component('login', require('./components/Login.vue').default);
//Vue.component('pagination',require('laravel-vue-pagination'));

import Vue from 'vue';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import router from './routes/routes';
import Axios from 'axios';
import Vuex from 'vuex';
import Echo from 'laravel-echo';
Vue.use(Vuex)
const store = new Vuex.Store({
    state:
    {
        userToken: null,
        user: null,
        EditedPost: {},
        notifications: []
    },

    getters:
    {
        isLogged(state)
        {
            return !!state.userToken;
        },
        isAdmin(state)
        {
            if (state.user)
            {
                return state.user.is_admin
            }
            return null
        },
        PostToEdit(state)
        {
            return state.EditedPost
        }
    },
    mutations:
    {
        setUserToken(state, userToken)
        {
            state.userToken = userToken;
            localStorage.setItem('userToken', JSON.stringify(userToken));
            axios.defaults.headers.common.Authorization = `Bearer ${userToken}`
        },
        removeUserToken(state)
        {
            state.userToken = null
            localStorage.removeItem('userToken')
        },
        setUser(state, user)
        {
            state.user = user;
            Echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${userToken}`;
            Echo.private('App.User.'+state.user.id)
                .notification((notification)=>
                {
                    console.log('notify',notification);
                    state.notifications.unshift(notification)
                });
        },
        logout(state)
        {
            state.userToken = null;
            localStorage.removeItem('userToken');
            window.location.pathname = "/"
        },
        EditPost(state, post)
        {
            state.EditedPost = post;
        }
    },
    actions:
    {
        RegisterUser({ commit }, payload)
        {
            axios.post('/api/register', payload)
            .then(res =>
            {
                console.log(res)
                commit('setUserToken', res.data.token)
            })
            .catch(err =>
            {
                console.log(err)
            })
        },
        LoginUser({ commit }, payload)
        {
            axios.post('/api/login', payload)
            .then(res =>
            {
                console.log(res)
                commit('setUserToken', res.data.token)
                axios.get('/api/user')
                .then(res =>
                {
                    console.log(res.data)
                    commit('setUser', res.data.user)
                })
            })
            .catch(err =>
            {
                console.log(err)
            })
        }
    }


})
const app = new Vue({
    el: '#app',
    router,
    store: store
});
