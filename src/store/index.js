import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetch'
import CINFIG from '../config.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        indexGames: [],
        listGames: [],
        games:[],
    },

    actions: {
        FETCH_INDEX({commit, state}){
            //已经有数据
            if(state.indexGames.length) return Promise.resolve();

            return fetch(`${CINFIG.prefix}data/index.json`)
                .then(response => response.json())
                .then(games => commit('SET_INDEX_GAMES', {games}))
        },

        FETCH_LIST({commit, state}){

            //已经有数据
            if(state.listGames.length) return Promise.resolve();

            return fetch(`${CINFIG.prefix}data/list.json`)
                .then(response => response.json())
                .then(games => commit('SET_LIST_GAMES', {games}))
        },

        FETCH_SHOW({commit, state}, {id}){

            if(state.games.filter(game => game.id == id).length)
                return Promise.resolve();

            return fetch(`${CINFIG.prefix}data/${id}.json`)
                .then(response => response.json())
                .then(game => commit('SET_GAME', {game}))
        }
    },

    mutations: {
        SET_INDEX_GAMES(state, {games}){
            state.indexGames = games
        },
        SET_LIST_GAMES(state, {games}){
            state.listGames = games
        },
        SET_GAME(state, {game}){
            state.games.push(game)
        }
    }
})
