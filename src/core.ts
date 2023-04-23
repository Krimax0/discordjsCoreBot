import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import {
  GatewayDispatchEvents,
  GatewayIntentBits,
  InteractionType,
  MessageFlags,
  Client, API
} from '@discordjs/core';

const token = '';

// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(token);
const ws = new WebSocketManager({
  token,
  intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
  rest
});

// Pass into API
const api = new API(rest);

// Create a client to emit relevant events.
const client = new Client({ rest, ws });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(
  GatewayDispatchEvents.InteractionCreate,
  async ({ data: interaction, api }) => {
    if (
      interaction.type !== InteractionType.ApplicationCommand ||
      interaction.data.name !== 'ping'
    ) {
      return;
    }
    const guild = await api.guilds.get('755114561555791984');
    const user = await api.users.get('419135385730416640')
    console.log(user.avatar)
    await api.interactions.reply(interaction.id, interaction.token, {
      content: 'Ponddg!',
      flags: MessageFlags.Ephemeral
    });
  }
);

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));

// Start the WebSocket connection.
ws.connect();
