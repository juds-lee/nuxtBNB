import { createHash } from 'crypto'
export default function() {
    const config = this.options.privateRuntimeConfig.cloudinary
    this.nuxt.hook('render: setupMiddleware', (app) => {
        app.use('/api/cloudinary/signature', setSignature)

    //use a middle ware hook to assign a function to the path api cloudinary signature 
    })

    function setSignature(req, res) {
        //use request and repsonse arugments
        try{
            const sha1 = createHash('sha1')
            // using nodes built in crypto library allowing us to create all types of hashes
            //passing createhash function with strongs sha1
            const payload = []
            //helps sort and stre parameter requests in the body

            Object.keys(req.body).forEach(key => {
                payload.push(`${key}=${req.body[key]}`)
            })
            sha1.update(payload.sort().join('&') + config.apiSecret)
            res.end(JSON.stingify({
                signature: sha1.digest('hex')
            }))
        }
        catch(error){
            console.error(error)
        }
    }
}
// privateruntime config is only run server side so it'ssafe from browser accessyarn add @nuxtjs/