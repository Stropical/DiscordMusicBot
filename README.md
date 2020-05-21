# DiscordMusicBot
This is a discord music bot! Add it to discord and enjoy playing with your friends and listening to high quality music. Install is fairly simple.

## Instalation and Setup
Step 1: Head over to the FFMPEG website(https://ffmpeg.org/download.html) and download that.
Step 2: Add it to your path variables
Step 3: Clone project
Step 4: Head over to Google Dev (https://console.developers.google.com/) and create an API key for Youtube Data V3
Step 4: Head over to Discord's Dev Portal (https://console.developers.google.com/) and create a Bot account. Grab the key.
Step 5: Add it the the config.json file so it looks like this:
```
{
    "discord": {
        "token": "<discord bot key here>"
    },
    "opts": {
        "maxResults": 1,
        "key": "<youtube data key here>"
    }
}
```
Step 6: Launch it!
```
node index.js
```

## Commands
Right now our only commands are 

%play <search term>

## Contributions
Please add to this!
