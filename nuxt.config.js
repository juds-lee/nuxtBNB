
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxtbnb',
    titleTemplate: 'Mastering Nuxt: %s',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: ['my-style']
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
      // script: [{
      //     src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAW4d6azZgSDMjgrzBsl2yy7pVjWi0rmSc&libraries=places&callback=initMap",
      //     hid: "map",
      //     defer: true,
      //     skip: process.client && window.mapLoaded, 
      //     // skip is a nuxt tag that tells nuxt when to skip rendering a tag
      //     // if truem will not render
      //     // skip if google has already run the code so the script tags don't getrun repeatedly
      // },{
      //     innerHTML: "window.initMap = function(){ window.mapLoaded = true}",
      //     // this function is moved to the head because it has to run after nuxt starts up
      //     //google code is in the head so this function is also now in the head
      //     //this is the callback to check whether or not to render or not the script tag based on if it's been visited
      //     // checking the window object if the dom is loaded --- Can only ru this window object once process.client has a truthy value
      //     // way to know inside our vue app when the external library is ready
      //     //create a variable outside of vue inside the window object since the google library runs outside vue i.e window.mapLoaded = true
      //     hid: "map-init"
      // }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules:[],
   
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/tailwindcss', '~/modules/auth'
  ],


  // Build  Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    // loaders: {
    //     limit: 0,
    // }
},

  router: { 
    prefetchLinks: false,
  },
  
  plugins:[ 
    // { src: '~/plugins/dataApi.js' },
     "~/plugins/map.client", 
     "~/plugins/dataApi",
     '~plugins/auth.client', 
    //  '~plugsin/vCalendar.client'
  ],

  publicRuntimeConfig: {
    auth:{
      cookieName: 'idToken',
      clientId: '118154651831-bc6bh5q427tu74gtq642iimbd1gmsmq7'
    },
    algolia: {
      appId: "ETY5PJ96FC",
      key: "08a81fe77e13588b7a54408321b7b1b8",
    }
  },
 
  privateRuntimeConfig: {
    algolia: {
      appId: "ETY5PJ96FC",
      key: "f9fcb98a7b302aa72cf155e1901ae7fe",
    }
  },
  
}
