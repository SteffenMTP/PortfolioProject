import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import { Howl } from "howler";
import Stage from "./Stage";
import modal from "./Modal";
import data from "./information.json";
import { Text } from "pixi.js";


export default class Initialize {

  constructor() {

    this.myStage = new Stage();
    this.scene = this.myStage.scene;
    this.background = this.myStage.bg;
    this.sI = this.myStage.stageInfo;

    this.data = data;

    const loader = PIXI.Loader.shared
      .add(this.data.Assets[0])
      .load(() => {

        let playTexture = PIXI.Texture.from(this.data.Assets[0]);
        let play = new PIXI.Sprite(playTexture);
        play.interactive = true;
        play.x = 900;
        play.y = 850;
        play.cursor = "pointer";
        this.scene.addChild(play);

        let bgTexture = PIXI.Texture.from(this.data.Assets[1]);
        let _bg = new Sprite(bgTexture);
        _bg.id = "backgroundImage";
        this.background.addChild(_bg);

        let Sign = PIXI.Texture.from(this.data.Assets[2]);
        let CitySign = new PIXI.Sprite(Sign);
        CitySign.interactive = true;
        CitySign.cursor = "pointer";
        CitySign.x = 1150;
        CitySign.y = 420;
        this.scene.addChild(CitySign);

        let carRadio = PIXI.Texture.from(this.data.Assets[3]);
        let CarRadio = new PIXI.Sprite(carRadio);
        CarRadio.interactive = true;
        CarRadio.cursor = "pointer";
        CarRadio.x = 1100;
        CarRadio.y = 940;
        this.scene.addChild(CarRadio);

        let mirror = PIXI.Texture.from(this.data.Assets[4]);
        let BackMirror = new PIXI.Sprite(mirror);
        BackMirror.interactive = true;
        BackMirror.cursor = "pointer";
        BackMirror.x = 900;
        this.scene.addChild(BackMirror);

        //Dashboard
        this.dashboard = document.createElement('div');
        this.dashboard.id = "dashboard";
        document.body.appendChild(this.dashboard);

        this.speedometer = document.createElement('div');
        this.speedometer.id = "speedometer";
        this.dashboard.appendChild(this.speedometer);

        this.rpmMeter = document.createElement('div');
        this.rpmMeter.id = "rpmMeter";
        this.dashboard.appendChild(this.rpmMeter);


        //BOXES Position

        let PosX = [
          this.sI.appWidth / 2 + 970, // +990
          this.sI.appWidth / 2 + 870, // +870
          this.sI.appWidth / 2 + 990, // +990
        ];

        let PosY = [
          this.sI.appHeight / 2 + 150,
          this.sI.appHeight / 2 + 100,
          this.sI.appHeight / 2 + 80,
        ];

        //LOOP FOR BOXES

        for (let i = 0; i < this.data.BoxArray.length; i++) {
          let box = PIXI.Texture.from(this.data.BoxArray[i]);
          let _box = new PIXI.Sprite(box);
          _box.interactive = true;
          _box.cursor = "pointer";
          _box.x = PosX[i];
          _box.y = PosY[i];
          _box.zIndex = 1;
          this.scene.addChild(_box);


          //Event Listener BOX
          _box.on('click', (item, index) => {

            for (let b = 0; b < 3; b++) {
              document.querySelector("#modalContainer").style.display = "block";


              gsap.to("#modalContainer", {
                duration: 1,
                opacity: .8,
                onComplete: () => {
                  document.querySelector("#closeModal").style.display = "block";
                  gsap.to("#closeModal", {
                    duration: 1,
                    opacity: 1
                  });
                }
              });

            }//END forloop

          })//END Box Event listener

        }//End Loop


        //Sound
        let engine = new Howl({
          src: ['../assets/sounds/EngineStartUp.mp3'],
          volume: 2,
        });

        let radio = new Howl({
          src: ['../assets/sounds/Radio.mp3'],
          volume: 2,
        });


        //Eventlistener START-BUTTON

        play.on('click', () => {

          gsap.to(this.speedometer, {
            delay: 1.5,
            duration: 2.5,
            rotate: 190,
            transformOrigin: "right",
            onComplete: () => {
              gsap.to(this.speedometer, {
                duration: 3,
                rotate: -40,
              })
            }
          })//END Speedometer Gsap

          gsap.to(this.rpmMeter, {
            delay: 1.5,
            duration: 2.5,
            rotate: 190,
            transformOrigin: "right",
            onComplete: () => {
              gsap.to(this.rpmMeter, {
                duration: 3,
                rotate: -30,
                onComplete: () => {
                  gsap.to(this.rpmMeter, {
                    delay: 0.5,
                    duration: 1,
                    rotate: -9,
                    rotate: -8,
                    yoyo: true,
                    repeat: -1,
                  })
                }
              })
            }

          })//END RPM Gsap

          engine.play(); //Engine Sound play


        })//END Eventlistener

        //Eventlistener Radio

        CarRadio.on("click", () => {
          radio.play();
        })

        //BackMirror eventlistener
        BackMirror.on("click", () => {
          document.querySelector("#modalContainer").style.display = "block";

          gsap.to("#modalContainer", {
            duration: 1,
            opacity: .8,
            onComplete: () => {
              
              let text = PIXI.Text;
              let text1 = new PIXI.Text('Testing 123', {fontSize: 100, fill: "white"});
              text1.x = 900;
              text1.y = 200;
              this.scene.addChild(text1);
              document.querySelector("#closeModal").style.display = "block";
              gsap.to("#closeModal", {
                duration: 1,
                opacity: 1
              });
            }
          });//End Gsap

        })//End Eventlistener BackMirror

        //CitySign Eventlistener
        CitySign.on("click", () => {
          document.querySelector("#modalContainer").style.display = "block";

          gsap.to("#modalContainer", {
            duration: 1,
            opacity: .8,
            onComplete: () => {

              let FutureText = PIXI.Text;
              let FTOne = new PIXI.Text()

              document.querySelector("#closeModal").style.display = "block";
              gsap.to("#closeModal", {
                duration: 1,
                opacity: 1
              });
            }
          });



        })

      })//END LOADER

    let myModal = new modal();
    let myText = new Text();

  } // END constructor
} // END class
