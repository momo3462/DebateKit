import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Mic2, 
  Scale, 
  UserRound, 
  Plus, 
  Trash2, 
  Link2, 
  Send, 
  Bot, 
  Paperclip, 
  FileText, 
  LayoutDashboard,
  Sparkles,
  Users,
  Download,
  Lock,
  ShieldCheck,
  UserCheck,
  Crown
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';

const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'debate-kit-v9';
const apiKey = ""; 

// --- COMPONENTI DASH ---

const DashNote = ({ el, updateElement, deleteElement, setLinkingFrom, linkingFrom, isDragging, onMouseDown, currentUser, isAdmin }) => {
  const [localContent, setLocalContent] = useState(el.content);
  const isOwner = el.author === currentUser?.uid || el.authorName === currentUser?.username;
  const canEdit = isAdmin || isOwner;

  useEffect(() => {
    setLocalContent(el.content);
  }, [el.content]);

  return (
    <div 
      onMouseDown={onMouseDown}
      style={{ 
        transform: `translate(${el.x}px, ${el.y}px)`, 
        borderTopColor: el.color, 
        width: el.w || 350, 
        height: el.h || 250, 
        position: 'absolute' 
      }} 
      className={`bg-white rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] border-t-[14px] p-8 transition-all flex flex-col ${isDragging ? 'z-50 scale-[1.05] ring-4 ring-sky-200' : 'z-10'} ${linkingFrom === el.id ? 'ring-4 ring-amber-400' : ''}`}
    >
      <div className="flex justify-between mb-4 no-drag items-center">
         <div className="flex gap-2">
           {canEdit && ['#3b82f6', '#10b981', '#f43f5e', '#f59e0b'].map(c => (
             <button key={c} className="w-4 h-4 rounded-full transition-transform hover:scale-125 border border-black/5 shadow-sm" style={{backgroundColor: c}} onClick={() => updateElement(el.id, {color: c})} />
           ))}
         </div>
         <div className="flex gap-2">
           {canEdit && (
             <>
               <button onClick={() => setLinkingFrom(el.id)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><Link2 size={16}/></button>
               <button onClick={() => deleteElement(el.id)} className="p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-300 hover:text-rose-500"><Trash2 size={16}/></button>
             </>
           )}
         </div>
      </div>
      
      <textarea 
        disabled={!canEdit}
        className={`flex-1 w-full bg-transparent text-slate-800 font-bold text-lg outline-none resize-none leading-tight placeholder:text-slate-200 cursor-text no-drag ${!canEdit ? 'cursor-not-allowed opacity-80' : ''}`} 
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        onBlur={() => canEdit && updateElement(el.id, { content: localContent })}
        placeholder="Contenuto bloccato..."
      />

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {el.authorName === 'admin' ? <Crown size={12} className="text-amber-500" /> : <UserRound size={12} className="text-slate-400" />}
          <span className={`text-[10px] font-black uppercase tracking-widest ${el.authorName === 'admin' ? 'text-amber-600' : 'text-slate-400'}`}>
            {el.authorName || 'Anonimo'}
          </span>
        </div>
        {!canEdit && <Lock size={12} className="text-slate-200" />}
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [view, setView] = useState('home'); 
  const [user, setUser] = useState(null);
  const [elements, setElements] = useState([]);
  const [teamFiles, setTeamFiles] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [linkingFrom, setLinkingFrom] = useState(null);
  
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ciao! Sono Tuth. Come posso supportare la tua ricerca oggi?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const isAdmin = loginData.username.toLowerCase() === 'admin';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- FIREBASE ---
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !isAuthenticated) return;
    
    const qDash = collection(db, 'artifacts', appId, 'public', 'data', 'dash_v9');
    const unsubDash = onSnapshot(qDash, (snapshot) => {
      setElements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error(err));

    const qFiles = collection(db, 'artifacts', appId, 'public', 'data', 'team_files_v9');
    const unsubFiles = onSnapshot(qFiles, (snapshot) => {
      setTeamFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error(err));

    return () => { unsubDash(); unsubFiles(); };
  }, [user, isAuthenticated]);

  // --- LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.password === "MeleCotte" && loginData.username.trim() !== "") {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Password errata o username mancante.');
    }
  };

  // --- ACTIONS ---
  const addElement = async (content = 'Nuovo Argomento', color = '#3b82f6') => {
    if (!user) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'dash_v9'), {
      type: 'text', x: 100, y: 100, w: 350, h: 250, content,
      color, links: [], author: user.uid, authorName: loginData.username, createdAt: serverTimestamp()
    });
  };

  const updateElement = async (id, data) => {
    if (!user) return;
    await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'dash_v9', id), data, { merge: true });
  };

  const deleteElement = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'dash_v9', id));
  };

  const uploadTeamFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'team_files_v9'), {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      uploadedBy: loginData.username,
      uploadedById: user.uid,
      timestamp: serverTimestamp()
    });
  };

  const deleteFile = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'team_files_v9', id));
  };

  const handleTuthCommand = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }],
          systemInstruction: { parts: [{ text: "Sei Tuth, assistente Debate. Stile accademico." }] },
          tools: [{ "google_search": {} }]
        })
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Errore elaborazione.";
      setMessages(prev => [...prev, { role: 'assistant', text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Errore di connessione." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- DRAG ---
  const handleMouseMove = (e) => {
    if (!draggingId) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setElements(prev => prev.map(el => el.id === draggingId ? { ...el, x: newX, y: newY } : el));
  };

  const handleMouseUp = () => {
    if (draggingId) {
      const el = elements.find(e => e.id === draggingId);
      if (el) updateElement(draggingId, { x: el.x, y: el.y });
      setDraggingId(null);
    }
  };

  const handleMouseDown = (e, id) => {
    const el = elements.find(e => e.id === id);
    if (!el) return;
    const isOwner = el.author === user?.uid || el.authorName === loginData.username;
    if (!isAdmin && !isOwner) return; // Solo l'admin o il proprietario possono muovere
    
    if (e.target.tagName === 'TEXTAREA' || e.target.closest('.no-drag')) return;
    if (linkingFrom) {
      if (linkingFrom !== id) {
        const fromEl = elements.find(el => el.id === linkingFrom);
        updateElement(linkingFrom, { links: [...(fromEl.links || []), id] });
      }
      setLinkingFrom(null); return;
    }
    setDraggingId(id);
    setDragOffset({ x: e.clientX - el.x, y: e.clientY - el.y });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2 italic tracking-tighter">DebateKit</h2>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-12 text-center">Protocollo di Accesso</p>
          
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">Chi sei?</label>
              <div className="relative">
                <input required type="text" placeholder="Username" className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold outline-none focus:ring-4 focus:ring-sky-500/10 transition-all shadow-inner" value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
                <UserCheck className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">Chiave</label>
              <div className="relative">
                <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold outline-none focus:ring-4 focus:ring-sky-500/10 transition-all shadow-inner" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
              </div>
            </div>
            {loginError && <p className="text-rose-500 text-[10px] font-black uppercase text-center bg-rose-50 p-3 rounded-xl">{loginError}</p>}
            <button type="submit" className="w-full bg-slate-900 hover:bg-sky-600 text-white p-7 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] shadow-2xl shadow-slate-200">
              Inizia Sessione
            </button>
          </form>
        </div>
      </div>
    );
  }

  const HomeView = () => (
    <div className="h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-2xl border border-slate-100">
        {isAdmin ? <Crown size={18} className="text-amber-500"/> : <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />}
        <span className={`text-[11px] font-black uppercase tracking-widest ${isAdmin ? 'text-amber-600' : 'text-slate-400'}`}>
           {isAdmin ? 'ADMINISTRATOR' : loginData.username}
        </span>
      </div>

      <div className="flex flex-col items-center z-10 mb-16">
        <h1 className="text-9xl font-black text-slate-900 mb-2 italic tracking-tighter">Debate<span className="text-sky-500">Kit</span></h1>
        <p className="text-sm text-slate-400 font-black tracking-[0.5em] uppercase">Ecosystem V9 — {isAdmin ? 'Root Mode' : 'Standard'}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 z-10 w-full max-w-7xl px-4">
        <div className="flex flex-col gap-8">
          <button onClick={() => setView('advisor')} className="group w-64 p-12 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-[3.5rem] border border-slate-50 hover:border-sky-300 transition-all hover:-translate-y-2">
            <Mic2 size={40} className="mx-auto text-sky-500 mb-6 group-hover:scale-110 transition-transform"/>
            <span className="text-slate-400 group-hover:text-slate-900 font-black uppercase text-[11px] tracking-widest transition-colors">Advisor</span>
          </button>
          <button onClick={() => setView('gestor')} className="group w-64 p-12 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-[3.5rem] border border-slate-50 hover:border-emerald-300 transition-all hover:-translate-y-2">
            <LayoutDashboard size={40} className="mx-auto text-emerald-500 mb-6 group-hover:scale-110 transition-transform"/>
            <span className="text-slate-400 group-hover:text-slate-900 font-black uppercase text-[11px] tracking-widest transition-colors">Dash</span>
          </button>
          <button onClick={() => setView('tutor')} className="group w-64 p-12 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-[3.5rem] border border-slate-50 hover:border-amber-300 transition-all hover:-translate-y-2">
            <Bot size={40} className="mx-auto text-amber-500 mb-6 group-hover:scale-110 transition-transform"/>
            <span className="text-slate-400 group-hover:text-slate-900 font-black uppercase text-[11px] tracking-widest transition-colors">Tuth AI</span>
          </button>
        </div>

        <div className="flex-1 min-w-[500px] bg-white border border-slate-50 rounded-[4.5rem] p-16 flex flex-col shadow-[0_60px_120px_-25px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-4xl font-black text-slate-900 flex items-center gap-5 italic tracking-tight"><Users className="text-sky-500" size={32}/> Bacheca</h3>
              <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-2">Gestione documentazione di squadra</p>
            </div>
            <label className="bg-slate-900 hover:bg-sky-600 p-5 rounded-3xl cursor-pointer transition-all hover:scale-110 shadow-xl">
              <Plus size={28} className="text-white"/>
              <input type="file" className="hidden" onChange={uploadTeamFile} />
            </label>
          </div>
          
          <div className="flex-1 space-y-6 overflow-y-auto max-h-[450px] pr-4 custom-scrollbar">
            {teamFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-10 py-16">
                <FileText size={64} className="mb-4 text-slate-300"/>
                <p className="font-black uppercase tracking-widest text-xs">Archivio vuoto</p>
              </div>
            ) : (
              teamFiles.map(file => {
                const canDelete = isAdmin || file.uploadedById === user?.uid || file.uploadedBy === loginData.username;
                return (
                  <div key={file.id} className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="p-5 bg-white rounded-3xl text-sky-500 shadow-sm"><FileText size={24}/></div>
                      <div>
                        <p className="text-slate-900 font-bold text-lg truncate max-w-[250px]">{file.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter flex items-center gap-2">
                          da {file.uploadedBy} {file.uploadedBy === 'admin' && <Crown size={10} className="text-amber-500"/>} • {file.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-4 text-slate-300 hover:text-sky-500 transition-colors"><Download size={22}/></button>
                      {canDelete && (
                        <button onClick={() => deleteFile(file.id)} className="p-4 text-slate-200 hover:text-rose-500 transition-colors">
                          <Trash2 size={22}/>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const DashView = () => (
    <div className="h-screen w-screen bg-[#fafbfc] overflow-hidden flex flex-col select-none text-slate-900" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <header className="h-28 bg-white/80 backdrop-blur-3xl border-b border-slate-100 flex justify-between items-center px-12 z-50 shadow-sm">
        <div className="flex items-center gap-10">
          <button onClick={() => setView('home')} className="p-4 hover:bg-slate-100 rounded-3xl transition-all text-slate-400"><ArrowLeft size={28}/></button>
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
              <LayoutDashboard className="text-emerald-500" size={32}/> Dash {isAdmin && <span className="text-[10px] bg-amber-100 text-amber-600 px-3 py-1 rounded-full ml-2">ADMIN</span>}
            </h2>
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">Laboratorio Creativo Collettivo</p>
          </div>
        </div>
        <button onClick={() => addElement()} className="bg-slate-900 hover:bg-emerald-600 text-white px-12 py-5 rounded-[2rem] text-sm font-black uppercase flex items-center gap-4 transition-all hover:scale-105 shadow-2xl shadow-slate-200">
          <Plus size={24}/> Aggiungi Box
        </button>
      </header>
      <main className="flex-1 relative overflow-auto bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:80px_80px]">
        <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-none">
          {elements.map(el => (el.links || []).map(tId => {
            const t = elements.find(e => e.id === tId); if(!t) return null;
            return <line key={`${el.id}-${tId}`} x1={el.x+(el.w||350)/2} y1={el.y+(el.h||250)/2} x2={t.x+(t.w||350)/2} y2={t.y+(t.h||250)/2} stroke="#cbd5e1" strokeWidth="4" strokeDasharray="15,15" opacity="0.4" />;
          }))}
        </svg>
        {elements.map(el => (
          <DashNote 
            key={el.id} el={el} 
            updateElement={updateElement} deleteElement={deleteElement} 
            setLinkingFrom={setLinkingFrom} linkingFrom={linkingFrom} 
            isDragging={draggingId === el.id} 
            onMouseDown={(e) => handleMouseDown(e, el.id)}
            currentUser={{uid: user?.uid, username: loginData.username}}
            isAdmin={isAdmin}
          />
        ))}
      </main>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      {view === 'home' && <HomeView />}
      {view === 'gestor' && <DashView />}
      {view === 'tutor' && <TutorView messages={messages} setMessages={setMessages} chatInput={chatInput} setChatInput={setChatInput} isTyping={isTyping} handleTuthCommand={handleTuthCommand} setView={setView} chatEndRef={chatEndRef} addElement={addElement} />}
      {view === 'advisor' && <div className="p-20 bg-white min-h-screen"><button onClick={() => setView('home')} className="flex items-center gap-3 mb-10 font-black text-slate-400 hover:text-slate-900"><ArrowLeft/> Indietro</button><h2 className="text-6xl font-black uppercase tracking-tighter italic">Advisor</h2><p className="text-slate-400 mt-4">In arrivo...</p></div>}
    </div>
  );
};

// Componente separato per pulizia
const TutorView = ({ messages, setMessages, chatInput, setChatInput, isTyping, handleTuthCommand, setView, chatEndRef, addElement }) => (
  <div className="h-screen bg-[#fcfdfe] flex flex-col text-slate-900">
    <header className="h-28 border-b border-slate-100 px-12 flex justify-between items-center bg-white z-20 shadow-sm">
      <div className="flex items-center gap-8">
        <button onClick={() => setView('home')} className="p-4 hover:bg-slate-100 rounded-3xl text-slate-400 transition-all"><ArrowLeft size={28}/></button>
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">Tuth AI <Sparkles className="text-amber-500" size={24}/></h2>
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Digital Strategist Specialist</p>
        </div>
      </div>
    </header>
    
    <main className="flex-1 overflow-y-auto p-12 space-y-12 flex flex-col items-center bg-slate-50/20">
      <div className="w-full max-w-5xl space-y-12">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6`}>
            <div className="flex flex-col gap-6 max-w-[85%]">
              <div className={`p-12 rounded-[4rem] text-xl font-medium shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-50 text-slate-800 rounded-tl-none whitespace-pre-wrap leading-relaxed'}`}>
                {m.text}
              </div>
              {m.role === 'assistant' && i !== 0 && (
                <button onClick={() => addElement(m.text, '#f59e0b')} className="self-start flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-all bg-white px-8 py-4 rounded-full border border-slate-100 shadow-xl">
                  <LayoutDashboard size={16}/> Salva nota su Dash
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white border border-slate-50 p-10 rounded-full flex gap-4 shadow-xl">
               <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"/>
               <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"/>
               <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"/>
             </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>
    </main>

    <footer className="p-12 border-t border-slate-100 bg-white shadow-[0_-30px_60px_rgba(0,0,0,0.03)]">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex gap-6 items-center">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Chiedi supporto strategico..." 
              className="w-full bg-slate-50 border-none rounded-[3rem] py-8 px-12 text-2xl font-bold text-slate-800 placeholder:text-slate-200 focus:bg-white focus:ring-[12px] focus:ring-sky-500/5 transition-all outline-none shadow-inner" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleTuthCommand()} 
            />
            <button onClick={handleTuthCommand} className="absolute right-6 top-1/2 -translate-y-1/2 p-6 bg-slate-900 rounded-full text-white hover:bg-sky-500 transition-all shadow-2xl">
              <Send size={28}/>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default App;