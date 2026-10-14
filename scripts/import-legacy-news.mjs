import { load } from 'cheerio';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const origin = 'https://vmgenglish.edu.vn';
const cacheDir = 'tmp/legacy-news-cache';
await mkdir(cacheDir, { recursive: true });
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 20);
async function request(url, timeout = 20000) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return response;
    } catch (error) { if (attempt === 1) throw error; }
  }
}
async function page(url) {
  const file = `${cacheDir}/${hash(url)}.html`;
  try { return await readFile(file, 'utf8'); } catch { /* First import. */ }
  const html = await (await request(url)).text();
  await writeFile(file, html);
  return html;
}
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const queue = [`${origin}/tin-tuc.html`, `${origin}/bi-quyet-hoc-tot.html`];
const visited = new Set();
const sources = new Map();
const snapshot = process.argv.includes('--cached') ? JSON.parse(await readFile(`${cacheDir}/discovery.json`, 'utf8')) : null;
const articles = snapshot?.articles ?? [];
if (snapshot) for (const url of snapshot.pages) visited.add(url);
while (!snapshot && queue.length) {
  const url = queue.shift();
  if (visited.has(url)) continue;
  visited.add(url);
  const $ = load(await page(url));
  // Legacy pretty pagination URLs incorrectly return page one. Use the site's
  // category endpoint and follow its rendered page numbers instead.
  const categoryId = new URL(url).pathname.match(/-cn(\d+)/)?.[1] || new URL(url).searchParams.get('id');
  if (categoryId && !/-n\d+\.html$/.test(new URL(url).pathname)) {
    const numbers = $('[class*=pagin] [title]').map((_,el)=>Number($(el).attr('title')?.match(/Page (\d+)/)?.[1] || 0)).get();
    for (const number of numbers.filter(n=>n>0)) {
      const next = `${origin}/index.php?module=news&view=cat&id=${categoryId}&page=${number}`;
      if (!visited.has(next)) queue.push(next);
    }
  }
  $('a[href]').each((_, el) => {
    const href = new URL($(el).attr('href'), url);
    if (href.origin !== origin) return;
    href.hash = '';
    const id = href.pathname.match(/-n(\d+)\.html$/)?.[1];
    if (id && id !== '42' && !sources.has(id)) {
      sources.set(id, href.href);
      queue.push(href.href);
    }
    if (/-cn\d+(?:-page\d+)?\.html$/.test(href.pathname) && !visited.has(href.href)) queue.push(href.href);
  });
  const id = new URL(url).pathname.match(/-n(\d+)\.html$/)?.[1];
  if (!id) { console.log('Listing:', decodeURI(url)); continue; }
  const body = $('.detail-content').first();
  const title = clean($('h1').first().text());
  const date = $('.goodstudy-box-detail > .d-flex').first().text().match(/(\d{2})-(\d{2})-(\d{4})/);
  if (!title || !body.length || !date) throw new Error(`Missing article fields: ${url}`);
  const category = clean($('a[href*="-cn"]').first().text());
  articles.push({ id: `legacy-${id}`, legacyId: id, title, category, created_at: `${date[3]}-${date[2]}-${date[1]}`, source: url, originalHtml: body.html(), thumbnail: $('meta[property="og:image"]').attr('content') });
  console.log(`Article ${id}: ${title.slice(0, 65)}`);
}
await writeFile(`${cacheDir}/discovery.json`, JSON.stringify({ pages: [...visited], articles }, null, 2));
console.log(`Discovered ${articles.length} articles across ${visited.size} pages.`);
if (process.argv.includes('--discover')) process.exit(0);

