const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const manager = require('../../events/giveawayClient')
const client = require('../../index')

module.exports = new Command({
    name: 'g-resume',
    description: `Resume's A Giveaway In Your Server`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: 'messageid',
            description: `Msg id of the giveaway to be resumed`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const messageid = interaction.options.getString('messageid')

        manager.unpause(messageid).then(() => {
            interaction.followUp({
                embeds:[
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`Giveaway was Resumed Successfully`)
                ]
            });
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }
})