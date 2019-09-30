const getGame = require("./getGame");
//const getGameCloud = require("./getGameCloud.js");
const fuckAPK = require("./fuckAPKMODY");
const getPage = require("./getpage");
// Sync Function
let abc = getPage.get;
abc().then(res => {
  console.log(res);
  //getGame.game(res);
  fuckAPK.fuck(res);
});

/* const abc = ["https://apkmody.io/games/oceanhorn.html"];
fuckAPK.fuck(abc); */
