const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

async function getGameFromUrl(link) {
  Promise.all(
    link.map(function(url) {
      return new Promise((resolve, reject) => {
        request(`${url}`, function(err, res, body) {
          if (!err) {
            const $ = cheerio.load(body);
            let tempLink = [];
            let apkLink = "";
            let obbLink = "";

            getLinkGameAndObb = $(".download-url").each(function(index, ele) {
              tempLink.push($(ele).attr("href"));
            });
            checkLinkBeforeGet = $(".collapsible-header");
            if (checkLinkBeforeGet.length == 3) {
              if (tempLink.length == 4) {
                // Game co link goc va co OBB
                apkLink = tempLink[2].split("space_id=");
                obbLink = tempLink[3].split("space_id=");
                kqLink =
                  "https://spaces.apkmody.io/download/" + apkLink[1] + "\r\n";
                kqObb =
                  "https://spaces.apkmody.io/download/" + obbLink[1] + "\r\n";
                fs.appendFile("obb.txt", kqLink, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  //console.log("Link saved!");
                });
                fs.appendFile("obb.txt", kqObb, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("OBB Detected!" + obbLink[0]);
                });
              } else if (tempLink.length == 1) {
                //Game là game goc
                apkLink = tempLink[0].split("space_id=");
                kqLink =
                  "https://spaces.apkmody.io/download/" + apkLink[1] + "\r\n";
                fs.appendFile("link.txt", kqLink, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("Link saved!");
                });
              } else {
                // Game la game mod khong OBB
                apkLink = tempLink[1].split("space_id=");
                kqLink =
                  "https://spaces.apkmody.io/download/" + apkLink[1] + "\r\n";
                fs.appendFile("link.txt", kqLink, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("Link saved!");
                });
              }
            } else if (checkLinkBeforeGet.length === 1) {
              console.log("Deo co link down");
            } else {
              if (tempLink.length == 1) {
                apkLink = tempLink[0].split("space_id=");
                kqLink =
                  "https://spaces.apkmody.io/download/" + apkLink[1] + "\r\n";
                fs.appendFile("link.txt", kqLink, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("Link saved!");
                });
              } else {
                apkLink = tempLink[0].split("space_id=");
                obbLink = tempLink[1].split("space_id=");
                kqLink =
                  "https://spaces.apkmody.io/download/" + apkLink[1] + "\r\n";
                kqObb =
                  "https://spaces.apkmody.io/download/" + obbLink[1] + "\r\n";
                fs.appendFile("obb.txt", kqLink, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  //console.log("Link saved!");
                });
                fs.appendFile("obb.txt", kqObb, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("OBB Detected!" + obbLink[0]);
                });
              }
            }
          }
        });
      });
    })
  );
}
game = getGameFromUrl;
module.exports.game = game;
