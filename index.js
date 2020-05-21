//IMPORT SECTION
const fs = require('fs')                                //File System
const discord = require('discord.js');                  //Discord API
const ytdl = require('ytdl-core');                      //Youtube Download Core
const search = require('youtube-search');               //Youtube Data API v3
const qLib = require('./classes/Queue.js');             //Queue Library
const mLib = require('./classes/MediaPlayer.js');//MediaPlayer Library


//INIT SECTION
let config = JSON.parse(fs.readFileSync('./config.json', 'utf-8')); //Imports the config

const client = new discord.Client;              //Creates new Discord client
const token = config.discord.token;             //Grabs token from config

const queue = new qLib();
const MediaPlayer = new mLib();

queue.startQueue();
MediaPlayer.start();
 

//BOT SETUP SECTION
client.on('ready', () => {                      //Checks for when bot connects to discord
    console.log('Bot Online');                  //Says 'Bot online' if connected
});

client.on('message', async msg => {                                     //Begins message detection
    if(msg.content.startsWith('%play')) {                               //Check if message starts with '%play'
        if (msg.member.voice.channel) {                                 //Checks if sender is in voice channel
            const connection = await msg.member.voice.channel.join();   //Join Voice Channel
            var input = "";                                             //Create Input Variable
            for(var i = 0; i < msg.content.split(' ').length; i++) {    //For loop finds and separates seach terms
                                                                            //---
                if(i != 0){                                                 //---
                    input += msg.content.split(' ')[i] + " ";               //Adds all of the terms together except for the first one
                }                                                           //This creates a readble search term for youtube's data API
                                                                            //---
                //console.log("Input: " + input);                           //---  Debug Line
                //console.log("I: " + i);                                   //---  Debug Line
            }

            findURLaddQueue(input, connection);
        }   
    }
});          


//LOAD BOT SECTION

client.login(token);

//FUNCTIONS
function findURLaddQueue(searchTerm, connection) {
    search(searchTerm, config.opts, function(err, results) {
        if(err) return console.log(err);
        //console.log("URL: " + results[0].link);
        var currentSongPlaying;
        console.log("Starting song");
        console.log("Media player Playing?: " + MediaPlayer.isPlaying());
        if(!MediaPlayer.isPlaying()) {
            url = results[0].link;
            queue.addToQueue(url);
            console.log("Media Player Ready");
            currentSongPlaying = MediaPlayer.play(url, connection);

            currentSongPlaying.on('finish', () => { 
                console.log("Song Done");
                MediaPlayer.setPlaying(false);
                
                if(queue.getNext() == null) {
                    console.log("No more songs");
                    MediaPlayer.setPlaying(false);
                } else {
                    console.log("Next song: " + queue.getNext());
                    findURLaddQueue(queue.getNext(), connection);
                }
                
            });
        } else {
            url = results[0].link;
            queue.addToQueue(url);
        }
        
        
      });
}