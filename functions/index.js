const functions = require("firebase-functions");
const express= require("express")
const cors = require("cors")
const stripe = require("stripe")('sk_test_51MpBMQSD5vO3r0DjCbNj2dNezGVoEgNCSlpkw9kSrHqIoplc1SbqukRIPkOt8wTGlSgpYoMPpVvqJkIncoVlzG2K00T4DSSzvI')

//API

//-App config
const app =express()
//-Middlewares
app.use(cors({
    allowedHeaders:"*",
    allowedMethods:"*",
    origin:"*"
}))
app.use(express.json())
//-API routes
app.get('/',(request,response)=>response.status(200).send('hello world'))

app.post('/payments/create',async(request,response)=>{
    const total= request.query.total

    console.log('payment Request Recieved BOOM!!! for this amount >>>',total)

    const paymentIntent =await stripe.paymentIntents.create({
        amount:total, //subunits of the currency
        currency:'usd'
        
     })

    //ok-created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
// -Listen commamnd
 exports.api =functions.https.onRequest(app)

 //http://127.0.0.1:5001/clone-46494/us-central1/api