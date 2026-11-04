"""Render 1200x630 link-preview images for the portfolio with headless Chrome.

Usage: python3 tools/build_og.py [slug ...]   (no args = all)
Writes <portfolio>/assets/og/<slug>.jpg
"""
import html, subprocess, sys, pathlib, tempfile

PORT = pathlib.Path(__file__).resolve().parent.parent
HERE = pathlib.Path(tempfile.mkdtemp())
OUT = PORT / 'assets/og'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

PAGES = [
    dict(slug='home', l1='Shahzaib', l2='Siddiqui',
         desc='Product manager, most recently CEO at Sirge. I find the problem in the evidence, test the fix, and keep it or kill it.',
         chip='Open to senior PM roles', img='photos/portrait.png', kind='portrait'),
    dict(slug='ai-conversion-audit', l1='AI Conversion Audit', l2='& Recommendation Engine',
         desc='Turning a churning analytics tool into an audit that tells merchants exactly what to fix, and in what order.',
         chip='+18% CVR in 30 days', img='cases/ai-conversion-audit.png'),
    dict(slug='first-party-attribution', l1='First-Party Attribution', l2='& PostTrack',
         desc='Closing a 35% gap between platform-reported ROAS and what actually landed in Shopify after iOS 14.',
         chip='35% → <3% variance', img='cases/first-party-attribution.png'),
    dict(slug='campaign-optimization', l1='Cross-Platform Campaign', l2='Optimization Engine',
         desc='Six browser tabs every morning, folded into one screen with the controls built in.',
         chip='45 min → 15 min daily', img='cases/campaign-optimization.png'),
    dict(slug='gigli-functional-build', l1='Gigli:', l2='One brand, two stores',
         desc='A new Shopify store built from Figma into 29 verified Liquid sections in one overnight agent run, then polished by humans to launch.',
         chip='4 ad platforms approved · 261 redirects', img='cases/gigli-functional.png'),
    dict(slug='shop-manager', l1='Shop Manager', l2='Behavioural CRO Engine',
         desc='Session recordings nobody has time to watch, turned into a weekly report ranked in dollars.',
         chip='+20% CVR in 8 weeks', img='cases/shop-manager.png'),
    dict(slug='scripts-to-functions-audit', l1='Scripts to', l2='Functions Audit',
         desc='Shopify switched Scripts off on June 30, 2026. This audit finds what each store lost and how to restore it.',
         cmd='npx skills add ShahzDevAventures/scripts-to-functions-audit', img='skills/scripts-to-functions-audit-report.png'),
    dict(slug='agentic-accuracy-audit', l1='Agentic', l2='Accuracy Audit',
         desc='Checks what AI shopping agents see about a Shopify store against what shoppers see on the site.',
         cmd='npx skills add ShahzDevAventures/agentic-accuracy-audit', img='skills/agentic-accuracy-audit-report.png'),
    dict(slug='shopify-seo-audit', l1='Shopify SEO', l2='Audit',
         desc='A Shopify store URL in, a ranked SEO fix list out: theme fixes for a developer, admin fixes for the merchant.',
         cmd='npx skills add ShahzDevAventures/shopify-seo-audit', img='skills/shopify-seo-audit-report.png'),
    dict(slug='cro-audit-skill', l1='Shopify CRO', l2='Audit',
         desc='A conversion audit for Shopify stores: the six most expensive failures first, then the full store, ranked by revenue impact.',
         cmd='npx skills add ShahzDevAventures/cro-audit-skill', img='skills/cro-audit-skill-report.png'),
]

