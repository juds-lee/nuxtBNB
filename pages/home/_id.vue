
<template>
    <div class="app-container">
        <PropertyGallery :images="home.images"/>
        <PropertyDetails :home="home"/>
        <PropertyDescription :home="home"/>
        <PropertyMap :home="home"/>
        <PropertyReviews :reviews="reviews"/>
        <PropertyHost :user="user"/>    
       <!-- <script type="application/ld+json" v-html="getSchema"></script> -->
    </div>
    </template>
    <script>
    //import homes from '~/data/homes'
    export default {
        //layout: 'red',
        // head is a nuxt unique option
        // which works through ssr
        // if you setup nuxt to be a non-ssr app, it should work with this
        // but by default, nuxt is intended to be used with SSR
        // because SSR is good for using an SPA and getting crawled by SEO
        head() {
        return {
                title: 'this.home.title',
            }
        },
        // "this" context = instance of vue
        // vue is only loadable on the client/ui
        // SSR happens on the server, where vue doesn't exist yet
        // so using "this" will always fail in SSR

        // data(){
        //     return {
        //         home: {}
        //     }
        // },
        mounted() {
            // const mapOptions = {
            //     zoom: 18, 
            //     center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            //     disableDefaultUI: true,
            //     zoomControl: true
            // }
            // const map = new window.google.maps.Map(this.$refs.map, mapOptions) 
            //  const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
            //  const marker = new window.google.maps.Marker( { position} )
            //  marker.setMap(map)
            this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
        },
        async asyncData({params, $dataApi, error}){
            const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUserByHomeId(params.id)
            ])
           
            const badResponse = responses.find((response) => !response.ok)
            if(badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText })
            // destructuring our context object using params and dataapi
            //const home = homes.find((home) => home.objectID == this.$route.params.id)
        
            return {
                home: responses[0].json, 
                reviews: responses[1].json.hits,
                user: responses[2].json.hits[0],
            }
        },
        methods: {
            // formatDate(dateStr){
            //     const date = new Date(dateStr)
            //     //take the past date and create a new date and assign it to the constant, date 
            //     // using the to locale string method og the datestr method using lenaguage sensitive representatin
            //     // it takes 2 args
            //     // 1: locale which is a combination of language and region
            //     // object tat describes the string returned
            //     return date.toLocaleDateString(undefined, {month: 'long', year: 'numeric'})
            // }
        }
    }
    </script>

<!-- async asyncData({params, $dataApi, error}){
    // destructuring our context object using params and dataapi
    //const home = homes.find((home) => home.objectID == this.$route.params.id)
    const homeResponse = await $dataApi.getHome(params.id)
    if(!homeResponse.ok) return error({ statusCode: homeResponse.status, message: homeResponse.statusText })
    
    const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
    if(!reviewResponse.ok) return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })

    const userResponse = await $dataApi.getUserByHomeId(params.id)
    if(!reviewResponse.ok) return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })
     -->