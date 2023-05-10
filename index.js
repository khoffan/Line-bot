const line = require('@line/bot-sdk');
const express = require('express');
// const bodyparser = require('body-parser');
const app = express()
const dotenv = require('dotenv');
// const { Configuration, OpenAIApi } = require('openai');
// const calc = require('./components/calclulate');
const { aiChatgpt } = require('./components/checkData');
const port = 4000;

dotenv.config()
// const crypto = require("crypto");

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};


// app.get('/', (req, res) => {
//     res.send("Welcome");
// })

const client = new line.Client(config);
// const openai = new OpenAIApi(new Configuration({
//     organization: "org-P7p2yFGSMe5Z2Q8bVYNum4hC",
//     apikey: "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"
// }))

app.post('/callback', line.middleware(config), async (req, res) => {
    try {
        const events = req.body.events;
        // const channelSecret = process.env.CHANNEL_SECRET; // Channel secret string
        // const body = events // Request body string
        // const signature = crypto
        //     .createHmac("SHA256", channelSecret)
        //     .update(body)
        //     .digest("base64");
        // console.log("reply ==>", events)
        // if (events.length > 0) {
        //     await Promise.all(events.map(async (event) => {
        //         console.log("handling event: ", event);
        //         await handleEvent(event);
        //     }));
        // }
        return events.length > 0 ? await events.map(async (item) => await handleEvent(item)) : res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).end();
    }

})

function handleEvent(event) {
    // console.log(event);
    if (event.type !== "message" || event.message.type !== 'text') {
        return null;
    } else if (event.type === 'message') {
        const msg = event.message.text
        const call = (result) => {
            return client.replyMessage(event.replyToken, { type: 'text', text: result });
        }
        aiChatgpt(msg, call)
        // console.log(msg)
        // if(Number(msg)){
        //     const number = calc.calclulated(msg)
        //     return client.replyMessage(event.replyToken, {type:'text',text:number})
        // }
        // else if(msg === 'hello' || msg === 'hi'){
        //     const prom = "hi i\'m Raquiem, bot assistant"
        //     return client.replyMessage(event.replyToken, {type:'text',text:prom})
        // }


        // const msg = event.message.text;
        // const responses = openai.createChatCompletion({
        //     engine: "gpt-3.5-turbo",
        //     prompt: [{ "role": "user", "content": msg }]
        // }).then(res => {
        //     console.log(res.data.choices[0].message.content)
        // })
        // const replytext = responses.choices[0].message.content
        // return client.replyMessage(event.replyToken, { type: "text", text: replytext });
    }
}

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})