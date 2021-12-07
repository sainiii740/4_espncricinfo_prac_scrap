let request=require("request");
let cheerio=require("cheerio");
let allmatchpobj=require("./allmatch.js");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log("err found in main.js");
    }
    else{
        let parsehtml=cheerio.load(html);
        let link=parsehtml(`a[data-hover="View All Results"]`).attr("href");
        let full_link="https://www.espncricinfo.com"+link;
        allmatchpobj.allm_p(full_link);
    }
}