const preservedSlugs = {153:'lhu-career-fair-2026',152:'vinh-danh-cambridge-2026',150:'chung-ket-hung-bien-tieng-anh-dong-nai-2026',149:'summer-school-2026-cham-nghe-tuong-lai',144:'khai-truong-vmg-phuoc-tan'};
for (const article of articles) {
  article.slug = preservedSlugs[article.legacyId] || `${article.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${article.legacyId}`;
}
const byId = new Map(articles.map(a => [a.legacyId, a]));
const assets = new Map();
const failures = [];
await mkdir('public/legacy/news', { recursive: true });
await mkdir('src/data/news', { recursive: true });
async function asset(src, base) {
  const url = new URL(src, base).href;
  if (assets.has(url)) return assets.get(url);
  const job = (async () => {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    const file = `/legacy/news/${hash(url)}${ext === '.gif' ? '.gif' : '.webp'}`;
    try {
      try { await readFile(`public${file}`); } catch {
        const response = await request(url, 12000);
        if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error('Not an image');
        const buffer = Buffer.from(await response.arrayBuffer());
        await writeFile(`public${file}`, ext === '.gif' ? buffer : await sharp(buffer).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:85}).toBuffer());
      }
      return file;
    } catch (error) { failures.push({url,error:String(error)}); console.log('Unavailable image:', url.split('?')[0]); return null; }
  })();
  assets.set(url, job);
  return job;
}
const allowed = new Set('p div span br strong b em i u s h2 h3 h4 h5 h6 ul ol li blockquote table thead tbody tfoot tr th td figure figcaption img iframe a hr sub sup'.split(' '));
async function importArticle(article) {
  const $ = load(article.originalHtml, null, false);
  $('script,style,form,input,button,object,embed,svg').remove();
  $('iframe').each((_, el) => {
    const src = $(el).attr('src');
    if (src && /^https:\/\/(www\.)?youtube(?:-nocookie)?\.com\/embed\/[\w-]+/.test(src)) return;
    const link = $('<a>').text('Xem video trong bài viết');
    if (src) link.attr('href', src);
    $(el).replaceWith(link);
  });
  for (const el of $('*').toArray()) {
    if (!allowed.has(el.tagName)) { $(el).replaceWith($(el).contents()); continue; }
    const attrs = {...el.attribs};
    for (const key of Object.keys(attrs)) $(el).removeAttr(key);
    if (el.tagName === 'iframe') $(el).attr({src:attrs.src.replace('www.youtube.com','www.youtube-nocookie.com'),title:attrs.title || 'Video trong bài viết',loading:'lazy',allowfullscreen:'',referrerpolicy:'strict-origin-when-cross-origin'});
    if (el.tagName === 'img') {
      // Old Facebook posts contain tiny emoji images. Keep them inline instead
      // of treating them as full-width editorial photographs.
      const isEmoji = /\/images\/emoji/.test(attrs.src || '') || (Number(attrs.width) <= 32 && Number(attrs.width) > 0);
      const src = attrs.src || attrs['data-src'];
      const local = src ? await asset(src, article.source) : null;
      if (local) {
        $(el).attr({src:local, alt:attrs.alt || '', loading:'lazy', decoding:'async'});
        if (isEmoji) $(el).addClass('news-inline-emoji');
      }
      else $(el).remove();
    }
    if (el.tagName === 'a' && attrs.href) {
      try {
        let url = new URL(attrs.href, article.source);
        if (url.hostname === 'l.facebook.com' && url.searchParams.has('u')) url = new URL(url.searchParams.get('u'));
        if (['http:','https:','mailto:','tel:'].includes(url.protocol)) {
          const target = url.origin === origin && byId.get(url.pathname.match(/-n(\d+)\.html$/)?.[1]);
          $(el).attr('href', target ? `/tin-tuc/${target.slug}` : url.origin === origin && url.pathname === '/' ? '/' : url.href);
          if (url.origin !== origin && url.protocol.startsWith('http')) $(el).attr({target:'_blank',rel:'noopener noreferrer'});
        }
      } catch { /* Malformed legacy links are left as text. */ }
    }
    if (['td','th'].includes(el.tagName)) for (const key of ['colspan','rowspan']) if (/^\d{1,2}$/.test(attrs[key] || '')) $(el).attr(key,attrs[key]);
  }
  $('p').each((_,el)=>{ if (!clean($(el).text()) && !$(el).find('img,br').length) $(el).remove(); });
  article.paragraphs = [$('p').map((_,el)=>clean($(el).text())).get().find(t=>t.length > 80) || clean($.root().text()).slice(0,300)];
  article.image_url = $('img:not(.news-inline-emoji)').first().attr('src') || (article.thumbnail ? await asset(article.thumbnail, article.source) : null);
  await writeFile(`src/data/news/${article.legacyId}.json`, JSON.stringify({html:$.html()},null,2)+'\n');
  console.log(`Imported ${article.legacyId}, ${$('img').length} images`);
}
let nextArticle = 0;
await Promise.all(Array.from({length:4}, async () => {
  while (nextArticle < articles.length) await importArticle(articles[nextArticle++]);
}));
articles.sort((a,b)=>b.created_at.localeCompare(a.created_at) || Number(b.legacyId)-Number(a.legacyId));
const index = articles.map(({originalHtml: _originalHtml,thumbnail: _thumbnail,...article})=>article);
await writeFile('src/data/legacyNews.ts', '// Generated by scripts/import-legacy-news.mjs. Source URLs are retained for internal provenance.\nexport const LEGACY_NEWS = '+JSON.stringify(index,null,2)+';\n');
const sitemap = await readFile('public/sitemap.xml', 'utf8');
const withoutArticles = sitemap.replace(/\s*<url><loc>https:\/\/vmgenglish.edu.vn\/tin-tuc\/[^<]+<\/loc>[\s\S]*?<\/url>/g, '');
await writeFile('public/sitemap.xml', withoutArticles.replace('</urlset>', index.map(a=>`  <url><loc>${origin}/tin-tuc/${a.slug}</loc><lastmod>${a.created_at}</lastmod></url>`).join('\n')+'\n</urlset>'));
await writeFile('docs/context/LEGACY_NEWS_IMPORT.json', JSON.stringify({ importedAt:new Date().toISOString(), articleCount:articles.length, listingPages:[...visited].filter(u=>!/-n\d+\.html$/.test(u)), assetCount:assets.size, failures, articles:index.map(({id,source,title})=>({id,source,title})) },null,2)+'\n');
console.log(`DONE: ${articles.length} articles; ${assets.size} assets; ${failures.length} asset failures.`);
