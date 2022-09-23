import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import { Howl } from "howler";
import Stage from "./Stage";
import modal from "./Modal";

export default class Initialize {

  constructor() {
    
    this.myStage = new Stage();
    this.scene = this.myStage.scene;
    this.background = this.myStage.bg;
    this.sI = this.myStage.stageInfo;

    let assets = [
      '../assets/images/start.png',
      '../assets/images/Test1.jpg',
      '../assets/images/Box1.png',
      '../assets/images/Box2.png',
      '../assets/images/Box3.png',
    ]

    const loader = PIXI.Loader.shared
    .add(assets)
    .load((loader, res)=>{

      let bgTexture = PIXI.Texture.from('./assets/images/Test1.jpg');
      let _bg = new Sprite(bgTexture);
      _bg.id = "backgroundImage";
      this.background.addChild(_bg);
      


    })//END LOADER

    
    

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

    //BOXES

    let myBoxArray = [

      "./assets/images/Box1.png",
      "./assets/images/Box2.png",
      "./assets/images/Box3.png"
    ];
    
    let PosX = [
        this.sI.appWidth/2 +990, //
        this.sI.appWidth/2 +200, // +870
        this.sI.appWidth/2 +990, //
    ];

    let PosY = [
      this.sI.appHeight/2 +150,
      this.sI.appHeight/2 +100,
      this.sI.appHeight/2 +80,
    ];

    let info = [
      "Januar", "Februar", "Marts"
    ];

      this.container = document.createElement('div');
      this.container.id = "container";
      document.body.appendChild(this.container);

      this.container.innerHTML = '' + info.map((item, index)=>{
        return `
          <div id="ChildCon">

            <div class='${"maps" + index}' id="block"></div>


          </div>
        `
      }).join('');

    //LOOP FOR BOXES

    for(let i = 0;i<myBoxArray.length;i++){
      let box = PIXI.Texture.from(myBoxArray[i]);
      let _box = new PIXI.Sprite(box);
      _box.interactive = true;
      _box.x = PosX[i];
      _box.y = PosY[i];
      _box.zIndex = 1;
      this.scene.addChild(_box);

      
      //Event Listener BOX
      _box.on('click', (item, index)=>{

        for(let info = 0; info<3;info++) {
          document.querySelector("#modalContainer").style.display = "block";

          gsap.to("#modalContainer",{
            duration: 1,
            opacity: .8,
              onComplete: ()=>{
                document.querySelector("#closeModal").style.display = "block";
                gsap.to("#closeModal", {
                  duration:1,
                  opacity:1
                });
              }
          });
        }
        console.log("Random Info here");

      })//END Box Event listener


    }

    //Sound
    let engine = new Howl({
      src: ['../assets/sounds/EngineStartUp.mp3'],
    })


    //Eventlistener

    let playTexture = PIXI.Texture.from('../assets/images/start.png');

    let play = new PIXI.Sprite(playTexture);
    play.interactive = true;
    play.x = 900;
    play.y = 850;
    this.scene.addChild(play);

    

    play.on('click', ()=>{

      gsap.to(this.speedometer, {
        delay: 1.5,
        duration: 2.5,
        rotate: 190,
        transformOrigin: "right",
          onComplete: ()=>{
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
          onComplete: ()=>{
            gsap.to(this.rpmMeter, {
              duration: 3,
              rotate: -30,
              onComplete: ()=>{
                gsap.to(this.rpmMeter, {
                  delay: 0.5,
                  duration: 1,
                  rotate: -9,
                  rotate: -8,
                  yoyo: true,
                  repeat: -1,
                })
              }
            })}
            
      })//END RPM Gsap

      engine.play(); //Engine Sound play
  

    })//END Eventlistener

    let myModal = new modal();
    

  } // END constructor
} // END class
