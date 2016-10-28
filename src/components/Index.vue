<template>
    <ul>
        <li v-for="game in games">{{game.title}} <router-link :to="'/'+game.id">查看</router-link></li>
    </ul>
</template>

<script>

    const fetchIndex = store => store.dispatch('FETCH_INDEX')

    export default {
        name: "index",
        computed: {
            games(){
                return this.$store.state.indexGames
            }
        },
        beforeMount(){
            fetchIndex(this.$store)
        },
        preFetch: fetchIndex,
    }
</script>

<style lang="stylus">
</style>
