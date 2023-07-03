const line = require('@line/bot-sdk');
const express = require('express');
const app = express()
const dotenv = require('dotenv');
const { chatGPT } = require('./components/checkData');
const port = 4000;

dotenv.config()
// const crypto = require("crypto");

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};




app.get('/', (req, res) => {
    res.send("Welcome to line my api");
})

const client = new line.Client(config);
app.post('/callback', line.middleware(config), async (req, res) => {
    // try {
    //     const events = req.body.events;
    //     return events.length > 0 ? await events.map(async (item) => await handleEvent(item)) : res.sendStatus(200);
    // } catch (error) {
    //     res.sendStatus(500).end();
    // }
    try {
        const events = req.body.events;
        return events.length > 0 ? await events.map(async (event) => {
            await handleEvent(event);
        }) :

            res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).end();
    }
})

async function handleEvent(event) {
    try {
        if (event.type !== 'message' || event.message.type !== 'text') {
            return null;
        } else if (event.type === 'message') {
            const msggpt = event.message.text;
            const call = async (result, time) => {
                replyToken = event.replyToken; // Use the event's reply token
                await client.replyMessage(replyToken, {type: 'text', text: result})
            };
            await chatGPT(msggpt, call);
            // sendReplies(); // Send the stored replies
        }
    } catch (error) {
        console.log(error);
    }
}
// function sendReplies() {
//     replies.forEach(({ replyToken, replyMessage, time }) => {
//         setTimeout(() => {
//             client.replyMessage(replyToken, replyMessage)
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }, time);
//     });
//     replies.length = 0;
// }
app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})