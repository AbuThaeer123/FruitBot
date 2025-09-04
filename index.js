// Tiny Express server to keep Railway awake
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Load environment variables
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Create Discord client
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// Mapping fruit names to role IDs
const fruitRoles = {
    kitsune: '1412448878703415368',
    dragon: '1412448924014346383',
    yeti: '1412448979387682906',
    leo: '1412449024744882349',
    gas: '1412449809981378730',
    buddha: '1412449613574705212',
    portal: '1412449103022915686',
    lightning: '1412449664246218793',
    pain: '1412449744109830206',
    dough: '1412448791805694074',
    flame: '1412831515670216797',
    smoke:'1412828805810094233',
    spin: '1412848495295201412',
    spike: '1412848590921007235',
    spring: '1412849346273083423',
    rubber: '1412848807183388877',
    blade: '1412848662144352287'
};

// Vulcan bot ID
const VULCAN_BOT_ID = '1401949512091828348';

// When bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Listen for messages from Vulcan bot
client.on('messageCreate', async (message) => {
    if (message.author.id !== VULCAN_BOT_ID) return;

    message.embeds.forEach(embed => {
        if (embed.title) checkFruit(embed.title, message);
        if (embed.description) checkFruit(embed.description, message);

        if (embed.fields.length > 0) {
            embed.fields.forEach(field => {
                if (field.name) checkFruit(field.name, message);
                if (field.value) checkFruit(field.value, message);
            });
        }
    });
});

// Check if text contains fruit names and ping roles
function checkFruit(text, message) {
    const lowerText = text.toLowerCase();

    for (const fruit in fruitRoles) {
        if (lowerText.includes(fruit.toLowerCase())) {
            const roleId = fruitRoles[fruit];
            message.channel.send(`<@&${roleId}>`);
        }
    }
}

// Login using token from environment variable
client.login(process.env.TOKEN);
