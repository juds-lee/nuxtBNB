<template>
    <div>[LIST OF HOMES HERE]
    <h2 class="text-xl bold">Add a Home</h2>
    <form class="form" @submit.prevent="onSubmit">
        
        Images:<br/>
      <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>

        Title: <br/>
        <input type='text' v-model="home.title" class="w-60"/><br/>
        Description<br/>
        <textarea v-model="home.description" class="w-104"></textarea><br/>
        Note<br/>
        <textarea v-model="home.note" class="w-104"></textarea><br/>
        Features<br/>
        <input type='text' v-model="home.features[0]" class="w-26"/>
        <input type='text' v-model="home.features[1]" class="w-26"/>
        <input type='text' v-model="home.features[2]" class="w-26"/>
        <input type='text' v-model="home.features[3]" class="w-26"/>
        <input type='text' v-model="home.features[4]" class="w-26"/><br/>
        Price Per Night<br/>
        <input type='number' v-model="home.pricePerNight" class="w-14"/><br/>
        Guests / Rooms / Beds / Baths<br/>
        <input type='number' v-model="home.guests" class="w-14"/>
        <input type='number' v-model="home.bedrooms" class="w-14"/>
        <input type='number' v-model="home.beds" class="w-14"/>
        <input type='number' v-model="home.bathrooms" class="w-14"/><br/>
    
        <input type='text' ref='locationSelector' autocomplete='off' placeholder='Select a location' @changed='changed'/><br/>
        Address: <input type='text' v-model="home.location.address" class="w-60"/><br/>
        City: <input type='text' v-model="home.location.city" class="w-26"/><br/>
        State: <input type='text' v-model="home.location.state" class="w-26"/><br/>
        Postal Code: <input type='text' v-model="home.location.postalCode" class="w-26"/><br/>
        Country: <input type='text' v-model="home.location.country" class="w-26"/><br/>
        <button class="border px-4 py-2 border-gray-400">Add</button>
    </form>
    </div>
    </template>
    <script>
    export default {
        data(){
            return {
                home: {
                    title: '',
                    description: '',
                    note: '',
                    pricePerNight: '',
                    guests: '',
                    bedrooms: '',
                    beds: '',
                    bathrooms: '',
                    features: ['', '', '', '', ''],
                    location: {
                        address: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        country: '',
                    },
                    _geoloc: {
                        lat: '',
                        lng: '',
                    },
                    images: []
                }
            }
        },
        mounted(){
            this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
        },
        methods:{
            imageUpdated(imageUrl,index){
                console.log(imageUrl)
                this.home.images[index] = imageUrl
            },
            changed(event){
                const addressParts = event.detail.address_components
                const street = this.getAddressPart(addressParts, 'street_number')?.short_name || ''
                const route = this.getAddressPart(addressParts, 'route')?.short_name || ''
                this.home.location.address = street + ' ' + route
                this.home.location.city = this.getAddressPart(addressParts, 'locality')?.short_name || ''
                this.home.location.state = this.getAddressPart(addressParts, 'administrative_area_level_1')?.long_name || ''
                this.home.location.country = this.getAddressPart(addressParts, 'country')?.short_name || ''
                this.home.location.postalCode = this.getAddressPart(addressParts, 'postal_code')?.short_name || ''
                const geo = event.detail.geometry.location
                this.home._geoloc.lat = geo.lat()
                this.home._geoloc.lng = geo.lng()
            },
            getAddressPart(parts, type){
                return parts.find(part => part.types.includes(type))
            },
            async onSubmit(){
                await fetch('/api/homes', {
                    method: 'POST',
                    body: JSON.stringify(this.home),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            }
        }
    }
    </script>
    <style scoped>
    .form input,
    .form textarea {
        @apply p-1 m-1 bg-gray-200;
    }
    </style>