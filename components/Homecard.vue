<template>
    <div>
        <nuxt-img :src="home.images[0]" width="200px" provider="cloudinary"/><br/>
        {{ home.title }}<br/>
        {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br/>
        {{ home.guests }} guests<br/>
        ${{ home.pricePerNight }} / night<br/>
    </div>
    
    </template>
    <script>
     export default {
        props:{
            home: {
                type: Object,
                required: true
            }
        }
    }
    </script>