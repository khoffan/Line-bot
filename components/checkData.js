const request = require('request');

const chatGPT = (prompts, callback) => {
    const options = {
        method: 'POST',
        url: 'https://chatgpt-open-ai-nlp.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          Type: 'chatgpt4',
          'X-RapidAPI-Key': 'ae41b5ea99msh1ecd12bfa2aefeap16b035jsn3d6134450248',
          'X-RapidAPI-Host': 'chatgpt-open-ai-nlp.p.rapidapi.com'
        },
        body: {
          prompt: prompts,
          temperature: '0.7'
        },
        json: true
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
      
          callback(body);
      });
}

module.exports = chatGPT;