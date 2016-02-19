
window.addEventListener("load",function() {

var Q =  Quintus({development: true})
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
         .setup("mygame")
        .controls().touch()
var flag=0;//score
var l=1;// current level
var newscore=0;//
var disp=0;//diplay score
var comp=1,pflag=0;
var fpos=[],j;
var startx,starty;
Q.Sprite.extend("Player",{

  init: function(p) {
   
    this._super(p, {
      sheet: "player",
      jumpSpeed: -400,
       speed: 200
      
    });

    this.add('2d, platformerControls');

    this.on("hit.sprite",function(collision) {

            if(collision.obj.isA("Tower")) {
       flag=flag+200+newscore;
       disp=flag;
       l++;
        Q.stageScene("endGame",1, { label: "You Won!" }); 
        this.destroy();
        
      
  
      }
    });

  }

});
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});

Q.Sprite.extend("Checkpoint",{
  init:function(p){
    this._super(p,{
      sheet:"pole",
       sprite: "pole",
     // collisionMask: SPRITE_BOX, 
      frame:1
    });
    this.add('2d,animation');
  
this.on("bump.left",function(collision){
  if(collision.obj.isA("Player"))
  {console.log("hbhdbhb");
  collision.obj.p.x +=80;
  startx=collision.obj.p.x;
  starty=collision.obj.p.y;
 // alert(collision.obj.pageX);
    this.play("open");
  Q.output();}
});
this.on("bump.right,bump.top",function(collision){
  if(collision.obj.isA("Player"))
  {console.log("hbhdbhb");
  collision.obj.p.x -=80;
 startx=collision.obj.p.x;
  starty=collision.obj.p.y;
    this.play("open");Q.output();}
});
 } 
});

Q.output= function()
{ /* $('#exampleModal').modal('show') ;
$('#exampleModal').on('shown.bs.modal', function (e) {Q.pauseGame();
  // do something...
})
$('#exampleModal').on('hidden.bs.modal', function (e) {
  Q.unpauseGame();
// do something...
})*/
pflag=1;
flag=flag+newscore;
       disp=flag;
       newscore=0;
var xi= (startx);
var yi= starty;
$('#e').popover({ html : true, 
        content: function() {
          return $('#but').html();
        }
      });
 $('#e').css({'position':'absolute','top':yi,'right':xi}).popover('show');
 $('#e').on('shown.bs.popover', function (e) {
   $('#b').show();
      Q.pauseGame();
 });
 $('.btn').click(function(){$('#b').hide();
                      $('#e').popover('hide');
                       Q.unpauseGame();
                     });
 
  console.log("inside function");
}
Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });

    this.add('2d, aiBounce');
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
        Q.stageScene("endGame",1, { label: "You Died" });
                collision.obj.destroy();
      }
    });
      this.on("bump.top",function(collision) {
      if(collision.obj.isA("Player")) { 
        this.destroy(); 
        collision.obj.p.vy = -300;
        newscore+=50;disp=flag+newscore;
         Q.stageScene("score",1, { 
  label: "score: "+disp
   });     
 // alert("x="+collision.obj.p.x+"  y="+collision.obj.p.y);
      }
    });
  }
});


   /* Q.Sprite.extend("verticalenemy",{
      init :function(p){
        this._super(p,{ sheet: 'enemy',
          vy:-100, // speed in y
          rangeY:200, //range of enemy's movement
          gravity:0
        });
        this.add("2d");
        this.p.intitialY=this.p.y;

        this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
        Q.stageScene("endGame",1, { label: "You Died" }); 
        collision.obj.destroy();
      }
    });
this.on("bump.top",function(collision) {
      if(collision.obj.isA("Player")) { 
        this.destroy(); 
        collision.obj.p.vy = -300;
        newscore+=50;
         Q.stageScene("score",1, { 
  label: "score: "+flag
   });     
  
      }
    });
      },
     step: function(dt) {                
       if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
         this.p.vy = -this.p.vy;
        } 
        else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
        this.p.vy = -this.p.vy;
         } 
       
        }
    })
*/
var pos=[];
Q.scene("1",function(stage) {
  if( pflag==0)
{l=1;startx=450;starty=180;}
h=0;
pos=[[800,0],[600,150],[55,450],[55,0],[1280,650],[1330,600]];
fpos=[[900,200],[760,-30],[140,400],[900,550]];
  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "c5.jpg", speedX: 0.5, speedY: 0.5 ,repeatX:false }));//speed of wallpaper

   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level1.json',
                             sheet:     'tiles' }));

  var player = stage.insert(new Q.Player({x:startx,y:starty}));
     stage.add("viewport").follow(player);
for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
  stage.insert(new Q.Tower({ x:1330, y: 600 }));
  for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));

  Q.stageScene("score",1, { 
  label: "score: "+flag
});     
  
});

