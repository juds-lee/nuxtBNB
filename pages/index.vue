<template>
 <div>
      <div v-for="home in homes" :key="home.objectID" style="float:left;margin:10px">
        <nuxt-link :to="`/home/${home.objectID}`" prefetch>
          <homecard :home="home"/>
        </nuxt-link>
      </div>
     
  </div>
</template>
<script>
//import homes from "~/data/homes"
// import HomeCard from "~/components/homeCard"

export default {
  head () {
    return {
      title: 'Homepage',
      meta: [
        {
        name: 'description',
        content: 'This is a homepage!',
        hid:'description'
      }]
    }
  },
  async asyncData({$dataApi}){
    return {
      homes: (await $dataApi.getHomes()).json.hits
    }
  }
}
</script>
