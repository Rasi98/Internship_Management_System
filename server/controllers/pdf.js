import puppeteer from "puppeteer"

const pdfgen=async (req,res)=>{
    const url=req.body.url;
    console.log(url)
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    const option={
        path:"pdf/cv.pdf",
        format:"A4"
    }

    await page.goto(url,{waitUntil:"domcontentloaded"});
    await page.pdf(option)
    await browser.close();
    console.log("complete")


}
export default pdfgen;