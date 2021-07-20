import puppeteer from "puppeteer"

const pdfgen=async (req,res)=>{
    const url=req.body.url;
    console.log("url",url)
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    const option={
        path:"pdf/cv.pdf",
        format:'a4'
    }

    await page.goto(url,{waitUntil:"networkidle2"})
    await page.pdf(option)
    await browser.close();
    console.log("complete")

}
export default pdfgen;