Q.scene("score",function(stage) {
  var label = stage.insert(new Q.UI.Text({
    x: Q.width/4, 
    y: 10,color:"#000099",
    label: stage.options.label
  }));
  //var offsets=$(  "").offset();
  //console.log(offsets.top,offsets.left);
   var b= stage.insert(new Q.UI.Button({x: Q.width/2,y:20 ,fill:'#CCCCCC',label:"Skip Level"}));
 b.on("click",function(){
Q.clearStages();
flag=flag+newscore;
       disp=flag;
       l++;comp=l;pflag=0;
Q.stageScene("quotes");
 });
});


Q.scene("2",function(stage){
  if( pflag==0)
{startx=60;starty=400;}
  fpos=[[230,320],[1056,60],[2170,350],[2080,670]];
  pos=[[730,400],[720,400],[100,350],[400,400],[1600,150],[1500,300],[1500,400],[1700,400],[2000,400],[2710,150],[2750,150],[2450,450],[2900,650],[2400,650]];
  stage.insert(new Q.Repeater({ asset: "c2.png", speedX: 0.5, speedY: 0.5 ,repeatY:false })); 
   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level2.json',
                             sheet:     'tiles' }));
var player = stage.insert(new Q.Player({x:startx,y:starty}));
  stage.add("viewport").follow(player);
for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
 for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));

  stage.insert(new Q.Tower({ x:2970, y: 660 }));
  Q.stageScene("score",1, { 
  label: "score: "+flag });

});

Q.scene("3",function(stage){
  if( pflag==0)
{startx=80;starty=250;}
fpos=[[1020,250],[1260,1440],[300,1280],[1344,800]];
  pos=[[250,250],[500,250],[630,350],[1200,500],[1300,500],[1250,500],[700,600],[800,600],[900,600],[500,600],[100,600],[300,830],[360,990],[300,1160],
  [100,1470],[200,1470],[1180,1660],[1250,1660],[1400,1660],[1300,1660],[1250,1500],[1100,1500],[1320,1110]];
stage.insert(new Q.Repeater({ asset: "back.jpg", speedX: 0.5, speedY: 0.5 ,repeatX:false})); 
   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level3.json',
                             sheet:     'tiles' }));
var player = stage.insert(new Q.Player({x:startx,y:starty}));
  stage.add("viewport").follow(player);
for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
  stage.insert(new Q.Tower({ x:980, y: 980 }));
for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));
  Q.stageScene("score",1, { 
  label: "score: "+flag});
});

Q.scene("4",function(stage){
  if( pflag==0)
{startx=760;starty=670;}
fpos=[[1470,760],[740,350],[1820,450],[800,0]];
  pos=[[1020,600],[1180,680],[930,830],[1000,1020],[950,1020],[1180,1020],[1660,1020],[1700,1020],[1720,1020],[1490,410],[1440,410],[890,280],[920,280],[180,160],[200,160],
  [220,160],[250,160],[280,160],[300,160],[160,290],[250,290],[320,670],[640,510],[550,510]];
stage.insert(new Q.Repeater({ asset: "c4.jpg", speedX: 0.5, speedY: 0.5 })); 
   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level4.json',
                             sheet:     'tiles' }));
var player = stage.insert(new Q.Player({x:startx,y:starty}));
  stage.add("viewport").follow(player);
for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
  stage.insert(new Q.Tower({ x:640, y: 650 }));
for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));
  Q.stageScene("score",1, { 
  label: "score: "+flag });
});

Q.scene("5",function(stage){
  if( pflag==0)
{startx=100;starty=50;}
fpos=[[1550,1000],[2240,830],[1280,740],[1120,220]];
  pos=[[50,580],[100,580],[480,580],[480,450],[500,450],[1380,580],[1580,160],[2020,530],[830,850],[930,850],[750,850],[580,850],[150,1160],[580,1030],
  [1152,990],[900,990],[1100,1030],[2000,1080],[2200,930],[2400,900],[2600,850],[2700,750],[2900,650]];
stage.insert(new Q.Repeater({ asset: "c6.jpg",repeatY:true, speedX: 0.5, speedY: 0.5 })); 
   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level5.json',
                             sheet:     'tiles' }));
var player = stage.insert(new Q.Player({x:startx,y:starty,jumpSpeed:-450})); 
  stage.add("viewport").follow(player);
for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
  stage.insert(new Q.Tower({ x:3000, y: 620 }));
for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));
  Q.stageScene("score",1, { 
  label: "score: "+flag });
});

Q.scene("6",function(stage){
  if( pflag==0)
{startx=50;starty=1050;}
fpos=[[960,1120],[280,160],[890,670],[1150,160]];
  pos=[[230,1120],[640,1120],[200,960],[200,800],[800,900],[1120,960],[1220,860],[1120,760],[520,670],[1180,510],[990,320],[1750,220],[750,260],[410,260],[220,510],[520,160],[550,160],[960,160]];
stage.insert(new Q.Repeater({ asset: "city2.png", speedX: 0.5, speedY: 0.5 })); 
   stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level6.json',
                             sheet:     'tiles' }));
