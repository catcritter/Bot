const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



message.author.send("Alright, i sent the invite to your DM's!");
try{
    await message.author.send();
  }catch(e){
    message.reply("https://discordapp.com/api/oauth2/authorize?client_id=459926606073298945&permissions=8&scope=bot");
   }
   await message.author.send();
 }


module.exports.help ={
name: "invite"
}
