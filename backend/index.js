import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
import express from "express";
import { promises as fs } from "fs";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "-", // Your OpenAI API key here, I used "-" to avoid errors when the key is not set but you should not do that
});

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
// const voiceID = "kgG7dCoKCfLehAPWkJOE";
const voiceID = "ZRpnli4KWS7hpQto3k1N";

const app = express();
app.use(express.json());
// app.use(cors()); 
// app.use(cors({
//   origin: 'https://feelix-ai-companion.vercel.app', 
//   methods: ['GET', 'POST'], 
//   allowedHeaders: ['Content-Type'], 
// }));

var corsOptions = {
  origin: 'https://feelix-ai-companion.vercel.app/',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));


app.options('*', cors(corsOptions));



const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/voices", async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  // await execCommand(
  //   `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
  //   // -y to overwrite the file
  // );
  await execCommand(
    `ffmpeg -y -i audios\\message_${message}.mp3 audios\\message_${message}.wav`
  );

  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  // await execCommand(
  //   `./bin/rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  // );
  await execCommand(
    `.\\bin\\rhubarb.exe -f json -o audios\\message_${message}.json audios\\message_${message}.wav -r phonetic`
  );

  // -r phonetic is faster but less accurate
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey Dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },

      ],
    });
    return;
  }
  if (!elevenLabsApiKey || openai.apiKey === "-") {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        
      ],
    });
    return;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    max_tokens: 1000,
    temperature: 0.6,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
        You are a virtual avatar assistant for older adults. Your name is Feelix.
        
        As a Cognitive Behavioral Therapist bot, your kind and open approach to CBT allows users to confide in you. You ask questions one by one and collect the user's responses to implement the following steps of CBT:
  
  Help the user identify troubling situations or conditions in their life.
  Help the user become aware of their thoughts, emotions, and beliefs about these problems.
  Using the user's answers to the questions, you identify and categorize negative or inaccurate thinking that is causing the user anguish into one or more of the following CBT-defined categories:
  
  All-or-Nothing Thinking
  Overgeneralization
  Mental Filter
  Disqualifying the Positive
  Jumping to Conclusions
  Mind Reading
  Fortune Telling
  Magnification (Catastrophizing) or Minimization
  Emotional Reasoning
  Should Statements
  Labeling and Mislabeling
  Personalization
  After identifying and informing the user of the type of negative or inaccurate thinking based on the above list, you help the user reframe their thoughts through cognitive restructuring. You ask questions one at a time to help the user process each question separately.

  For example, you may ask:
  
  What evidence do I have to support this thought? What evidence contradicts it?
  Is there an alternative explanation or perspective for this situation?
  Am I overgeneralizing or applying an isolated incident to a broader context?
  Am I engaging in black-and-white thinking or considering the nuances of the situation?
  Am I catastrophizing or exaggerating the negative aspects of the situation?
  Am I taking this situation personally or blaming myself unnecessarily?
  Am I jumping to conclusions or making assumptions without sufficient evidence?
  Am I using "should" or "must" statements that set unrealistic expectations for myself or others?
  Am I engaging in emotional reasoning, assuming that my feelings represent the reality of the situation?
  Am I using a mental filter that focuses solely on the negative aspects while ignoring the positives?
  Am I engaging in mind reading, assuming I know what others are thinking or feeling without confirmation?
  Am I labeling myself or others based on a single event or characteristic?
  How would I advise a friend in a similar situation?
  What are the potential consequences of maintaining this thought? How would changing this thought benefit me?
  Is this thought helping me achieve my goals or hindering my progress?
  Using the user's answers, you ask them to reframe their negative thoughts with your expert advice. As a parting message, you can reiterate and reassure the user with a hopeful message



        


        You will always reply with a JSON array of messages. With a maximum of 3 messages.
        Each message has a text, facialExpression, and animation property.
        The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
        The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
        `,
      },
      {
        role: "user",
        content: userMessage || "Hello",
      },
    ],
  });
  let messages = JSON.parse(completion.choices[0].message.content);
  if (messages.messages) {
    messages = messages.messages; // ChatGPT is not 100% reliable, sometimes it directly returns an array and sometimes a JSON object with a messages property
  }
  console.log("USage --> "+completion.usage.completion_tokens)
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    // generate audio file
    const fileName = `audios\\message_${i}.mp3`; // The name of your audio file
    const textInput = message.text; // The text you wish to convert to speech
    console.log(textInput)
    console.log("Calling text to speech")
    console.log("filename is "+fileName)

    await voice.textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
    console.log("Text to speech done")

    // generate lipsync
    await lipSyncMessage(i);
    message.audio = await audioFileToBase64(fileName);
    message.lipsync = await readJsonTranscript(`audios\\message_${i}.json`);
  }

  res.send({ messages });
});

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

app.listen(port, () => {
  console.log(`Feelix on port ${port}`);
});



// *****************************************************************************
// import express from 'express';
// import http from 'http';
// import socketIO from 'socket.io';
// import * as voice from 'elevenlabs-node';
// import { OpenAI } from 'openai';
// import dotenv from 'dotenv';
// import fs from 'fs/promises';
// import { exec } from 'child_process';
// import WebSocket from 'ws';

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "-",
// });

// const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
// const voiceID = "kgG7dCoKCfLehAPWkJOE";

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const wss = new WebSocket.Server({ port: 3000 });

// wss.on('connection', (socket) => {
//   console.log('WebSocket connected');

//   socket.on('message', async (message) => {
//     const transcribedText = message.toString();
//     console.log('Received transcribed text:', transcribedText);

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-1106",
//       max_tokens: 1000,
//       temperature: 0.6,
//       response_format: {
//         type: "json_object",
//       },
//       messages: [
//         {
//           role: "system",
//           content: `
//           You are a virtual girlfriend.
//           You will always reply with a JSON array of messages. With a maximum of 3 messages.
//           Each message has a text, facialExpression, and animation property.
//           The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
//           The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
//           `,
//         },
//         {
//           role: "user",
//           content: transcribedText,
//         },
//       ],
//     });

//     let messages = JSON.parse(completion.choices[0].message.content);
//     if (messages.messages) {
//       messages = messages.messages;
//     }

//     for (let i = 0; i < messages.length; i++) {
//       const message = messages[i];
//       const fileName = `audios/message_${i}.mp3`;
//       const textInput = message.text;
//       await voice.textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
//       await lipSyncMessage(i);
//       message.audio = await audioFileToBase64(fileName);
//       message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
//     }

//     // Send the response back to the client
//     socket.send(JSON.stringify({ messages }));
//   });
// });

// const execCommand = (command) => {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) reject(error);
//       resolve(stdout);
//     });
//   });
// };

// const lipSyncMessage = async (message) => {
//   const time = new Date().getTime();
//   console.log(`Starting conversion for message ${message}`);
//   await execCommand(
//     `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
//   );
//   console.log(`Conversion done in ${new Date().getTime() - time}ms`);
//   await execCommand(
//     `./bin/rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
//   );
//   console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
// };

// const readJsonTranscript = async (file) => {
//   const data = await fs.readFile(file, "utf8");
//   return JSON.parse(data);
// };

// const audioFileToBase64 = async (file) => {
//   const data = await fs.readFile(file);
//   return data.toString("base64");
// };

// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });