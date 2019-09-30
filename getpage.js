const cheerio = require("cheerio");
const request = require("request");
var fs = require("fs");
let page = 70; // 70 lay bang tay nha
let listItem = [];
function getPage() {
  let urls = [];
  let kq = [];
  for (let y = 9; y >= 1; y--) {
    urls.push("https://apkmody.io/games/page" + y);
  }
  return Promise.all(
    urls.map(function(url) {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          request(url, function(err, res, body) {
            if (err) {
              return reject(err);
            }
            let $ = cheerio.load(body);
            let gameCategory = [];
            let getNumerCategory = $(".card-image a").each(function(
              index,
              ele
            ) {
              gameCategory.push($(ele).attr("href"));
            });
            resolve(gameCategory);
          });
        }, 5000);
      });
    })
  ).then(function(result) {
    var merged = [].concat.apply([], result);

    //console.log(merged);
    kq = merged;
    return kq;
    //console.log(result);
    /*
    fs.appendFile("page.txt", merged, function(err) {
      if (err) throw err;
      console.log("done!");
    });*/
  });
}
get = getPage;
module.exports.get = get;
