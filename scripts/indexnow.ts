/// <reference types="bun" />
// Tells the search engines that take IndexNow (Bing, Yandex, Seznam, Naver) that the pages
// changed, so they come back now rather than whenever. Run after a deploy that changes
// what the pages say:  bun run indexnow
// The key is public by design: the engines read it at /<key>.txt to know the site sent it.

const host = "ogmios.ilien.dev";
const key = "163fe5b82efb9289e7bd40288e873c7c";

const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]!);
const answer = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`${urlList.length} pages sent: ${answer.status} ${answer.statusText}`);
process.exit(answer.ok ? 0 : 1);

export {};
