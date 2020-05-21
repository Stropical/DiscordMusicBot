module.exports = class MediaPlayer {
    
    constructor(){
        console.log("MediaPlayer Loaded");
        this.playing = false;
    }

    start() {
        
    }
    
    play(url, connection) {
        const ytdl = require('ytdl-core');                      //Youtube Download Core
        var currentSongPlaying = connection.play(ytdl(url));
        this.playing = true;
        return currentSongPlaying;
        
    }

    isPlaying() {
        return this.playing;
    }

    setPlaying(val) {
        this.playing = val;
    }
}
