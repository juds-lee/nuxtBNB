<template>
<!-- //this page geets apssed an error object thru a prop called error -->
    <div> 
        {{ error.message }} {{ error.statusCode }} 
    </div>
</template>
<script>

export default {
    head () {
        return{
            title: 'SORRY ERRORIN OUT'
        }
    },
    props: {
        error: {
            type: Object,
            required: true,
        }
    }
}
</script>