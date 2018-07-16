const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("This is a bot made by @(≧◡≦)Kanna(≧◡≦)#0899")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Server count", bot.guilds.size);


    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
