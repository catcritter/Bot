const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   message.channel.send("@everyone")


    message.delete().catch(O_o=>{});

}

module.exports.help = {
  name: "report"
}