var player = stage.insert(new Q.Player({x:startx,y:starty,jumpSpeed:-450})); 
  stage.add("viewport").follow(player);
  for(var i=0;i<pos.length;i++)
  stage.insert(new  Q.Enemy({x: pos[i][0] ,y: pos[i][1]}));
  for(j=0 ;j<4;j++)           ///////// n=4 if no. of ques=4
   stage.insert(new Q.Checkpoint({x:fpos[j][0],y:fpos[j][1]}));
stage.insert(new Q.Tower({ x:1300, y: 150}));
 Q.stageScene("score",1, { 
  label: "score: "+flag });
});

Q.scene('quotes',function(stage){
  stage.insert(new Q.Repeater({ asset: "large.jpg",repeatX:false,repeatY:false })); 
 var container=stage.insert(new  Q.UI.Container({
  x:Q.width/2,y:Q.height/4,fill:"rgba(0,0,0,0.5)"
 }));
 t=['"  You dont just live in life, \nyou shape it,\nyou make it,\n you put your mark upon it.\nThats what edunova is all about :)  "',
'"   Success is an idea \nfor smart people\n to make them believe \n that they never fail :)  "',
'"   A smooth sea \n never made \n a skillful sailor :)  "',
'"  The world is\n full of magical things \n waiting for our \n wits to grow stronger :)   "',
'" \tA pencil \nand a dream\n can take you anywhere :)   "',
'"  It is the mystery\n and wonderment \n that serve our souls ,\n not the grail itself :)  "'];
   var label=container.insert(new Q.UI.Text({
    label:t[l-1],x: 0 ,y:0 ,color:"white"       
  }));
 var but= container.insert(new Q.UI.Button({x:0,y:200 ,fill:'#CCCCCC',label:"Continue"}));
 but.on("click",function(){
Q.clearStages();
Q.stageScene(""+l);
 });

container.fit(40);
});

Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
          
  var label = container.insert(new Q.UI.Text({x:0, y: 10, color:"white",
                                                   label: stage.options.label }));
  var label = container.insert(new Q.UI.Text({x:0, y: 40, color:"white",
                                                   label: "score: "+(disp)}));
 // disp-=newscore;newscore=0;
  console.log("level="+l);
  console.log("comp="+comp);
 
   if(l==comp) 
    {
  var button1 = container.insert(new Q.UI.Button({ x: 0, y: 100, fill: "#CCCCCC",
                                                  label: "Play Again" }))   
     button1.on("click",function() {
    Q.clearStages();
     disp-=newscore;
      newscore=0; 
    Q.stageScene(''+l); });
    /*  switch(l)
  { case 1: Q.stageScene("1");
              break;
    case 2: Q.stageScene("2");
              break;
    case 3: Q.stageScene("3");
              break;
    case 4: Q.stageScene("4");
              break;
    case 5: Q.stageScene("5");
              break;
              
  }*/
   }
 /* else
  {  flag=flag- newscore -200;
    disp-=(newscore+200);
    newscore=0; console.log("switch 2");
    Q.stageScene(''+(l-1));

    switch(l)   
  { case 2: Q.stageScene("1");
              break;
    case 3: Q.stageScene("2");
              break;
    case 4: Q.stageScene("3");
              break;
    case 5: Q.stageScene("4");
              break;
              
   
  }
 // l--;
  }*/
   
  
  if(comp!=l)
  {
    var button2 = container.insert(new Q.UI.Button({ x:0, y: 100, fill: "#CCCCCC",
                                                  label: "Next level" }))
    button2.on("click",function(){
      Q.clearStages();pflag=0;
    Q.stageScene("quotes");
 newscore=0;
  comp=l;
    });

  }
container.fit(40);
});
Q.load("sprites.png, sprites.json, level1.json,level2.json,level3.json,level4.json,level5.json,level6.json,pole.png,pole.json,c5.jpg,c6.jpg,c2.png,back.jpg,c4.jpg,city2.png, tiles.png,large.jpg", function() {
 
  Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
     Q.compileSheets("pole.png","pole.json");
  Q.compileSheets("sprites.png","sprites.json");
  Q.animations('pole',{
    closed:{frames:[1],rate:1/10,flip: false},
    open:{frames:[3,4,5,6,7,8,9,10,11],rate: 1/5, flip: false, loop: true }
  });
  Q.stageScene("quotes");

},{ progressCallback: function(loaded,total){
 var element = document.getElementById("loading");
    element.style.width = Math.floor(loaded/total*100) + "%";
   if (loaded == total) {
      document.getElementById("loading").remove();
    }
}
});

});
