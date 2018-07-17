const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



message.author.send("https://discordapp.com/api/oauth2/authorize?client_id=459926606073298945&permissions=8&scope=bot");
try{
    await message.author.send();
  }catch(e){
    message.reply("Alright, i sent the invite to your DM's!");
   }
   await message.author.send();
 }


module.exports.help ={
name: "invite"
}
