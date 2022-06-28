const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const userModel=require('./userModel')

const app=express()

const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{}).then(()=>{
  console.log('Databasega ulandi !')
}).catch(err=>{
  console.log(err.message)
})

app.listen(4000,'127.0.0.1',()=>{
  console.log('4000 portga ulandi')
})
///////////////////////////////////////////////



///////////////////////////////////////////////

const TelegramApi = require("node-telegram-bot-api");

const api = "5424238030:AAEDsh3TtZ58r3LtOOg-4zYn9D004IB74ds";
let step = 0;
let a = 0;
let arr = [];
let user={}
const bot = new TelegramApi(api, { polling: true });

// bot.setMyCommands([
//   {command:'/start',description:"Boshlang'ich tanishuv"},

//   {command:'/game',description:'o\'yinni boshlash'},
//   {command:'/place_order',description:'o\'yinni boshlash'}
// ])

bot.on("callback_query", (obj) => {
  a++;
  arr.push(obj.data);
  if (a == 1) {
    return bot.sendMessage(
      obj.message.chat.id,
      "Qaysi universitetda tahsil olasiz ?"
    );
  }
  if(obj.data==='ha'){
    user.name=arr[0]
    user.tel=arr[1] 
    user.location=arr[2]
    user.age=arr[3]
    user.programLang=arr[4]
    user.unversity=arr[5]
    const newObj=JSON.parse(JSON.stringify(user))

    const addTour=async ()=>{
      try{
        console.log('databasega saqlandi')
        await userModel.create(newObj)
      }
       catch(err){
        console.log(err)
       }
    
    
  }
  addTour()
  
  }
  
});

bot.on("message", async (obj) => {
  step = step + 1;

  console.log(step);
  if (step == 1) {
    await bot.sendMessage(obj.chat.id, "Xush kelibsiz !");
    return bot.sendMessage(obj.chat.id, "Ismingiz ?");
  }
  if (step == 2) {
    arr.push(obj.text);
    await bot.sendMessage(obj.chat.id, `Sizning ismingiz ${obj.text}`);
    let option = {
      parse_mode: "Markdown",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [
            { text: "My phone number", request_contact: true },
            { text: "Canel" },
          ],
        ],
      },
    };
    return bot.sendMessage(obj.chat.id, `Telefon nomeriz ?`, option);
  }
  if (step == 3) {
    // console.log(obj)
    arr.push(obj.contact.phone_number);
    let option = {
      parse_mode: "Markdown",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [{ text: "My location", request_location: true }, { text: "Canel" }],
        ],
      },
    };
    return bot.sendMessage(obj.chat.id, `Sizning lokatsiyangiz ?`, option);
  }
  if (step == 4) {
    // console.log(obj)
    arr.push(obj.location);
    return bot.sendMessage(obj.chat.id, "Yoshingiz ?");
  }
  if (step == 5) {
    // console.log(obj)
    arr.push(obj.text);
    let Options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "Java", callback_data: "Java" },
            { text: "C#", callback_data: "C#" },
            { text: "C++", callback_data: "C++" },
          ],
          [
            { text: "Python", callback_data: "Python" },
            { text: "Node JS", callback_data: "Node JS" },
            { text: "PHP", callback_data: "PHP" },
          ],
          [
            { text: "C", callback_data: "C" },
            { text: "JavaScript", callback_data: "JavaScript" },
            { text: "How To", callback_data: "How To" },
          ],
        ],
      }),
    };
    return bot.sendMessage(
      obj.chat.id,
      "Qaysi dasturlash tilini bilasiz",
      Options
    );
  }
  if (step == 6) {
    arr.push(obj.text);
    console.log(arr);
    await bot.sendMessage(
      obj.chat.id,
      `
    Ismi: ${arr[0]},
Tel nomeri: ${arr[1]},
Lokatsiya: lat: ${arr[2].latitude}, long: ${arr[2].longitude},  
Yoshi: ${arr[3]}, 
Dasturlash tili: ${arr[4]}, 
O'qish joyi: ${arr[5]}`
    );
    let Options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "Ha", callback_data: "ha" },
            { text: "Yo'q", callback_data: "yoq" },
          ],
        ],
      }),
    };
    return bot.sendMessage(
      obj.chat.id,
      "Ma'lumotlaringiz to'g'rimi ?",
      Options
    );
  }
   else {
    return;
  }
});

/////////////////////////////////////////////////////////////////

