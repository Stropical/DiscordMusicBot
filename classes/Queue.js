module.exports = class Queue {
    constructor(){
        console.log("Queue Loaded");
        this.songLineUp = [];
        this.currentSong = 0;       
        this.queueNumber = 0; 
    }

    startQueue() {
                
    }
    
    shift() {

    }

    getNext() {
        this.currentSong++;
        if(this.currentSong > this.songLineUp.length) {
            this.currentSong = 1;
        }

        return this.songLineUp[this.currentSong];
    }

    

    addToQueue(url) {
        this.queueNumber++;    
        this.songLineUp[this.queueNumber] = url;
    }

};