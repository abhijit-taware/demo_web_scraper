const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');
const PORT=process.env.PORT || 6000;

const app=express();
const url='https://www.theguardian.com/uk';

axios(url).then(response=>{
    const html=response.data;
    const cheerioParse=cheerio.load(html);
    const articles=[];

    cheerioParse('.fc-item__title').each(function(){
        const title=cheerioParse(this).text();
        const link=cheerioParse(this).find('a').attr('href');
        articles.push({
            title,
            link
        });
    })
    console.log(articles);
}).catch(error=>console.log(error));

app.listen(PORT,()=>console.log(`server running on PORT: ${PORT}`));