const cheerio = require("cheerio");
const request = require("request");
var cloudscraper = require("cloudscraper");

async function getGameFromUrlCloud(link) {
  let linkDownload = [];
  Promise.all(
    link.map(function(url) {
      return new Promise((resolve, reject) => {
        cloudscraper.get(`${url}`).then(function(body) {
          const $ = cheerio.load(body);
          let tempLink = [];
          let apkLink = "";
          let obbLink = "";

          getLinkGameAndObb = $(".download-url").each(function(index, ele) {
            tempLink.push($(ele).attr("href"));
          });
          if (tempLink.length == 3) {
            apkLink = tempLink[1].split("space_id=");
            obbLink = tempLink[2].split("space_id=");
          } else {
            apkLink = tempLink[1].split("space_id=");
          }

          console.log("Link APK đây thưa anh Bi đẹp trai");
          console.log(
            "\x1b[36m%s\x1b[0m",
            "https://spaces.apkmody.io/download/" + apkLink[1]
          );
          if (obbLink) {
            console.log("Link OBB đây thưa anh Bi đẹp trai");
            console.log(
              "\x1b[36m%s\x1b[0m",
              "https://spaces.apkmody.io/download/" + obbLink[1]
            );
          }
        });
      });
    })
  );
}
gameCloud = getGameFromUrlCloud;
module.exports.gameCloud = gameCloud;
