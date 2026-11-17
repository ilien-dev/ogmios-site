import puppeteer from "puppeteer-core";

const url = "http://localhost:4399/";
for (let i = 0; i < 60; i++) {
  try {
    if ((await fetch(url)).ok) break;
  } catch {
    /* not up yet */
  }
  await new Promise((r) => setTimeout(r, 1000));
}
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", headless: true });
const page = await browser.newPage();
for (const width of [320, 375, 430]) {
  await page.setViewport({ width, height: 800 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const out = await page.evaluate(() => {
    const rects = [...document.querySelectorAll("#install article")].map((a) => {
      const r = a.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
    });
    return { inner: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, rects };
  });
  console.log(width, JSON.stringify(out));
}
await browser.close();
