<template>
    <div v-if="game">
        <p>id: {{game.id}}</p>
        <p>title: {{game.title}}</p>
        <p>description: {{game.description}}</p>
    </div>
</template>

<script>

    const fetchShow = store => store.dispatch('FETCH_SHOW', {id: store.state.route.params.id})

    export default {
        name: "show",
        computed: {

            game(){
                return this.$store.state.games.filter(game => game.id == this.$route.params.id)[0]
            }
        },
        beforeMount(){
            fetchShow(this.$store)
        },
        preFetch: fetchShow
    }
</script>

<style lang="stylus">
</style>
