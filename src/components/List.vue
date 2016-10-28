<template>
    <ul>
        <li v-for="game in games">{{game.title}} <router-link :to="'/'+game.id">查看</router-link></li>
    </ul>
</template>

<script>

    const fetchList = store => store.dispatch('FETCH_LIST')

    export default {
        name: "list",
        computed: {
            games(){
                return this.$store.state.listGames
            }
        },
        beforeMount(){
            fetchList(this.$store)
        },
        preFetch: fetchList,
    }
</script>

<style lang="stylus">
</style>
