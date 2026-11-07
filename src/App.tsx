import { useMemo, useState } from 'react';
import { ARTICLES, Article } from './data/articles';
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronRight, Clock3, Mail, Menu, Search, Share2, X } from 'lucide-react';

const nav = ['Build Your Business', 'Start a Side Hustle', 'Franchises', 'Business News'] as const;
type Nav = typeof nav[number] | 'Latest';

function Brand() {
  return <a href="/" onClick={e=>{e.preventDefault();window.location.hash='';window.location.reload();}} className="flex items-center gap-2.5 shrink-0" aria-label="Entrepreneur home">
    <span className="grid grid-cols-3 gap-[2px] w-7 h-7">{Array.from({length:9},(_,i)=><i key={i} className="bg-[#1d40b0] rounded-[1px]"/>)}</span>
    <span className="font-serif text-[27px] sm:text-[30px] font-bold tracking-[-1.2px] text-[#111]">Entrepreneur<span className="text-[10px] align-super ml-0.5">®</span></span>
  </a>;
}
function ImageArt({variant=0}:{variant?:number}) {
  return <div className={`relative overflow-hidden aspect-[16/10] rounded-lg ${variant===1?'bg-gradient-to-br from-[#e6c5a0] via-[#b97c51] to-[#f1d5b5]':variant===2?'bg-gradient-to-br from-slate-700 via-slate-900 to-black':'bg-gradient-to-br from-[#d9e6d4] via-[#f0dfb8] to-[#e8b58a]'}`}>
    <div className="absolute inset-0 opacity-40" style={{backgroundImage:'radial-gradient(circle at 25% 30%,white 0 2px,transparent 3px),radial-gradient(circle at 70% 65%,white 0 1px,transparent 2px)',backgroundSize:'42px 42px'}}/>
    <div className="absolute bottom-0 left-[12%] w-[28%] h-[48%] bg-[#2f754c]/80 rounded-t-md"/>
    <div className="absolute bottom-[48%] left-[16%] w-[8%] h-[20%] bg-[#2f754c]/80"/>
    <div className="absolute bottom-[48%] left-[28%] w-[6%] h-[14%] bg-[#2f754c]/80"/>
    <div className="absolute right-[20%] bottom-[14%] w-[12%] h-[66%] rotate-[24deg] rounded-full bg-[#b58a5b] shadow-xl"/>
    <div className="absolute right-[12%] bottom-[70%] w-[27%] h-[23%] -rotate-[18deg] rounded-t-full bg-[#3b8b55]"/>
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
    <ImageArt variant={i%3}/>
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
    <div className="bg-[#1d40b0] text-white text-center py-2.5 text-[11px] sm:text-xs font-semibold tracking-wide">IDEAS, INSIGHT & INSPIRATION FOR THE NEXT GENERATION OF BUSINESS</div>
    {active ? <main className="max-w-[850px] mx-auto px-5 py-8 sm:py-14">
      <button onClick={closeArticle} className="flex items-center gap-2 text-xs font-bold text-[#1d40b0] mb-8"><ArrowLeft size={16}/> BACK TO STORIES</button>
      <p className="text-[11px] tracking-[.14em] font-extrabold text-[#1d40b0]">{active.category}</p>
      <h1 className="font-serif text-[36px] sm:text-[54px] leading-[1.06] font-bold tracking-[-1.5px] mt-4">{active.title}</h1>
      <p className="text-lg sm:text-xl leading-8 text-slate-600 mt-5">{active.subtitle}</p>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4 my-7 text-xs text-slate-500"><span>BY <b className="text-slate-900">{active.author}</b> · {active.publishedAt} · {active.readTime}</span><div className="flex gap-4"><button onClick={()=>toggleSave(active.id)} aria-label="Save article"><Bookmark size={17} fill={saved.includes(active.id)?'currentColor':'none'}/></button><button onClick={share} aria-label="Share article">{copied?<Check size={17}/>:<Share2 size={17}/>}</button></div></div>
      <ImageArt/>
      <p className="text-[10px] text-slate-400 mt-2 mb-8">Illustrative editorial artwork</p>
      <blockquote className="font-serif text-2xl sm:text-3xl leading-snug border-l-4 border-[#1d40b0] pl-5 py-2 my-10">{active.pullQuote}</blockquote>
      <h2 className="font-serif text-2xl font-bold mb-4">What you need to know</h2><ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 mb-10">{active.keyTakeaways.map(t=><li key={t}>{t}</li>)}</ul>
      <div className="max-w-[720px] space-y-6 text-[16px] leading-[1.9] text-slate-700">{active.body.map((p,i)=><p key={i}>{p}</p>)}</div>
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center"><span className="text-xs text-slate-500">Continue exploring</span><button onClick={closeArticle} className="flex items-center gap-2 text-sm font-bold text-[#1d40b0]">More stories <ArrowRight size={16}/></button></div>
    </main> : <main className="max-w-[1440px] mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <div className="flex items-end justify-between gap-4 mb-7"><div><p className="text-[10px] font-extrabold tracking-[.18em] text-[#1d40b0] uppercase">The business of being in business</p><h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-2">{category==='Latest'?'Latest stories':category}</h1></div><span className="hidden sm:block text-[10px] text-slate-400 tracking-widest uppercase">Ideas for what’s next</span></div>
      {category==='Latest'&&!query&&<section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.08fr)_minmax(220px,.72fr)] gap-7 lg:gap-9 pb-10 border-b border-slate-200">
        <aside className="order-2 lg:order-1"><div className="flex justify-between items-center mb-3"><h2 className="font-serif text-2xl font-bold">Latest</h2><span className="text-[10px] font-bold tracking-widest text-slate-400">RECENT</span></div>{latest.map((a,i)=><button key={a.id} onClick={()=>openArticle(a)} className="block text-left w-full py-4 border-b border-slate-200 group"><span className="block text-[10px] font-extrabold tracking-wider text-[#1d40b0] mb-1">{a.category}</span><span className="font-semibold text-[15px] leading-snug group-hover:text-[#1d40b0]">{a.title}</span></button>)}</aside>
        <article className="order-1 lg:order-2 cursor-pointer group" onClick={()=>openArticle(featured)}><p className="text-center text-[10px] font-extrabold tracking-[.16em] text-[#1d40b0]">{featured.category}</p><h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-1px] text-center mt-3 group-hover:text-[#1d40b0]">{featured.title}</h2><p className="text-center text-xs text-slate-500 mt-4 mb-6">BY <b className="text-slate-800">{featured.author}</b> · {featured.readTime}</p><ImageArt/><p className="text-center text-sm leading-6 text-slate-500 mt-5 max-w-xl mx-auto">{featured.subtitle}</p><div className="text-center mt-4 text-xs font-extrabold tracking-wider text-[#1d40b0]">READ THE STORY <ArrowRight size={14} className="inline ml-1"/></div></article>
        <aside className="order-3 space-y-7">{side.map((a,i)=><button key={a.id} onClick={()=>openArticle(a)} className="text-left w-full group"><ImageArt variant={i+1}/><p className="text-[10px] font-extrabold tracking-wider text-[#1d40b0] mt-3">{a.category}</p><h3 className="font-serif font-bold text-xl leading-tight mt-1 group-hover:text-[#1d40b0]">{a.title}</h3></button>)}</aside>
      </section>}
      <section className="pt-9"><div className="flex items-center justify-between mb-6"><h2 className="font-serif text-2xl font-bold">{query?'Search results':category==='Latest'?'More to explore':category}</h2><span className="text-xs text-slate-400">{visible.length} stories</span></div>{visible.length?<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">{visible.filter(a=>category!=='Latest'||query||a.id!==featured.id).map(articleCard)}</div>:<p className="py-16 text-center text-slate-500">No stories found. Try another search.</p>}</section>
    </main>}
    <footer className="bg-[#101827] text-white mt-16"><div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-10"><div className="flex flex-col sm:flex-row justify-between gap-6"><div><Brand/><p className="text-xs text-slate-400 mt-4 max-w-sm leading-6">Ideas, insight and inspiration for entrepreneurs building what comes next.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-300">{nav.map(n=><button key={n} onClick={()=>{setCategory(n);setActive(null);window.scrollTo(0,0);}}>{n}</button>)}</div></div><div className="border-t border-white/10 mt-9 pt-5 text-[10px] text-slate-500 flex justify-between"><span>© 2026 Entrepreneur. All rights reserved.</span><span>Independent editorial concept</span></div></div></footer>
  </div>;
}
export default App;
