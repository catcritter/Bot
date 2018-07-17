const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const token = process.env.token
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("the dead chat.", {type: "WATCHING"});

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  if (command === "roulette") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any coins yet, Chat some more!");
      if (row.points == 0) return message.reply("you don't have any coins!");

      function getArgs() {
      var args = Array.prototype.slice.call(arguments);
      }

      var betAmount = Math.floor(args[0]);
      var availPoints = row.points;

      if (betAmount > 500)
        betAmount = 500;

      if (!isInt(betAmount)){
	       message.reply('enter integers only!'); return;}

      if (betAmount < 0){message.reply('you can not bet negative.'); betAmount = 0; return;}

      if (betAmount > availPoints){message.reply('you can not bet more than you have.');return;}


      if (betAmount < 0){message.reply('you do not have any coins to bet!');betAmount=0;return;}
      var betCall = args[1];

      var random = (Math.floor(Math.random() * 36) + 1)
      if (random == betCall) {
          winAmount = betAmount * 36;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ${random} (same)!! YOU BET ${betAmount} POINTS AND WON ${winAmount} points! Goooood shit!!!`);
      }

        // win on RED
      else if ((isOdd(random) == 1) && (betCall.toUpperCase() === 'RED') && (betCall != 36) && (betCall != 0)) {
        winAmount = betAmount * 2;
        changeAmount = winAmount - betAmount;
        sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: ${random} (red). You bet ${betAmount} and won ${winAmount} points!`);
      }

      // win on BLACK
      else if ((isOdd(random) == 0) && (betCall.toUpperCase() === 'BLACK') && (betCall != 36) && (betCall != 0)) {
        winAmount = betAmount * 2;
        changeAmount = winAmount - betAmount;
        sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: ${random} (black). You bet ${betAmount} and won ${winAmount} points!`);
      }

      // win on ZERO
      else if ((random == 0) && (betCall == 0)) {
          winAmount = betAmount * 36;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Oy Fuck! Result: ${random}. You bet ${betAmount} and won ${winAmount} points!`);
      }

      // win on DOUBLE ZERO
      else if ((random == 36) && (betCall == 36)) {
          winAmount = betAmount * 36;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Damn son! Result: ${random}. You bet ${betAmount} and won ${winAmount} points!`);
      }

      else if ((betCall.toUpperCase() === 'ODD') || (betCall.toUpperCase() === 'EVEN')){
	  message.channel.send('You must call RED or BLACK.');}
        // L O S E R
      else {
        winAmount = 0;
        sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: ${random}. You bet ${betAmount} and lose ${betAmount} points! Oof.`);
      }

    });
    winAmount = 0;
    return;
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.login(token);
