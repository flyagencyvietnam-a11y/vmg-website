import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';
const indexText = await readFile('src/data/legacyNews.ts','utf8');
const articles = JSON.parse(indexText.slice(indexText.indexOf('=')+1).trim().replace(/;$/, ''));
const discovery = JSON.parse(await readFile('tmp/legacy-news-cache/discovery.json','utf8'));
assert.equal(articles.length, discovery.articles.length);
assert.equal(new Set(articles.map(a=>a.slug)).size, articles.length);
let images = 0;
let videos = 0;
const normalize = text => text.replace(/\s+/g,'').trim();
for (const article of articles) {
  const {html} = JSON.parse(await readFile(`src/data/news/${article.legacyId}.json`,'utf8'));
  const $ = load(html);
  const original = load(discovery.articles.find(a=>a.id===article.id).originalHtml);
  original('script,style,form,input,button,object,embed,svg,iframe').remove();
  const copy = load(html);
  copy('iframe').remove();
  copy('a').each((_,el)=>{ if(copy(el).text()==='Xem video trong bài viết') copy(el).remove(); });
  assert.equal(normalize(copy.root().text()), normalize(original.root().text()), `Text changed: ${article.id}`);
  assert.equal($('script,style,form,object,embed').length,0);
  for (const el of $('*').toArray()) for(const attr of Object.keys(el.attribs)) assert(!attr.startsWith('on'),`Unsafe attribute ${attr}`);
  for (const el of $('img').toArray()) {
    const src = $(el).attr('src');
    assert(src.startsWith('/legacy/news/'));
    await access(`public${src}`);
    images++;
  }
  for (const el of $('a[href]').toArray()) {
    const href = $(el).attr('href');
    assert(!/^javascript:|^data:/i.test(href));
    if(href.startsWith('/tin-tuc/')) assert(articles.some(a=>href===`/tin-tuc/${a.slug}`));
  }
  for (const el of $('iframe').toArray()) {
    assert(/^https:\/\/www.youtube-nocookie.com\/embed\//.test($(el).attr('src')));
    videos++;
  }
  if (article.image_url) await access(`public${article.image_url}`);
}
const page = await readFile('src/pages/TinTuc.tsx','utf8');
assert(!page.includes('Xem bài viết gốc'));
console.log(`PASS: ${articles.length} full article texts match their sources; ${images} image placements; ${videos} videos; safe markup and internal links verified.`);
