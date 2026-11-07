import { useMemo, useState } from 'react';
import { ARTICLES, Article } from './data/articles';
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronRight, Clock3, Mail, Menu, Search, Share2, X } from 'lucide-react';

const nav = ['Build Your Business', 'Start a Side Hustle', 'Franchises', 'Business News'] as const;
type Nav = typeof nav[number] | 'Latest';

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="/" onClick={e=>{e.preventDefault();window.location.hash='';window.location.reload();}} className="flex items-center gap-2.5 shrink-0" aria-label="Entrepreneur home">
    <span className="grid grid-cols-3 gap-[2px] w-7 h-7">{Array.from({length:9},(_,i)=><i key={i} className="bg-[#1d40b0] rounded-[1px]"/>)}</span>
    <span className={`font-serif text-[27px] sm:text-[30px] font-bold tracking-[-1.2px] ${inverse?'text-white':'text-[#111]'}`}>Entrepreneur<span className="text-[10px] align-super ml-0.5">®</span></span>
  </a>;
}

function ImageArt({article, variant=0}:{article:Article;variant?:number}) {
  const backgrounds = ['#f4e5c9','#e6ece8','#e7e9f1'];
  return <div className="relative overflow-hidden aspect-[16/10] rounded-lg border border-slate-200/70" style={{backgroundColor:backgrounds[variant%3]}}>
    <svg viewBox="0 0 640 400" className="w-full h-full" role="img" aria-label={article.title}>
      <defs>
        <linearGradient id={`art-bg-${article.id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={backgrounds[variant%3]}/><stop offset="1" stopColor="#fff" stopOpacity=".35"/></linearGradient>
        <linearGradient id="art-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3459c9"/><stop offset="1" stopColor="#172f83"/></linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#art-bg-${article.id})`}/>
      <circle cx="520" cy="72" r="110" fill="#fff" opacity=".22"/>
      {article.id==='gen-z-greenwashing-authenticity' ? <>
        <path d="M70 330V218l55-28 50 28v112Z" fill="#4d9a50"/><path d="M95 218v-54h26v54M142 218v-36h24v36" fill="#397e42"/><path d="M70 250h105M70 288h105" stroke="#f4e5c9" strokeWidth="12"/><path d="M95 330v-34h28v34M142 330v-34h28v34" fill="#f4e5c9"/><path d="M340 112l150 52-16 42-150-52Z" fill="#c6a27c"/><path d="M490 164l70 24-17 46-69-28Z" fill="#9a9a9a"/><path d="M530 182l75 24-28 70-75-24Z" fill="#77bd25"/><path d="M75 125c24-37 50-42 78-13-23 34-49 39-78 13Z" fill="#77ad51"/><path d="M115 128l-23 37" stroke="#397e42" strokeWidth="5"/>
      </> : article.id==='social-media-team-training' ? <>
        <rect x="95" y="75" width="270" height="245" rx="18" fill="#fff" stroke="#243b75" strokeWidth="5"/><rect x="125" y="110" width="112" height="13" rx="6" fill="#3459c9"/><rect x="125" y="143" width="205" height="9" rx="4" fill="#d5dce7"/><rect x="125" y="164" width="170" height="9" rx="4" fill="#d5dce7"/><rect x="125" y="198" width="205" height="90" rx="10" fill="#e7edf7"/><path d="M145 268l48-39 36 19 48-35 38 55Z" fill="#3459c9"/><circle cx="465" cy="198" r="88" fill="#3459c9"/><path d="M420 200l30 30 63-69" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
      </> : article.id==='founder-hired-you-to-lead' ? <>
        <path d="M160 215h320" stroke="#7d8ba8" strokeWidth="8" strokeDasharray="16 16"/><circle cx="170" cy="190" r="75" fill="#172f83"/><circle cx="470" cy="190" r="75" fill="#3459c9"/><circle cx="320" cy="215" r="50" fill="#fff" stroke="#3459c9" strokeWidth="8"/><path d="M292 215h56m-28-28v56" stroke="#3459c9" strokeWidth="8" strokeLinecap="round"/><path d="M125 300h90M425 300h90" stroke="#c1a27c" strokeWidth="10" strokeLinecap="round"/>
      </> : article.id==='ai-search-google-still-matters' ? <>
        <rect x="85" y="80" width="470" height="80" rx="40" fill="#fff" stroke="#263b74" strokeWidth="5"/><circle cx="135" cy="120" r="17" fill="none" stroke="#3459c9" strokeWidth="7"/><path d="M148 133l17 17" stroke="#3459c9" strokeWidth="7" strokeLinecap="round"/><rect x="195" y="108" width="240" height="22" rx="11" fill="#d8deea"/><rect x="110" y="205" width="190" height="110" rx="14" fill="url(#art-blue)"/><rect x="340" y="205" width="190" height="110" rx="14" fill="#fff" stroke="#3459c9" strokeWidth="4"/><path d="M145 250h120M145 274h80M375 250h120M375 274h80" stroke="#fff" strokeWidth="9" strokeLinecap="round"/><path d="M375 250h120M375 274h80" stroke="#3459c9" strokeWidth="9" strokeLinecap="round"/>
      </> : article.id==='familiar-neighborhood-spot-spend-less' ? <>
        <path d="M130 175l190-95 190 95" fill="#3459c9" stroke="#172f83" strokeWidth="7"/><rect x="155" y="175" width="330" height="175" fill="#fff" stroke="#172f83" strokeWidth="7"/><rect x="280" y="250" width="80" height="100" fill="#e7d5b6"/><rect x="185" y="210" width="70" height="65" fill="#dbe8e5" stroke="#3459c9" strokeWidth="5"/><rect x="385" y="210" width="70" height="65" fill="#dbe8e5" stroke="#3459c9" strokeWidth="5"/><path d="M150 175h340" stroke="#f0c36d" strokeWidth="15"/>
      </> : article.id==='7-simple-ways-business-resilient' ? <>
        <rect x="110" y="250" width="55" height="95" rx="6" fill="#9aa8bc"/><rect x="195" y="210" width="55" height="135" rx="6" fill="#7587a3"/><rect x="280" y="165" width="55" height="180" rx="6" fill="#526b91"/><rect x="365" y="115" width="55" height="230" rx="6" fill="#3459c9"/><path d="M115 215l105-55 90-42 110-65" fill="none" stroke="#172f83" strokeWidth="9" strokeLinecap="round"/><path d="M410 53l17 0-3 19" fill="none" stroke="#172f83" strokeWidth="9" strokeLinecap="round"/>
      </> : article.id==='violinist-snoops-10k-ice-cream-taster' ? <>
        <circle cx="280" cy="112" r="45" fill="#b77e61"/><path d="M220 170q60-50 120 0l42 160H178Z" fill="#25304a"/><path d="M345 182l120 90-25 35-125-85Z" fill="#9a623e"/><ellipse cx="465" cy="300" rx="48" ry="20" fill="#9a623e"/><path d="M435 255l40 30M455 240l40 30" stroke="#f0d4a9" strokeWidth="8"/><path d="M240 80q45-60 90 0" fill="none" stroke="#4b302b" strokeWidth="18" strokeLinecap="round"/><circle cx="520" cy="100" r="36" fill="#f2c66d" opacity=".8"/>
      </> : <>
        <path d="M220 110h200l35 220H185Z" fill="#fff" stroke="#25304a" strokeWidth="6"/><path d="M220 110h200l-8 55H228Z" fill="#3459c9"/><path d="M240 200h160M240 230h130M240 260h150" stroke="#d5dce7" strokeWidth="12" strokeLinecap="round"/><path d="M260 310l35-50 30 22 45-55 38 83Z" fill="#c67b50"/>
      </>}
    </svg>
  </div>;
}
function App() {
  const [active, setActive] = useState<Article|null>(null);
  const [category, setCategory] = useState<Nav>('Latest');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const visible = useMemo(()=>ARTICLES.filter(a=>(category==='Latest'||a.navGroup===category)&&(!query||[a.title,a.subtitle,a.category,a.author].join(' ').toLowerCase().includes(query.toLowerCase()))),[category,query]);
  const featured = ARTICLES.find(a=>a.placement==='featured') || ARTICLES[0];
  const latest = ARTICLES.filter(a=>a.placement==='latest');
  const side = ARTICLES.filter(a=>a.placement==='side');
  const openArticle = (a:Article)=>{setActive(a);window.history.replaceState(null,'',`#/article/${a.id}`);window.scrollTo({top:0,behavior:'smooth'});};
  const closeArticle = ()=>{setActive(null);window.history.replaceState(null,'',window.location.pathname);};
  const toggleSave = (id:string)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const share = async()=>{try{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),1800);}catch{}};
  const articleCard=(a:Article,i:number)=><button key={a.id} onClick={()=>openArticle(a)} className="text-left group w-full">
    <ImageArt article={a} variant={i%3}/>
    <p className="mt-3 text-[10px] font-extrabold tracking-[.13em] text-[#1d40b0] uppercase">{a.category}</p>
    <h3 className="mt-1.5 font-serif text-[21px] leading-[1.2] font-bold tracking-[-.35px] group-hover:text-[#1d40b0] transition-colors">{a.title}</h3>
    <p className="mt-2 text-[13px] leading-6 text-slate-500 line-clamp-2">{a.subtitle}</p>
  </button>;
  return <div className="min-h-screen bg-white">
    <header className="border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-5">
        <Brand/>
        <div className="hidden md:flex items-center gap-3"><button className="text-xs font-bold border border-slate-300 px-4 py-2 rounded hover:border-slate-500">Press Releases</button><button className="text-xs font-bold bg-[#1d40b0] text-white px-4 py-2 rounded hover:bg-[#142d82]">Get All Access</button></div>
        <div className="flex items-center gap-4"><button aria-label="Search" onClick={()=>setSearchOpen(v=>!v)}><Search size={19}/></button><button aria-label="Menu" className="md:hidden" onClick={()=>setMenuOpen(v=>!v)}><Menu size={21}/></button><a className="hidden sm:block text-xs font-semibold" href="mailto:editorial@example.com"><Mail size={16} className="inline mr-1"/> Newsletters</a></div>
      </div>
      <nav className="max-w-[1440px] mx-auto px-5 sm:px-8 py-3 border-t border-slate-100 hidden md:flex gap-8">{nav.map(n=><button key={n} onClick={()=>{setCategory(n);setActive(null);}} className={`text-[11px] font-extrabold tracking-[.08em] uppercase hover:text-[#1d40b0] ${category===n?'text-[#1d40b0]':'text-slate-800'}`}>{n}</button>)}</nav>
      {menuOpen&&<div className="md:hidden px-5 pb-4 grid gap-3">{nav.map(n=><button key={n} onClick={()=>{setCategory(n);setMenuOpen(false);}} className="text-left text-xs font-bold uppercase">{n}</button>)}</div>}
      {searchOpen&&<div className="max-w-[1440px] mx-auto px-5 sm:px-8 pb-4"><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search stories, topics, authors..." className="w-full border-b border-slate-300 py-3 outline-none text-sm"/></div>}
    </header>
    <div className="bg-[#1d40b0] text-white text-center py-2.5 text-[11px] sm:text-xs font-semibold tracking-wide">Free Event: Find the Waste in Your Budget →</div>
    {active ? <main className="max-w-[850px] mx-auto px-5 py-8 sm:py-14">
      <button onClick={closeArticle} className="flex items-center gap-2 text-xs font-bold text-[#1d40b0] mb-8"><ArrowLeft size={16}/> BACK TO STORIES</button>
      <p className="text-[11px] tracking-[.14em] font-extrabold text-[#1d40b0]">{active.category}</p>
      <h1 className="font-serif text-[36px] sm:text-[54px] leading-[1.06] font-bold tracking-[-1.5px] mt-4">{active.title}</h1>
      <p className="text-lg sm:text-xl leading-8 text-slate-600 mt-5">{active.subtitle}</p>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4 my-7 text-xs text-slate-500"><span>BY <b className="text-slate-900">{active.author}</b> · {active.publishedAt} · {active.readTime}</span><div className="flex gap-4"><button onClick={()=>toggleSave(active.id)} aria-label="Save article"><Bookmark size={17} fill={saved.includes(active.id)?'currentColor':'none'}/></button><button onClick={share} aria-label="Share article">{copied?<Check size={17}/>:<Share2 size={17}/>}</button></div></div>
      <ImageArt article={featured}/>
      <p className="text-[10px] text-slate-400 mt-2 mb-8">Illustrative editorial artwork</p>
      <blockquote className="font-serif text-2xl sm:text-3xl leading-snug border-l-4 border-[#1d40b0] pl-5 py-2 my-10">{active.pullQuote}</blockquote>
      <h2 className="font-serif text-2xl font-bold mb-4">What you need to know</h2><ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 mb-10">{active.keyTakeaways.map(t=><li key={t}>{t}</li>)}</ul>
      <div className="max-w-[720px] space-y-6 text-[16px] leading-[1.9] text-slate-700">{active.body.map((p,i)=><p key={i}>{p}</p>)}</div>
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center"><span className="text-xs text-slate-500">Continue exploring</span><button onClick={closeArticle} className="flex items-center gap-2 text-sm font-bold text-[#1d40b0]">More stories <ArrowRight size={16}/></button></div>
    </main> : <main className="max-w-[1440px] mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <div className="flex items-end justify-between gap-4 mb-7"><div><p className="text-[10px] font-extrabold tracking-[.18em] text-[#1d40b0] uppercase">The business of being in business</p><h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-2">{category==='Latest'?'Latest stories':category}</h1></div><span className="hidden sm:block text-[10px] text-slate-400 tracking-widest uppercase">Ideas for what’s next</span></div>
      {category==='Latest'&&!query&&<section className="grid lg:grid-cols-[minmax(230px,295px)_minmax(0,1fr)_minmax(230px,295px)] gap-6 xl:gap-8 pb-10 border-b border-slate-200 items-start">
        <aside className="order-2 lg:order-1"><div className="flex justify-between items-center mb-3"><h2 className="font-serif text-2xl font-bold">Latest</h2><span className="text-[10px] font-bold tracking-widest text-slate-400">RECENT</span></div>{latest.map((a,i)=><button key={a.id} onClick={()=>openArticle(a)} className="block text-left w-full py-4 border-b border-slate-200 group"><span className="block text-[10px] font-extrabold tracking-wider text-[#1d40b0] mb-1">{a.category}</span><span className="font-semibold text-[15px] leading-snug group-hover:text-[#1d40b0]">{a.title}</span></button>)}</aside>
        <article className="order-1 lg:order-2 cursor-pointer group bg-[#f8fafc] border border-slate-100 rounded-xl px-5 sm:px-7 pt-7 pb-6 shadow-[0_2px_24px_rgba(15,23,42,0.06)]" onClick={()=>openArticle(featured)}><p className="text-center text-[10px] font-extrabold tracking-[.16em] text-[#1d40b0]">{featured.category}</p><h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-1px] text-center mt-3 group-hover:text-[#1d40b0]">{featured.title}</h2><p className="text-center text-xs text-slate-500 mt-4 mb-6">BY <b className="text-slate-800">{featured.author}</b> · {featured.readTime}</p><ImageArt/><p className="text-center text-sm leading-6 text-slate-500 mt-5 max-w-xl mx-auto">{featured.subtitle}</p><div className="text-center mt-4 text-xs font-extrabold tracking-wider text-[#1d40b0]">READ THE STORY <ArrowRight size={14} className="inline ml-1"/></div></article>
        <aside className="order-3 space-y-7">{side.map((a,i)=><button key={a.id} onClick={()=>openArticle(a)} className="text-left w-full group"><ImageArt article={a} variant={i+1}/><p className="text-[10px] font-extrabold tracking-wider text-[#1d40b0] mt-3">{a.category}</p><h3 className="font-serif font-bold text-xl leading-tight mt-1 group-hover:text-[#1d40b0]">{a.title}</h3></button>)}</aside>
      </section>}
      <section className="pt-9"><div className="flex items-center justify-between mb-6"><h2 className="font-serif text-2xl font-bold">{query?'Search results':category==='Latest'?'More to explore':category}</h2><span className="text-xs text-slate-400">{visible.length} stories</span></div>{visible.length?<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">{visible.filter(a=>category!=='Latest'||query||a.id!==featured.id).map(articleCard)}</div>:<p className="py-16 text-center text-slate-500">No stories found. Try another search.</p>}</section>
    </main>}
    <footer className="bg-[#101827] text-white mt-16"><div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-10"><div className="flex flex-col sm:flex-row justify-between gap-6"><div><Brand inverse/><p className="text-xs text-slate-400 mt-4 max-w-sm leading-6">Ideas, insight and inspiration for entrepreneurs building what comes next.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-300">{nav.map(n=><button key={n} onClick={()=>{setCategory(n);setActive(null);window.scrollTo(0,0);}}>{n}</button>)}</div></div><div className="border-t border-white/10 mt-9 pt-5 text-[10px] text-slate-500 flex justify-between"><span>© 2026 Entrepreneur. All rights reserved.</span><span>Independent editorial concept</span></div></div></footer>
  </div>;
}
export default App;