TEMPLATE = r"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..500&family=JetBrains+Mono:wght@400;500&family=Anton&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#111112}
body{position:relative;color:#F2EFE8;font-family:'Fraunces',Georgia,serif}
.stripe{position:absolute;left:0;top:0;right:0;height:6px;background:#D2FF00}
.text{position:absolute;left:64px;top:70px;width:__TW__px;bottom:64px;display:flex;flex-direction:column}
h1{font-family:'Anton',Impact,sans-serif;font-weight:400;text-transform:uppercase;line-height:1;letter-spacing:-.005em;font-size:88px}
h1 span{display:block;text-wrap:balance}
h1 .acc{color:#D2FF00}
.desc{margin-top:26px;font-size:25px;line-height:1.32;font-weight:350;color:rgba(242,239,232,.86)}
.chip{margin-top:28px;align-self:flex-start;background:#D2FF00;color:#111112;font:500 17px/1 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;padding:11px 14px}
.cmd{margin-top:28px;align-self:flex-start;border:1px solid rgba(242,239,232,.28);font:400 15px/1 'JetBrains Mono',monospace;padding:12px 14px;color:#F2EFE8;white-space:nowrap}
.cmd b{color:#D2FF00;font-weight:400}
.by{margin-top:auto;padding-top:28px;font:400 15px/1.5 'JetBrains Mono',monospace;letter-spacing:.04em;color:rgba(242,239,232,.6)}
.shot{position:absolute;left:__SX__px;top:70px;right:-2px;bottom:-2px;border:1px solid rgba(242,239,232,.22);border-right:none;border-bottom:none;overflow:hidden;background:#F2EFE8}
.shot img{width:100%;height:100%;object-fit:cover;object-position:left top;display:block}
.portrait{position:absolute;right:40px;bottom:0;height:590px}
</style></head><body>
<div class="stripe"></div>
<div class="text" id="t">
  <h1 id="h"><span>__L1__</span><span class="acc">__L2__</span></h1>
  <p class="desc" id="d">__DESC__</p>
  __EXTRA__
  <div class="by">Shahzaib Siddiqui · shahzsiddiqui.vercel.app</div>
</div>
__IMG__
<script>
// Shrink the title, then the description, until the text column fits.
document.fonts.ready.then(()=>{
  const t=document.getElementById('t'), h=document.getElementById('h'), d=document.getElementById('d');
  const fits=()=>h.scrollWidth<=t.clientWidth && t.scrollHeight<=t.clientHeight+2 && [...h.children].every(s=>s.scrollWidth<=t.clientWidth);
  const lines=()=>Math.round(h.offsetHeight/parseFloat(getComputedStyle(h).lineHeight)); let fs=88; while((!fits()||lines()>3) && fs>48){fs-=2; h.style.fontSize=fs+'px';}
  let ds=25; while(!fits() && ds>18){ds-=1; d.style.fontSize=ds+'px';}
  document.title='ready '+fs+' '+ds+' '+lines()+'L '+(fits()?'fits':'OVERFLOW');
});
</script></body></html>"""


def render(p):
    portrait = p.get('kind') == 'portrait'
    tw = 640 if portrait else 560
    sx = 700
    if 'chip' in p:
        extra = f'<div class="chip">{html.escape(p["chip"])}</div>'
    else:
        cmd = html.escape(p['cmd']).replace('npx skills add', '<b>npx skills add</b>')
        extra = f'<div class="cmd">{cmd}</div>'
    src = (PORT / 'assets' / p['img']).as_uri()
    img = (f'<img class="portrait" src="{src}" alt="">' if portrait
           else f'<div class="shot"><img src="{src}" alt=""></div>')
    doc = (TEMPLATE.replace('__TW__', str(tw)).replace('__SX__', str(sx))
           .replace('__L1__', html.escape(p['l1'])).replace('__L2__', html.escape(p['l2']))
           .replace('__DESC__', html.escape(p['desc'])).replace('__EXTRA__', extra)
           .replace('__IMG__', img))
    hp = HERE / f'{p["slug"]}.html'
    hp.write_text(doc)
    png = HERE / f'{p["slug"]}.png'
    subprocess.run([CHROME, '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1',
                    '--allow-file-access-from-files', '--virtual-time-budget=10000',
                    '--window-size=1200,630', f'--screenshot={png}', hp.as_uri()],
                   check=True, capture_output=True)
    # title tells us whether the text fit; dump it via a second headless call
    t = subprocess.run([CHROME, '--headless=new', '--virtual-time-budget=10000', '--window-size=1200,630',
                        '--allow-file-access-from-files', '--dump-dom', hp.as_uri()],
                       capture_output=True, text=True).stdout
    status = t.split('<title>')[1].split('</title>')[0] if '<title>' in t else 'no-title'
    jpg = OUT / f'{p["slug"]}.jpg'
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '86', str(png), '--out', str(jpg)],
                   check=True, capture_output=True)
    print(f'{p["slug"]:28} {status:20} {jpg.stat().st_size // 1024} KB')


if __name__ == '__main__':
    want = set(sys.argv[1:])
    for p in PAGES:
        if not want or p['slug'] in want:
            render(p)
