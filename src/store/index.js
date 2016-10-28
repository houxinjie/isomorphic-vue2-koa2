import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetc'

Vue.ues(Vuex)


export default new Vuex.store({
    state: {
        games: []
    },

    actions: {
        FETCH_INDEX({commit, state}){
            fetch('/data/index.json')
                .then(response => response.json())
                .then(games => commit('SET_GAMES', {games}))
        },

        FETCH_LIST({commit, state}){
            fetch('/data/list.json')
                .then(response => response.json())
                .then(games => commit('SET_GAMES', {games}))
        },

        FETCH_SHOW({commit, state}, {id}){
            fetch(`/data/${id}.json`)
                .then(response => response.json())
                .then(game => commit('SET_GAME', {game}))
        }
    },

    mutations: {
        SET_GAMES(state, {games}){
            state.games = games
        },
        SET_GAME(state, {game}){
            state.games.forEach((g, index)=> {
                if(g.id === game.id){
                    state.games[index] = game
                }
            })
        }
    }
})
