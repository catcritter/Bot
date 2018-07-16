const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Natsuki.", {
        file: "https://cdn.discordapp.com/attachments/400273301311717386/460661223915126784/natsuki_fanart_by_lave2217-dc38cvi.jpg"
    })};

module.exports.help = {
name: "BestGirl"
}
