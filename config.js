// =========================================================
// 🚧 MASTER MAINTENANCE MODE (WITH BOT & SURVEY) 🚧
// =========================================================
const MAINTENANCE_MODE = false; // Change to 'true' to lock the website
const MAINTENANCE_END_TIME = "2026-03-27T00:00:00Z"; // Leave blank or put a date like "2026-03-27T20:30:00Z"

// 1. SUPABASE & PAYSTACK KEYS
const SUPABASE_URL = "https://mhhltddsfzfpixdupblq.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaGx0ZGRzZnpmcGl4ZHVwYmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODEzMjEsImV4cCI6MjA4NzQ1NzMyMX0.eB2FM0yaTUCFdyug3FLug6GRI0H_uQhBa8-DWSCdh6c"; // <-- Make sure your real Anon Key is here
const PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_PAYSTACK_KEY"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function calculateUGGrade(score, maxScore) {
    const p = (score / maxScore) * 100;
    if (p >= 80) return { grade: 'A', points: 4.0 };
    if (p >= 75) return { grade: 'B+', points: 3.5 };
    if (p >= 70) return { grade: 'B', points: 3.0 };
    if (p >= 65) return { grade: 'C+', points: 2.5 };
    if (p >= 60) return { grade: 'AC', points: 2.0 };
    if (p >= 55) return { grade: 'D+', points: 1.5 };
    if (p >= 50) return { grade: 'D', points: 1.0 };
    return { grade: 'F', points: 0.0 };
}

