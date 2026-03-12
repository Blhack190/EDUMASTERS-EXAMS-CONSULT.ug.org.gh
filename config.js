// =========================================================
// 🚧 MASTER MAINTENANCE MODE SWITCH 🚧
// =========================================================
const MAINTENANCE_MODE = true; // Set to true to lock the site!
const MAINTENANCE_END_TIME = "2024-03-01T18:30:00"; // Set your estimated finish time

if (MAINTENANCE_MODE) {
    // IF MAINTENANCE IS ON, ONLY SHOW THIS SCREEN
    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; background:linear-gradient(135deg, #0f2027, #203a43, #2c5364); color:#fff; text-align:center; font-family:'Poppins', sans-serif; padding: 20px; z-index: 999999; position: fixed; top: 0; left: 0; width: 100%;">
                <h1 style="color:#ffb142; font-size: 3.5rem; margin-bottom: 10px; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">🚧 SYSTEM UPGRADE 🚧</h1>
                <p style="font-size: 1.2rem; max-width: 600px; line-height: 1.6; margin-bottom: 20px;">The EduMasters platform is currently undergoing scheduled maintenance to bring you new features and better security.</p>
                <h3 style="color:#ff6b6b; margin-bottom: 20px;">Please check back soon!</h3>
                <p style="margin-top: 20px; color:#1dd1a1; font-weight:bold; letter-spacing: 1px;">Powered by Quist Technologies</p>
            </div>
        `;
    });
} else {
    // =========================================================
    // ✅ IF MAINTENANCE IS FALSE, LOAD THE NORMAL WEBSITE
    // =========================================================

const SUPABASE_URL = "https://mhhltddsfzfpixdupblq.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaGx0ZGRzZnpmcGl4ZHVwYmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODEzMjEsImV4cCI6MjA4NzQ1NzMyMX0.eB2FM0yaTUCFdyug3FLug6GRI0H_uQhBa8-DWSCdh6c"; 
const PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_PAYSTACK_KEY"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function calculateUGGrade(score, maxScore) {
    const p = (score / maxScore) * 100;
    if (p >= 80) return { grade: 'A', points: 4.0 };
    if (p >= 75) return { grade: 'B+', points: 3.5 };
    if (p >= 70) return { grade: 'B', points: 3.0 };
    if (p >= 65) return { grade: 'C+', points: 2.5 };
    if (p >= 60) return { grade: 'C', points: 2.0 };
    if (p >= 55) return { grade: 'D+', points: 1.5 };
    if (p >= 50) return { grade: 'D', points: 1.0 };
    return { grade: 'F', points: 0.0 };
}

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
    if(window.innerWidth > 900) {
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

    // 6. QUIST BOT & FOOTER (With About Page Link)
    const botHtml = `
        <div class="chatbot-btn no-print" onclick="document.getElementById('chatbotWindow').classList.toggle('open')">💬</div>
        <div class="chatbot-window no-print" id="chatbotWindow">
            <div class="chat-header"><span>🤖 Quist Support</span><span style="cursor:pointer;" onclick="document.getElementById('chatbotWindow').classList.remove('open')">✖</span></div>
            <div class="chat-body" id="chatBody">
                <div class="chat-msg msg-bot">
                    Akwaaba! Select a class below to join our Premium Study Groups.
                    <div class="bot-form-group">
                        <select id="botClassSelect">
                            <option value="">-- Choose Level --</option><option value="Diploma 1">Diploma 1</option><option value="Diploma 2">Diploma 2</option><option value="Level 200">Level 200</option>
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

function changeSpotify() { let link = document.getElementById('spotifyLink').value.trim(); if(link.includes('spotify.com')) { let embedLink = link.replace('open.spotify.com/', 'open.spotify.com/embed/'); if(embedLink.includes('?')) embedLink = embedLink.split('?')[0] + '?utm_source=generator&theme=0'; document.getElementById('spotIframe').src = embedLink; document.getElementById('spotifyLink').value = ''; let history = JSON.parse(localStorage.getItem('spotifyHistory')) || [{ name: "Shatta Wale Mix", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3AExX9?utm_source=generator&theme=0" }]; history.unshift({ name: "Custom Track", url: embedLink }); if(history.length > 5) history.pop(); localStorage.setItem('spotifyHistory', JSON.stringify(history)); localStorage.setItem('lastSpotifyTrack', embedLink); location.reload(); } }
function playFromHistory() { const link = document.getElementById('spotifyHistoryDrop').value; if(link) { document.getElementById('spotIframe').src = link; localStorage.setItem('lastSpotifyTrack', link); } }

// BOT UPGRADE: Private vs One-on-One
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

// --- ARCHIVE RESULTS LOGIC ---
        let viewingArchive = false;

        async function loadSubmissions(showArchived) {
            allSubs = [];
            const { data: subs } = await supabaseClient.from('submissions').select('*, students(index_number), exams(title, courses(course_code, school_id))').eq('is_archived', showArchived);
            const subBody = document.getElementById('admin-subs');
            subBody.innerHTML = '';
            
            if(subs && subs.length > 0) {
                subs.filter(s => s.exams.courses.school_id == school.id).forEach(s => { 
                    allSubs.push(s); 
                    let dateStr = new Date(s.submitted_at).toLocaleDateString();
                    subBody.innerHTML += `<tr><td>${s.students.index_number}</td><td>${s.exams.courses.course_code}</td><td>${s.exams.title}</td><td>${s.score}/${s.max_score}</td><td><strong style="color:${showArchived ? '#ccc' : '#1dd1a1'};">${s.grade}</strong></td><td>${dateStr}</td></tr>`; 
                });
            } else {
                subBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#ccc;">No ${showArchived ? 'archived' : 'active'} results found.</td></tr>`;
            }
        }

        function toggleArchiveView() {
            viewingArchive = !viewingArchive;
            const btn = document.getElementById('btn-view-archive');
            const title = document.getElementById('results-title');
            
            if(viewingArchive) {
                btn.innerText = "🔙 Back to Active";
                title.innerText = "📦 Archived Emergency Results";
                loadSubmissions(true);
            } else {
                btn.innerText = "👁️ View Archived";
                title.innerText = "📊 Active Student Results";
                loadSubmissions(false);
            }
        }

        async function archiveAll() {
            if(confirm("Are you sure you want to clear the dashboard? This will move all current results to the Archive.")) {
                // Update all active submissions to archived
                await supabaseClient.from('submissions').update({ is_archived: true }).eq('is_archived', false);
                alert("Dashboard Cleared! Results moved to Emergency Archive.");
                location.reload();
            }

        }





