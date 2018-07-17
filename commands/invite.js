const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



message.author.send("MESSAGE");
try{
    await message.author.send();
  }catch(e){
    message.reply("MESSAGE");
   }
   await message.author.send();
 }


module.exports.help ={
name: "invite"
}
