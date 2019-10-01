const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const fetch = require("isomorphic-unfetch");
async function fuckAPYMODY(link) {
  let linkDownload = [];
  Promise.all(
    link.map(function(url) {
      return new Promise((resolve, reject) => {
        request(`${url}`, function(err, res, body) {
          if (!err) {
            var text = fs.readFileSync("./filename.txt", "utf-8");
            var textByLine = text.split("\n");
            const $ = cheerio.load(body);
            let tempLink = [];
            let filename = "";
            let genre = [];
            //title = $(".card-title h1").text();
            Wrapimage = $("#primaryimage img").attr("data-cfsrc");

            genreWrap = $(".entry-content tr:nth-child(3) a").each(function(
              index,
              ele
            ) {
              genre.push($(ele).text());
            });
            gameName = $(".entry-content tr:first-child td").text();
            textByLine.forEach(function(item) {
              if (item.includes(gameName)) {
                console.log("da tim thay");
                return (filename = item);
              } else {
                //console.log("Lỗi, không tìm thấy filename trong file.txt");
              }
            });
            // Clean fucking field

            $(".entry-content:nth-child(3) ins").remove();
            $(".entry-content:nth-child(3) .download").remove();
            $(".entry-content:nth-child(3) script").remove();
            $(".entry-content:nth-child(3) #outline").remove();
            $(".entry-content:nth-child(3) #download-tab").remove();
            $(".entry-content:nth-child(3) #ldoe-faqs").remove();
            $(".entry-content:nth-child(3) .schema-faq").remove();
            $(".entry-content:nth-child(3) a").removeAttr("href");

            //Remove the fucking old src img
            $(".entry-content:nth-child(3) img").each(function() {
              $(this).removeAttr("src");
            });
            //Change the data-src to src
            $(".entry-content:nth-child(3) img").each(function() {
              let oldValue = $(this).attr("data-src");
              $(this).attr("src", oldValue);
              $(this).removeAttr("data-src");
            });
            title = $(".card-title h1").text();
            //check if Genre field or not
            let category = "";
            checkGenre = $(".entry-content tr");
            if (checkGenre.length == 8) {
              pub = $(".entry-content tr:nth-child(2) td").text();
              category = $(".entry-content tr:nth-child(3) td").text();
              lastVer = $(".entry-content tr:nth-child(4) td").text();
              size = $(".entry-content tr:nth-child(5) td").text();
              mod = $(".entry-content tr:nth-child(6) td").text();
              platforms = $(".entry-content tr:nth-child(7) td").text();
            } else {
              pub = $(".entry-content tr:nth-child(2) td").text();
              lastVer = $(".entry-content tr:nth-child(3) td").text();
              size = $(".entry-content tr:nth-child(4) td").text();
              mod = $(".entry-content tr:nth-child(5) td").text();
              platforms = $(".entry-content tr:nth-child(6) td").text();
            }

            content = $(".entry-content:nth-child(3)").html();
            image = $("#primaryimage img").attr("src");
            // console.log(title);
            // console.log(genreWrap);
            //console.log("https://apkease.com/" + "2019/09/" + filename);
            //console.log(gameName);
            //console.log(filename);
            //console.log(Wrapimage);
            if (category) {
              fetch("http://localhost:2000/apk", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  Title: title,
                  Publish: pub,
                  Category: category,
                  Version: lastVer,
                  Size: size,
                  Mod: mod,
                  Platfrom: platforms,
                  Content: content,
                  Link: filename,
                  Image: Wrapimage
                })
              })
                .then(r => {
                  console.log("Da post toi server");
                })
                .catch(err => {
                  console.log("Da xay ra loi" + err);
                });
            } else {
              fetch("http://localhost:2000/apk", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  Title: title,
                  Publish: pub,
                  Version: lastVer,
                  Size: size,
                  Mod: mod,
                  Platfrom: platforms,
                  Content: content,
                  Link: filename,
                  Image: Wrapimage
                })
              })
                .then(r => {
                  console.log("Da post toi server");
                })
                .catch(err => {
                  console.log("Da xay ra loi" + err);
                });
            }
          }
        });
      });
    })
  );
}
fuckAPYMODY(["https://apkmody.io/games/dragnboom.html"]);
fuck = fuckAPYMODY;
module.exports.fuck = fuck;
