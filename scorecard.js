let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";


//make teams folder->player json files inside them->and player data into its file;
//both team names
function scpage(url)
{
    request(url, cb);
}

function cb(err, response, html) {
    if (err) {
        console.log("err found in main.js");
    }
    else {
        let parsehtml = cheerio.load(html);
        let tbarr = parsehtml(".table.batsman tbody");
        let venue, date, tnarr = [];
        let headerinfo = parsehtml(".header-info div .description");
        let s = headerinfo.text();
        let harr = s.split(",");
        venue = harr[1].trim();
        date = harr[2].trim();

        let narr = parsehtml(".event .name");
        tnarr.push(parsehtml(narr[0]).text());
        tnarr.push(parsehtml(narr[1]).text());
        console.log(tnarr[0], " ", tnarr[1]);

        for (let i = 0; i < tbarr.length; i++) {
            let trarr = parsehtml(tbarr[i]).find("tr");
            for (let j = 0; j < trarr.length; j++) {
                let tdarr = parsehtml(trarr[j]).find("td");
                if (tdarr.length == 8) {
                    let opponent = ((i == 0) ? tnarr[1] : tnarr[0]);
                    extractdetails(tdarr, parsehtml, tnarr[i], opponent, venue, date);
                }
            }
        }

    }
}
function createdir(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}
function createfile(filepath) {
    if (fs.existsSync(filepath) == false) {
        fs.openSync(filepath, "w");
    }

}
function insert(filepath, obj) {
    let content = fs.readFileSync(filepath);
    if ((content + "") == "") {
        let arr = [];
        arr.push(obj);
        let contentoffile = JSON.stringify(arr);
        fs.writeFileSync(filepath, contentoffile);
    }
    else {

        let arr = JSON.parse(content);
        arr.push(obj);
        let contentoffile = JSON.stringify(arr);
        fs.writeFileSync(filepath, contentoffile);

    }


}
function extractdetails(tdarr, parsehtml, tname, opponent, venue, date) {
    let playername, runs, balls, six, four, str;

    playername = parsehtml(tdarr[0]).text();
    runs = parsehtml(tdarr[2]).text();
    balls = parsehtml(tdarr[3]).text();
    four = parsehtml(tdarr[5]).text();
    six = parsehtml(tdarr[6]).text();
    str = parsehtml(tdarr[7]).text();
    let dirpath = __dirname +"/"+tname;
    createdir(dirpath);
    let filepath = __dirname +"/"+ tname +"/"+ (playername + ".json");
    createfile(filepath);
    let obj = {
        PLAYERNAME: playername,
        RUNS: runs,
        BALLS: balls,
        FOUR: four,
        SIX: six,
        SR: str,
        OPPONENT_TEAM: opponent,
        VENUE: venue,
        DATE: date
    };
    insert(filepath, obj);
    console.log(playername, " ", runs, " ", balls, " ", four, " ", six, " ", str);
}

module.exports={
    scp:scpage
}