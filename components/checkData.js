const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({path: '../.env'})

const aiChatgpt =  (event,callback) => {
    const text = event
    // console.log(text)
    const options = {
        method: 'POST',
        url: 'https://openai80.p.rapidapi.com/chat/completions',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RapidAPI-Key,
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
        data: { "model": "gpt-3.5-turbo", "messages": [{ "role": "user", "content": text }] }
    };

    axios.request(options).then(function async (response) {
        const aimsg = response.data.choices[0].message.content;
        callback(aimsg)
    }).catch(function (error) {
        console.error(error);
    });
}


// const readline = require("readline");
// const express = require("express");
// const app = express()

// const userinterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })


module.exports = { aiChatgpt }
// userinterface.on("line", async input => {
//     const text = input
//     const options = {

//         method: 'POST',
//         url: 'https://openai80.p.rapidapi.com/chat/completions',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': 'ae41b5ea99msh1ecd12bfa2aefeap16b035jsn3d6134450248',
//             'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
//         },
//         data: { "model": "gpt-3.5-turbo", "messages": [{ "role": "user", "content": text }] }
//     };

//     axios.request(options).then(function (response) {
//         const aimsg = response.data.choices[0].message.content;
//         console.log(aimsg)
//     }).catch(function (error) {
//         console.error(error);
//     });
//     userinterface.prompt()
// })


// app.post("/",(req,res) =>{
//     const event = req.body.event
//     console.log(event)
// })

// app.listen('4001',() =>{
//     console.log("app listen port 4001");
// })