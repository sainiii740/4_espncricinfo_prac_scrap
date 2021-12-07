let cheerio=require("cheerio");
let request=require("request");
let spobj=require("./scorecard.js");
//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
function allmatchpage(url)
{
    request(url,cb);
}

function cb(err,response,html)
{
    if(err)
    {
        console.log("err in allmatch.js");
    }
    else{
        let parsehtml=cheerio.load(html);
        let scorecardsarr=parsehtml(`a[data-hover="Scorecard"]`);
        for(let i=0;i<scorecardsarr.length;i++)
        {
            let link=parsehtml(scorecardsarr[i]).attr("href");
            let full_link="https://www.espncricinfo.com"+link;
            spobj.scp(full_link);
        }
    }
}

module.exports={
    allm_p:allmatchpage
}