if (MAINTENANCE_MODE) {
    // =========================================================
    // 🚧 IF MAINTENANCE IS ON: SHOW UPGRADE SCREEN ONLY
    // =========================================================
    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; background:linear-gradient(135deg, #0f2027, #203a43, #2c5364); color:#fff; text-align:center; font-family:'Poppins', sans-serif; padding: 40px 20px; z-index: 999999; position: absolute; top: 0; left: 0; width: 100%; overflow-y: auto;">
                
                <h1 style="color:#ffb142; font-size: 3rem; margin-bottom: 10px; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">🚧 SYSTEM UPGRADE 🚧</h1>
                <p style="font-size: 1.1rem; max-width: 600px; line-height: 1.6; margin-bottom: 20px;">The EduMasters platform is currently undergoing scheduled maintenance to bring you new features and better security.</p>
                
                <div id="maint-timer-box" style="display:none; background: rgba(0,0,0,0.5); padding: 15px 30px; border-radius: 15px; border: 2px solid #1dd1a1; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <h3 style="color:#1dd1a1; margin-bottom: 5px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem;">Estimated Time Remaining</h3>
                    <div id="maint-timer" style="font-size: 2rem; font-weight: bold; font-family: monospace; color: #fff;">00:00:00</div>
                </div>

                <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2); max-width: 500px; width: 100%; margin-bottom: 30px;">
                    <h2 style="color:#1dd1a1; margin-bottom: 10px; font-size: 1.5rem;">We Value Your Feedback! ⭐</h2>
                    <p style="font-size: 0.85rem; margin-bottom: 20px; color: #ccc;">While you wait, please let us know how we can improve the platform.</p>
                    
                    <select id="maint_rating" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid rgba(255,255,255,0.2);">
                        <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                        <option value="4">⭐⭐⭐⭐ (Good)</option>
                        <option value="3">⭐⭐⭐ (Average)</option>
                        <option value="2">⭐⭐ (Poor)</option>
                        <option value="1">⭐ (Terrible)</option>
                    </select>

                    <textarea id="maint_comments" placeholder="Any issues or suggestions? (Optional)" style="width: 100%; height: 80px; padding: 12px; margin-bottom: 15px; border-radius: 8px; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none;"></textarea>
                    
                    <button style="width: 100%; padding: 12px; background: #1dd1a1; color: #000; font-weight: bold; border: none; border-radius: 8px; cursor: pointer;" onclick="submitMaintFeedback()">Submit Feedback</button>
                </div>

                <p style="margin-top: 10px; color:#1dd1a1; font-weight:bold; letter-spacing: 1px; margin-bottom: 40px;">Powered by Quist Technologies</p>
            </div>
        `;

        if(MAINTENANCE_END_TIME !== "") {
            document.getElementById('maint-timer-box').style.display = 'block';
            const targetDate = new Date(MAINTENANCE_END_TIME).getTime();

            const mTimer = setInterval(() => {
                const now = new Date().getTime(); 
                const distance = targetDate - now;

                if(distance < 0) {
                    clearInterval(mTimer);
                    document.getElementById('maint-timer').innerText = "SYSTEM REBOOTING...";
                    document.getElementById('maint-timer').style.color = "#ffb142";
                    setTimeout(() => location.reload(), 3000); 
                } else {
                    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const s = Math.floor((distance % (1000 * 60)) / 1000);
                    document.getElementById('maint-timer').innerText = (h < 10 ? "0"+h : h) + "h : " + (m < 10 ? "0"+m : m) + "m : " + (s < 10 ? "0"+s : s) + "s";
                }
            }, 1000);
        }

        const botHtml = `
            <style>
                .chatbot-btn { position: fixed; bottom: 30px; right: 30px; background: #25D366; color: #fff; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 30px; cursor: pointer; z-index: 9999999; animation: bounce 2s infinite; border: 2px solid #fff; }
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .chatbot-window { position: fixed; bottom: 100px; right: 30px; width: 320px; height: 450px; background: #e5ddd5; border-radius: 15px; display: flex; flex-direction: column; overflow: hidden; z-index: 9999999; transform: scale(0); transform-origin: bottom right; transition: 0.3s; box-shadow: 0 15px 35px rgba(0,0,0,0.5); }
                .chatbot-window.open { transform: scale(1); }
                .chat-header { background: #075E54; color: #fff; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
                .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; color: #000; text-align: left; }
                .chat-msg { padding: 10px; border-radius: 10px; max-width: 85%; font-size: 0.9rem; background: #fff; }
                .msg-bot { align-self: flex-start; border-top-left-radius: 0; }
                .msg-user { background: #dcf8c6; align-self: flex-end; border-top-right-radius: 0; }
                .chat-input { display: flex; background: #f0f0f0; padding: 10px; align-items: center;}
                .chat-input input { flex: 1; border: none; padding: 12px; border-radius: 20px; outline: none; background: #fff; color: #000; margin: 0;}
                .chat-input button { background: #25D366; color:#fff; border: none; width: 40px; height: 40px; margin-left: 10px; border-radius: 50%; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;}
                .bot-form-group { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; }
                .bot-form-group select, .bot-form-group button { margin: 0; border: 1px solid #ccc; background: #fff; color: #000; padding: 8px;}
                .bot-form-group button { background: #25D366; color: #fff; font-weight: bold; border: none; cursor: pointer; margin-top: 5px; padding: 10px; border-radius: 8px;}
            </style>
            <div class="chatbot-btn" onclick="document.getElementById('chatbotWindow').classList.toggle('open')">💬</div>
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chat-header"><span>🤖 Quist Support</span><span style="cursor:pointer;" onclick="document.getElementById('chatbotWindow').classList.remove('open')">✖</span></div>
                <div class="chat-body" id="chatBody">
                    <div class="chat-msg msg-bot">Akwaaba! The site is under maintenance, but you can still select a class below to join our Premium Study Groups.
                        <div class="bot-form-group">
                            <select id="botClassSelect">
                                <option value="">-- Choose Level --</option><option value="Diploma 1">Diploma 1</option><option value="Diploma 2">Diploma 2</option><option value="Level 100">Level 100</option><option value="Level 200">Level 200</option><option value="Level 300">Level 300</option><option value="Level 400">Level 400</option>
                            </select>
                            <button onclick="botAskType()">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', botHtml);
    });

    window.submitMaintFeedback = async function() {
        const rating = document.getElementById('maint_rating').value;
        const comments = document.getElementById('maint_comments').value.trim();
        await supabaseClient.from('feedback').insert([{ student_id: null, exam_id: null, rating: parseInt(rating), comments: comments || "No comments" }]);
        alert("Thank you for your feedback!"); document.getElementById('maint_comments').value = ''; 
    };

} else {
    // =========================================================
    // ✅ IF MAINTENANCE IS FALSE, LOAD THE NORMAL WEBSITE
    // =========================================================

    document.addEventListener("DOMContentLoaded", () => {
        if(window.location.pathname.includes('print') || window.location.pathname.includes('exam.html')) return;

        // 1. TOP AD BANNER
        const topAdImage = "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&w=1200&h=100&q=80')";
        const topBanner = document.createElement("a"); topBanner.className = "ad-banner-top no-print"; topBanner.target = "_blank"; topBanner.href = "https://klikgain.com/store/store-1761329385610-fvdf5758j";
        topBanner.style.background = topAdImage; topBanner.innerHTML = `<span class="ad-badge">Promoted</span> <span>🔥 Get Cheap MTN, Telecel & AirtelTigo Data Instantly! Click Here.</span>`;
        document.body.insertBefore(topBanner, document.body.firstChild);

        // 2. REAL-TIME TICKER (Expanded Stocks)
        const ticker = document.createElement("div"); ticker.className = "ticker-wrap no-print";
        ticker.innerHTML = `<div class="ticker" id="live-ticker">📡 Fetching Live Global News & Markets...</div>`;
        document.body.insertBefore(ticker, topBanner.nextSibling);

        async function fetchLiveTickerData() {
            try {
                const fxRes = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
                const ghsRate = (await fxRes.json()).usd.ghs.toFixed(2);
                const joyRes = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.myjoyonline.com/feed/');
                const joyNews = (await joyRes.json()).items[0].title;
                const cnnRes = await fetch('https://api.rss2json.com/v1/api.json?rss_url=http://rss.cnn.com/rss/edition.rss');
                const cnnNews = (await cnnRes.json()).items[0].title;
                const gse = `📈 MTNGH 1.52 (+0.2%) | 📉 GCB 0.85 (-0.1%) | 📈 TULLOW 11.90 (+1.1%) | 📉 BOPP 21.56 (-0.5%) | 📈 GOIL 1.50 (+0.0%)`;
                document.getElementById('live-ticker').innerText = `💰 USD/GHS: ${ghsRate} | 🇬🇭 JOY NEWS: ${joyNews} | 🌍 CNN: ${cnnNews} | 📊 GSE STOCKS: ${gse}`;
            } catch(e) {}
        }
        fetchLiveTickerData(); setInterval(fetchLiveTickerData, 120000);

        // 3. LEFT AD SIDEBAR
        if(window.innerWidth > 900 && !window.location.pathname.includes('about.html')) {
            const sideAds = [
                { link: "https://wa.me/233592747794", flyer: "ella 1.jpeg" },
                { link: "https://wa.me/233592747794", flyer: "ella 2.jpeg" },
                { link: "https://wa.me/233592747794?text=Place%20Ad", flyer: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=400&q=80" }
            ];
            const sidebar = document.createElement("div"); sidebar.className = "ad-sidebar no-print"; document.body.appendChild(sidebar);
            let adIndex = 0;
            function rotateSidebarAds() {
                sidebar.innerHTML = `<h4 style="color:#1dd1a1; font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; width:100%; text-align:center;">Sponsored</h4>`;
                for(let i=0; i<2; i++) {
                    let ad = sideAds[(adIndex + i) % sideAds.length];
                    sidebar.innerHTML += `<a href="${ad.link}" target="_blank" class="side-ad-block" style="background-image: url('${ad.flyer}')"></a>`;
                }
                adIndex = (adIndex + 1) % sideAds.length;
            }
            rotateSidebarAds(); setInterval(rotateSidebarAds, 6000);
        }

        // 4. DARK MODE
        const themeBtn = document.createElement("button"); themeBtn.className = "theme-toggle no-print"; themeBtn.innerHTML = "🌙";
        if(localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark-mode'); themeBtn.innerHTML = "☀️"; }
        themeBtn.onclick = () => { document.body.classList.toggle('dark-mode'); if(document.body.classList.contains('dark-mode')) { localStorage.setItem('theme', 'dark'); themeBtn.innerHTML = "☀️"; } else { localStorage.setItem('theme', 'light'); themeBtn.innerHTML = "🌙"; } }; 
        document.body.appendChild(themeBtn);

        // 5. SPOTIFY
        let spotifyHistory = JSON.parse(localStorage.getItem('spotifyHistory')) || [{ name: "Shatta Wale Mix", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3AExX9?utm_source=generator&theme=0" }];
        let lastPlayed = localStorage.getItem('lastSpotifyTrack') || spotifyHistory[0].url;
        const music = document.createElement("div"); music.className = "music-widget no-print minimized"; music.id = "musicWidget";
        let historyOptions = spotifyHistory.map(item => `<option value="${item.url}">🕒 ${item.name}</option>`).join('');
        music.innerHTML = `<div class="music-header" onclick="document.getElementById('musicWidget').classList.toggle('minimized')"><span style="display:flex; align-items:center; gap:8px;">🟢 Spotify Player</span><span>↕</span></div><div class="music-body"><div class="music-input-area"><select id="spotifyHistoryDrop" onchange="playFromHistory()"><option value="">-- History --</option>${historyOptions}</select><div style="display:flex; gap:5px; margin-top:5px;"><input type="text" id="spotifyLink" placeholder="Paste Spotify Link..."><button onclick="changeSpotify()">Play</button></div></div><iframe id="spotIframe" src="${lastPlayed}" width="100%" height="80" frameBorder="0" allow="encrypted-media"></iframe></div>`;
        document.body.appendChild(music);

        // 6. QUIST BOT & FOOTER
        const botHtml = `
            <div class="chatbot-btn no-print" onclick="document.getElementById('chatbotWindow').classList.toggle('open')">💬</div>
            <div class="chatbot-window no-print" id="chatbotWindow">
                <div class="chat-header"><span>🤖 Quist Support</span><span style="cursor:pointer;" onclick="document.getElementById('chatbotWindow').classList.remove('open')">✖</span></div>
                <div class="chat-body" id="chatBody">
                    <div class="chat-msg msg-bot">
                        Akwaaba! Select a class below to join our Premium Study Groups.
                        <div class="bot-form-group">
                            <select id="botClassSelect">
                                <option value="">-- Choose Level --</option><option value="Diploma 1">Diploma 1</option><option value="Diploma 2">Diploma 2</option><option value="Level 100">Level 100</option><option value="Level 200">Level 200</option><option value="Level 300">Level 300</option><option value="Level 400">Level 400</option>
                            </select>
                            <button onclick="botAskType()">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="site-footer no-print">
                Powered by <strong>Quist Technologies</strong><br>📞 055169056 | ✉️ info.quisttechnologies@gmail.com<br>
                <a href="about.html" style="color:#ffb142; margin-top:5px; display:inline-block;">📖 About The Founder</a>
            </div>
        `; 
        document.body.insertAdjacentHTML('beforeend', botHtml);
    });
} // <--- THIS BRACKET IS VERY IMPORTANT. IT CLOSES THE MAINTENANCE IF/ELSE STATEMENT

// =========================================================
// GLOBAL FUNCTIONS (Available in both modes)
// =========================================================

function changeSpotify() { let link = document.getElementById('spotifyLink').value.trim(); if(link.includes('spotify.com')) { let embedLink = link.replace('open.spotify.com/', 'open.spotify.com/embed/'); if(embedLink.includes('?')) embedLink = embedLink.split('?')[0] + '?utm_source=generator&theme=0'; document.getElementById('spotIframe').src = embedLink; document.getElementById('spotifyLink').value = ''; let history = JSON.parse(localStorage.getItem('spotifyHistory')) || [{ name: "Shatta Wale Mix", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3AExX9?utm_source=generator&theme=0" }]; history.unshift({ name: "Custom Track", url: embedLink }); if(history.length > 5) history.pop(); localStorage.setItem('spotifyHistory', JSON.stringify(history)); localStorage.setItem('lastSpotifyTrack', embedLink); location.reload(); } }
function playFromHistory() { const link = document.getElementById('spotifyHistoryDrop').value; if(link) { document.getElementById('spotIframe').src = link; localStorage.setItem('lastSpotifyTrack', link); } }

let selectedLvl = "";
function botAskType() {
    selectedLvl = document.getElementById('botClassSelect').value;
    if(!selectedLvl) return;
    document.getElementById('chatBody').innerHTML += `<div class="chat-msg msg-user">${selectedLvl}</div>`;
    setTimeout(() => {
        document.getElementById('chatBody').innerHTML += `
            <div class="chat-msg msg-bot">Awesome. Do you prefer a standard Private Group Study, or personalized One-on-One Tutoring (comes at a moderate cost)?
                <div class="bot-form-group">
                    <button onclick="botFinalize('Private Group')">👥 Private Group</button>
                    <button onclick="botFinalize('One-on-One Tutoring')" style="background:#ff9f43; color:#000;">👤 One-on-One (Paid)</button>
                </div>
            </div>`;
        document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight;
    }, 600);
}
function botFinalize(type) {
    document.getElementById('chatBody').innerHTML += `<div class="chat-msg msg-user">${type}</div>`;
    setTimeout(() => {
        const waLink = `https://wa.me/233592747794?text=Hello,%20I%20want%20to%20register%20for%20the%20${selectedLvl}%20${type}.`;
        document.getElementById('chatBody').innerHTML += `<div class="chat-msg msg-bot">Great choice! Click below to finalize with Admin on WhatsApp.<br><a href="${waLink}" target="_blank" class="btn" style="background:#25D366; margin-top:10px;">💬 Open WhatsApp</a></div>`;
        document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight;
    }, 600);
}
