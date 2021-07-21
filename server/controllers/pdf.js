import puppeteer from "puppeteer"

const pdfgen=async (req,res)=>{
    const url=req.body.url;
    console.log("url",url)
    try {
        const browser = await puppeteer.launch({defaultViewport:{width:2500,height:1080}});
        const page = await browser.newPage();
        const option = {
            path: "pdf/cv.pdf",
            format: 'A4'
        }
        // await page.goto(url, {waitUntil: 'networkidle2'});
        // await page.pdf(option);

        await page.goto(url,{waitUntil:"networkidle2"})
await page.waitForSelector("#mycv")
const test=await page.$('#mycv')
const image=await test.screenshot({path:'pdf/img.png'})
        const variable=`data: image/png;charset=utf-8;base64,${image.toString('base64')}`
await page.goto(variable, {waitUntil: 'networkidle2'});
await page.pdf({path: 'pdf/cv.pdf', format: 'a4'});

        await browser.close();
    }
    catch (e) {
        console.log(e)
    }

}
export default pdfgen;

