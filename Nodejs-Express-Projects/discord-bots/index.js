const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.on("messageCreate", (message)=>{
    // console.log(message.content)
    if(message.author.bot) return;
    message.reply({
        content: "Hi From Bot",
    });
});

client.on('interactionCreate', (interaction) => {
    // console.log(interaction);
    interaction.reply("Pong!!!");
});

client.login('your-login');