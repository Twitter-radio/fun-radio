import { Component, OnInit } from '@angular/core';
import {Tweet, TweetsMocked} from "../tweet";
import Speech from "speak-tts";

const PLAY_ICON_SRC = "assets/img/play.svg";
const PAUSE_ICON_SRC = "assets/img/pause.svg";

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent implements OnInit {

  speech: Speech;
  tweets: Tweet[];
  isPauseButtonState = true;
  pauseOrResumeButtonText = "pause";
  pauseOrResumeButtonIconSource = PAUSE_ICON_SRC;
  isShownPauseResumeButton = false;

  addVoiceList(voices) {
    const list = window.document.createElement("div");
    let html =
      '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>';
    voices.forEach(voice => {
      html += `<option value="${voice.lang}" data-name="${voice.name}">${
        voice.name
      } (${voice.lang})</option>`;
    });
    list.innerHTML = html;
    window.document.body.appendChild(list);
  }

  play(){
    this.isShownPauseResumeButton = true
    // this._play(this.tweets.toString())
    this._playRecursive(0);
  }

  _playRecursive(i: number){
    if(i == this.tweets.length){
      this.isShownPauseResumeButton = false;
    }
    if(i < this.tweets.length) {
      console.log(this.tweets);
      if (this.tweets[i].isRead) {
        this._playRecursive(i + 1);
      }else {
        console.log("Now playing:" +  i);
        this.speech
          .speak({
            text: `${this.tweets[i].author} said ${this.tweets[i].text}`, //textarea.value,
            queue: false,
            listeners: {
              onstart: () => {
                console.log("Start utterance");
              },
              onend: () => {
                console.log("End utterance");
              },
              onresume: () => {
                console.log("Resume utterance");
              },
              onboundary: event => {
                console.log(
                  event.name +
                  " boundary reached after " +
                  event.elapsedTime +
                  " milliseconds."
                );
              }
            }
          })
          .then(data => {
            this.tweets[i].isRead = true;
            this._playRecursive(i + 1);
            console.log("Success !", data);
          })
          .catch(e => {
            console.error("An error occurred :", e);
          });
      }
    }
  }

  _play(text: string){
    // const language = languages.value;
    // const voice = languages.options[languages.selectedIndex].dataset.name;
    // if (language) speech.setLanguage(languages.value);
    // if (voice) speech.setVoice(voice);
    this.speech
      .speak({
        text: text, //textarea.value,
        queue: false,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: event => {
            console.log(
              event.name +
              " boundary reached after " +
              event.elapsedTime +
              " milliseconds."
            );
          }
        }
      })
      .then(data => {
        console.log("Success !", data);
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }

  pauseOrResume(){
    if(this.isPauseButtonState){
      this.speech.pause();
      this.isPauseButtonState = false;
      this.pauseOrResumeButtonText = "Resume";
      this.pauseOrResumeButtonIconSource = PLAY_ICON_SRC;
    } else{
      this.speech.resume();
      this.isPauseButtonState = true;
      this.pauseOrResumeButtonText = "Pause";
      this.pauseOrResumeButtonIconSource = PAUSE_ICON_SRC;
    }
  }

  pause(){
    this.speech.pause();
  }

  resume(){
    this.speech.resume();
  }

  _init() {
    this.speech = new Speech();
    this.speech
      .init({
        volume: 0.5,
        lang: "en-GB",
        rate: 1,
        pitch: 1,
        //'voice':'Google UK English Male',
        //'splitSentences': false,
        listeners: {
          onvoiceschanged: voices => {
            console.log("Voices changed", voices);
          }
        }
      })
      .then(data => {
        console.log("Speech is ready", data);
        // this.addVoiceList(data.voices);
      })
      .catch(e => {
        console.error("An error occured while initializing : ", e);
      });

    const text = this.speech.hasBrowserSupport()
      ? "Hurray, your browser supports speech synthesis"
      : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
    document.getElementById("support").innerHTML = text;
  }

  ngOnInit() {
    this._init();
  }

  constructor() {
    this.tweets = TweetsMocked;
  }
}
