"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ADMIN_PASS = "محمد حسین EP";
var $ = function (id) { return document.getElementById(id); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]); }); };
var load = function (k, d) { try {
    return JSON.parse(localStorage.getItem(k)) || d;
}
catch (e) {
    return d;
} };
var save = function (k, v) { try {
    localStorage.setItem(k, JSON.stringify(v));
}
catch (e) { } };
var isAdmin = false;
var defaultPlayers = [
    { realName: "آرمین", gameName: "EP●A P A C H I", bale: "@armin808090", rank: "-", role: "عضو عادی", code: "UG2HOPO4D3", activity: "100%" },
    { realName: "میلاد", gameName: "Ep2 milad", bale: "@ghbjnuhihj", rank: "-", role: "عضو عادی", code: "D3873Z6", activity: "100%" },
    { realName: "محمد", gameName: "EP³| HEMAT", bale: "-", rank: "-", role: "عضو عادی", code: "49UDFOLYZ9", activity: "100%" },
    { realName: "رسول کریمی", gameName: "moghavemat", bale: "@rasoolkarimi", rank: "-", role: "عضو عادی", code: "5WBHKHL7XP", activity: "100%" },
    { realName: "ابراهیم", gameName: "eb • EP", bale: "@mmmmm111166", rank: "-", role: "عضو عادی", code: "8YAF5WXU4N", activity: "100%" },
    { realName: "احسان", gameName: "EH3AN.EP³", bale: "@Mehre73", rank: "-", role: "عضو عادی", code: "-", activity: "100%" },
    { realName: "EHSAN (امیر)", gameName: "Rambo", bale: "@a_n1652021", rank: "-", role: "عضو عادی", code: "2B1EQ1V5CJ", activity: "100%" },
    { realName: "طاها", gameName: "EP² | TAHA", bale: "@taha8797", rank: "-", role: "عضو عادی", code: "XPCEH7Z", activity: "100%" },
    { realName: "رضا", gameName: "میگ میگ|EP³", bale: "@Reza_995", rank: "-", role: "عضو عادی", code: "HP74WZE", activity: "100%" },
    { realName: "پویان", gameName: "PERSIA CYRUS EP³", bale: "@PC777", rank: "-", role: "عضو عادی", code: "UDEKSAA", activity: "100%" },
    { realName: "شایان", gameName: "ایران شاه", bale: "@kkdddktkrrkfr", rank: "-", role: "عضو عادی", code: "ORW8Q9C6EK", activity: "100%" },
    { realName: "امیر", gameName: "EP3 •AMIR.", bale: "@AMIR89236", rank: "-", role: "عضو عادی", code: "9AHP9YPZ1C", activity: "100%" }
];
var players = load('ep_players', defaultPlayers);
if (!players.length)
    players = JSON.parse(JSON.stringify(defaultPlayers));
var uid = function () { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };
players.forEach(function (p) { if (!p.id)
    p.id = uid(); });
var savePlayersToStorage = function () { return save('ep_players', players); };
savePlayersToStorage();
var byId = function (id) { return players.find(function (p) { return p.id === id; }); };
var topIds = load('ep_top', []);
while (topIds.length < 10)
    topIds.push('');
var TEAM_COLORS = ['45 212 191', '129 140 248', '244 114 182', '253 186 116'];
var teams = load('ep_teams', null) || TEAM_COLORS.map(function (c, i) { return ({ name: 'تیم ' + (i + 1), m: ['', '', '', '', ''] }); });
var B = load('ep_bracket', null);
var archive = load('ep_archive', []);
var saveArchive = function () { return save('ep_archive', archive); };
/* ---------- Search ---------- */
function filterPlayers() {
    var q = $('searchInput').value.toLowerCase().trim();
    var box = $('searchResults');
    if (!q) {
        box.innerHTML = '<div class="text-gray-400 text-center col-span-full py-2">نام یا آیدی بازیکن را برای جستجو وارد کنید...</div>';
        return;
    }
    var f = players.filter(function (p) { return [p.realName, p.gameName, p.bale, p.phone || '', p.code].some(function (v) { return String(v).toLowerCase().includes(q); }); });
    if (!f.length) {
        box.innerHTML = '<div class="text-rose-300 text-center col-span-full py-2">بازیکنی با این مشخصات یافت نشد.</div>';
        return;
    }
    box.innerHTML = f.map(function (p) { return "\n    <div class=\"card p-4 space-y-1 cursor-pointer\" onclick=\"openProfile('".concat(p.id, "')\" style=\"--c:45 212 191\">\n      <div class=\"font-bold text-teal-300 text-base\">").concat(esc(p.gameName), "</div>\n      <div class=\"text-sm text-gray-300\">\u0646\u0627\u0645 \u0648\u0627\u0642\u0639\u06CC: <span class=\"text-white font-medium\">").concat(esc(p.realName), "</span></div>\n      <div class=\"text-xs text-gray-400\">\u0622\u06CC\u062F\u06CC \u0628\u0644\u0647: ").concat(esc(p.bale), "</div>\n      <div class=\"text-xs text-gray-400\">\u0634\u0645\u0627\u0631\u0647: <span dir=\"ltr\" class=\"inline-block\">").concat(esc(p.phone || '-'), "</span></div>\n      <div class=\"text-xs text-amber-300\">\u062F\u0631\u062C\u0647: ").concat(esc(p.rank), " | \u0646\u0642\u0634: ").concat(esc(p.role), "</div>\n      <div class=\"text-xs text-yellow-200 font-mono\">\u06A9\u062F: ").concat(esc(p.code), "</div>\n      <div class=\"text-xs text-green-400 font-bold\">\u0641\u0639\u0627\u0644\u06CC\u062A: ").concat(esc(p.activity), "</div>\n    </div>"); }).join('');
}
/* ---------- Tournament bracket ---------- */
function genBracket() {
    if (!players.length)
        return;
    var size = parseInt($('tournamentSize').value) || 8;
    var list = __spreadArray([], players, true).sort(function () { return Math.random() - .5; }).slice(0, Math.min(size, players.length));
    var P = 2;
    while (P < list.length)
        P *= 2;
    var n = P / 2, r0 = [];
    for (var i = 0; i < n; i++)
        r0.push({ a: list[i].gameName, b: list[n + i] ? list[n + i].gameName : '', w: 0 });
    var rounds = [r0];
    for (var m = n / 2; m >= 1; m /= 2)
        rounds.push(Array.from({ length: m }, function () { return ({ a: '', b: '', w: 0 }); }));
    B = { rounds: rounds };
    r0.forEach(function (x, i) { if (!x.b)
        setWin(0, i, 1, true); });
    commitBracket();
}
function resetUp(r, m) {
    var x = B.rounds[r][m];
    x.w = 0;
    var nx = B.rounds[r + 1] && B.rounds[r + 1][m >> 1];
    if (nx) {
        nx[m % 2 ? 'b' : 'a'] = '';
        if (nx.w)
            resetUp(r + 1, m >> 1);
    }
}
function setWin(r, m, s, silent) {
    var x = B.rounds[r][m];
    if (!(s === 1 ? x.a : x.b))
        return;
    if (x.w === s)
        s = 0;
    resetUp(r, m);
    if (s) {
        x.w = s;
        var nx = B.rounds[r + 1] && B.rounds[r + 1][m >> 1];
        if (nx)
            nx[m % 2 ? 'b' : 'a'] = s === 1 ? x.a : x.b;
    }
    if (!silent)
        commitBracket();
}
function setName(r, m, k, v) {
    var x = B.rounds[r][m];
    x[k] = v.trim();
    if (x.w === (k === 'a' ? 1 : 2)) {
        var nx = B.rounds[r + 1] && B.rounds[r + 1][m >> 1];
        if (nx)
            nx[m % 2 ? 'b' : 'a'] = x[k];
    }
    commitBracket();
}
function resetResults() {
    if (!B || !confirm('همه نتایج پاک شود؟ (کادرهای دور اول می‌مانند)'))
        return;
    B.rounds.forEach(function (rd, r) { return rd.forEach(function (x) { x.w = 0; if (r > 0) {
        x.a = '';
        x.b = '';
    } }); });
    B.rounds[0].forEach(function (x, i) { if (x.a && !x.b)
        setWin(0, i, 1, true); });
    commitBracket();
}
function renderAdminTour() {
    var box = $('adminTour');
    if (!B) {
        box.innerHTML = '<div class="text-sm text-gray-400 text-center py-4">هنوز تورنمنتی ساخته نشده. از بخش تورنمنت قرعه‌کشی کن.</div>';
        return;
    }
    var R = B.rounds.length;
    box.innerHTML = B.rounds.map(function (rd, r) {
        var rows = rd.map(function (x, m) {
            if (!x.a && !x.b)
                return '';
            var btn = function (k, s) {
                var win = x.w === s, lose = x.w && !win;
                return "<button ".concat(x[k] ? '' : 'disabled', " onclick=\"setWin(").concat(r, ",").concat(m, ",").concat(s, ")\" class=\"flex-1 text-xs rounded-lg px-2 py-2 border truncate transition ").concat(win ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : lose ? 'bg-rose-500/15 border-rose-400/40 text-rose-300 line-through' : 'bg-black/30 border-teal-300/25 text-white hover:border-teal-300', "\">").concat(win ? '🏆 ' : lose ? '✕ ' : '').concat(esc(x[k]) || '—', "</button>");
            };
            return "<div class=\"flex items-center gap-2\">".concat(btn('a', 1), "<span class=\"text-[10px] text-gray-500\">VS</span>").concat(btn('b', 2), "</div>");
        }).join('');
        return rows ? "<div class=\"bg-black/30 p-3 rounded-xl border border-teal-300/20 space-y-2\"><div class=\"text-xs font-bold text-indigo-300\">".concat(roundName(r, R), "</div>").concat(rows, "</div>") : '';
    }).join('');
}
function resetBracket() { if (confirm('تورنمنت پاک شود؟')) {
    B = null;
    commitBracket();
} }
function commitBracket() { save('ep_bracket', B); renderBracket(); if (isAdmin)
    renderAdminTour(); }
function roundName(i, R) {
    var left = R - 1 - i;
    return left === 0 ? 'فینال' : left === 1 ? 'نیمه‌نهایی' : left === 2 ? 'یک‌چهارم نهایی' : 'دور ' + (i + 1);
}
function slot(r, m, k) {
    var x = B.rounds[r][m], s = k === 'a' ? 1 : 2, win = x.w === s, lose = x.w && !win && x[k];
    if (isAdmin)
        return "<div class=\"slot ".concat(win ? 'win' : lose ? 'lose' : '', "\"><input value=\"").concat(esc(x[k]), "\" placeholder=\"\u0646\u0627\u0645 \u06A9\u0627\u062F\u0631...\" onchange=\"setName(").concat(r, ",").concat(m, ",'").concat(k, "',this.value)\"><button title=\"\u0628\u0631\u0646\u062F\u0647\" onclick=\"setWin(").concat(r, ",").concat(m, ",").concat(s, ")\">\u2713</button></div>");
    return "<div class=\"slot ".concat(win ? 'win' : lose ? 'lose' : '', "\"><span class=\"truncate\">").concat(esc(x[k]) || '—', "</span>").concat(win ? '<span>✓</span>' : '', "</div>");
}
function renderBracket() {
    var box = $('bracket'), champ = $('champ');
    if (!B) {
        champ.innerHTML = '';
        box.innerHTML = "<div class=\"card p-6 text-center text-gray-400 w-full\" style=\"--c:129 140 248\">".concat(isAdmin ? 'تعداد را انتخاب و «قرعه‌کشی جدید» را بزنید.' : 'هنوز تورنمنتی برگزار نشده است.', "</div>");
        return;
    }
    var R = B.rounds.length, fin = B.rounds[R - 1][0];
    var champName = fin.w ? (fin.w === 1 ? fin.a : fin.b) : '';
    champ.innerHTML = champName ? "<div class=\"card p-4 text-center\" style=\"--c:250 204 21\"><div class=\"text-3xl\">\uD83D\uDC51</div><div class=\"text-xs text-yellow-200\">\u0642\u0647\u0631\u0645\u0627\u0646 \u062A\u0648\u0631\u0646\u0645\u0646\u062A</div><div class=\"text-xl font-black text-yellow-400\">".concat(esc(champName), "</div></div>") : '';
    box.innerHTML = B.rounds.map(function (rd, r) { return "\n    <div class=\"flex flex-col gap-2\" style=\"--c:129 140 248\">\n      <div class=\"text-center text-xs font-bold text-indigo-300 bg-indigo-400/10 rounded-lg py-1\">".concat(roundName(r, R), "</div>\n      <div class=\"rnd flex-1\">").concat(rd.map(function (_, m) { return "<div class=\"mt\">".concat(slot(r, m, 'a')).concat(slot(r, m, 'b'), "</div>"); }).join(''), "</div>\n    </div>"); }).join('');
}
/* ---------- Top players ---------- */
function resolveTop() {
    var chosen = topIds.filter(Boolean);
    var auto = __spreadArray([], players, true).filter(function (p) { return !chosen.includes(p.id); }).sort(function (a, b) { return parseInt(b.activity) - parseInt(a.activity); });
    return topIds.slice(0, 10).map(function (id) { return byId(id) || auto.shift(); }).filter(Boolean);
}
function renderTopPlayers() {
    var medals = ['🥇', '🥈', '🥉'], ring = ['250 204 21', '203 213 225', '217 119 6'];
    var list = resolveTop();
    var podium = list.slice(0, 3).map(function (p, i) { return "\n    <div class=\"card p-5 text-center cursor-pointer ".concat(i === 0 ? 'md:scale-105 shadow-lg shadow-yellow-500/10' : '', "\" onclick=\"openProfile('").concat(p.id, "')\" style=\"--c:").concat(ring[i], "\">\n      <div class=\"text-4xl mb-1\">").concat(medals[i], "</div>\n      <div class=\"font-black text-white text-lg\">").concat(esc(p.gameName), "</div>\n      <div class=\"text-xs text-gray-300 mt-1\">").concat(esc(p.realName), " \u00B7 ").concat(esc(p.role), "</div>\n      <div class=\"text-xs mt-2 font-bold\" style=\"color:rgb(").concat(ring[i], ")\">\u0641\u0639\u0627\u0644\u06CC\u062A: ").concat(esc(p.activity), "</div>\n    </div>"); }).join('');
    var rest = list.slice(3).map(function (p, i) { return "\n    <div class=\"card p-3 flex items-center gap-3 cursor-pointer\" onclick=\"openProfile('".concat(p.id, "')\" style=\"--c:250 204 21\">\n      <span class=\"w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-300 font-black flex items-center justify-center text-sm\">").concat(i + 4, "</span>\n      <div class=\"min-w-0\"><div class=\"font-bold text-white truncate\">").concat(esc(p.gameName), "</div><div class=\"text-xs text-gray-400\">").concat(esc(p.realName), " \u00B7 ").concat(esc(p.role), "</div></div>\n      <span class=\"mr-auto text-xs font-bold text-yellow-300\">").concat(esc(p.activity), "</span>\n    </div>"); }).join('');
    $('topPlayersList').innerHTML = "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4\">".concat(podium, "</div><div class=\"grid grid-cols-1 md:grid-cols-2 gap-3\">").concat(rest, "</div>");
}
/* ---------- Teams ---------- */
function renderTeams() {
    $('teamsList').innerHTML = teams.map(function (t, i) { return "\n    <div class=\"card p-4\" style=\"--c:".concat(TEAM_COLORS[i], "\">\n      <div class=\"flex items-center justify-between mb-3 pb-2 border-b\" style=\"border-color:rgb(").concat(TEAM_COLORS[i], "/.35)\">\n        <h3 class=\"font-black text-lg\" style=\"color:rgb(").concat(TEAM_COLORS[i], ")\">").concat(esc(t.name), "</h3>\n        <span class=\"text-xs text-gray-400\">").concat(t.m.filter(Boolean).length, " \u0627\u0632 \u06F5</span>\n      </div>\n      <ul class=\"space-y-1.5\">").concat(t.m.map(function (id, s) {
        var p = byId(id);
        return "\n        <li ".concat(p ? "onclick=\"openProfile('".concat(p.id, "')\"") : '', " class=\"flex items-center gap-2 text-sm bg-black/30 rounded-lg px-3 py-1.5 ").concat(p ? 'cursor-pointer hover:bg-black/50' : '', "\">\n          <span class=\"w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center\" style=\"background:rgb(").concat(TEAM_COLORS[i], ");color:#04121a\">").concat(s + 1, "</span>\n          ").concat(p ? "<span class=\"font-bold text-white\">".concat(esc(p.gameName), "</span><span class=\"text-xs text-gray-400 mr-auto\">").concat(esc(p.realName), "</span>") : '<span class="text-gray-500">جای خالی</span>', "\n        </li>");
    }).join(''), "</ul>\n    </div>"); }).join('');
}
/* ---------- Admin ---------- */
var openAdminModal = function () { $('adminModal').classList.remove('hidden'); $('adminModal').classList.add('flex'); };
var closeAdminModal = function () { $('adminModal').classList.add('hidden'); $('adminModal').classList.remove('flex'); };
// آدرس Worker تلگرام (بعد از دیپلوی اینجا بگذار). خالی باشد، ورود با رمز قدیمی انجام می‌شود.
var AUTH_URL = '';
var authTok = null;
function grantAdmin() {
    isAdmin = true;
    document.body.classList.add('admin');
    $('adminLoginBox').classList.add('hidden');
    $('adminDashboard').classList.remove('hidden');
    renderAdminAll();
    renderBracket();
    renderArchive();
    renderEdu();
}
function authMsg(t, bad) {
    var m = $('authMsg');
    m.textContent = t;
    m.style.color = bad ? '#fda4af' : '#99f6e4';
}
function sendCode() {
    var btn = $('sendCodeBtn');
    btn.disabled = true;
    authMsg('در حال ارسال کد...');
    fetch(AUTH_URL + '/send', { method: 'POST' }).then(function (r) { return r.json(); }).then(function (d) {
        btn.disabled = false;
        if (!d.ok) { authMsg('ارسال کد ناموفق بود. تنظیمات Worker را چک کن.', true); return; }
        authTok = { exp: d.exp, sig: d.sig };
        authMsg('کد به تلگرام فرستاده شد. ۵ دقیقه اعتبار دارد.');
        $('adminPasswordInput').focus();
    }).catch(function () {
        btn.disabled = false;
        authMsg('اتصال به سرور برقرار نشد.', true);
    });
}
function verifyAdmin() {
    if (!AUTH_URL) {
        if ($('adminPasswordInput').value !== ADMIN_PASS) {
            alert('رمز عبور اشتباه است!');
            return;
        }
        grantAdmin();
        return;
    }
    if (!authTok) { authMsg('اول روی «ارسال کد به تلگرام» بزن.', true); return; }
    fetch(AUTH_URL + '/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: $('adminPasswordInput').value.trim(), exp: authTok.exp, sig: authTok.sig })
    }).then(function (r) { return r.json(); }).then(function (d) {
        if (d.ok) { authTok = null; grantAdmin(); }
        else authMsg('کد اشتباه یا منقضی شده است.', true);
    }).catch(function () { authMsg('اتصال به سرور برقرار نشد.', true); });
}
function initAuthUI() {
    if (!AUTH_URL) return;
    $('sendCodeBtn').classList.remove('hidden');
    var i = $('adminPasswordInput');
    i.type = 'text';
    i.setAttribute('inputmode', 'numeric');
    i.setAttribute('autocomplete', 'one-time-code');
    i.placeholder = 'کد ۸ رقمی تلگرام...';
}
function logoutAdmin() {
    isAdmin = false;
    document.body.classList.remove('admin');
    $('adminLoginBox').classList.remove('hidden');
    $('adminDashboard').classList.add('hidden');
    $('adminPasswordInput').value = '';
    closeAdminModal();
    renderBracket();
    renderArchive();
    renderEdu();
}
function showTab(n) {
    ['players', 'top', 'tour', 'teams', 'score', 'stats', 'prof', 'edu'].forEach(function (t) { return $('tab-' + t).classList.toggle('hidden', t !== n); });
    document.querySelectorAll('.tab[data-tab]').forEach(function (b) { return b.classList.toggle('on', b.dataset.tab === n); });
    if (n === 'stats')
        renderAdminStats();
    if (n === 'prof')
        renderAdminProf();
    if (n === 'edu')
        renderAdminEdu();
}
var playerOpts = function (sel) { return '<option value="">— ' + (sel === 'top' ? 'خودکار' : 'خالی') + ' —</option>' + players.map(function (p) { return "<option value=\"".concat(p.id, "\">").concat(esc(p.gameName), " (").concat(esc(p.realName), ")</option>"); }).join(''); };
function renderAdminAll() { renderAdminPlayersList(); renderAdminTop(); renderAdminTour(); renderAdminTeams(); renderAdminScore(); renderAdminStats(); renderAdminProf(); renderAdminEdu(); }
function renderAdminPlayersList() {
    $('adminPlayersList').innerHTML = players.map(function (p, i) { return "\n    <div class=\"flex justify-between items-center bg-black/40 p-2 rounded-lg border border-teal-300/20 text-sm\">\n      <div><span class=\"font-bold text-white\">".concat(esc(p.gameName), "</span> <span class=\"text-xs text-gray-400\">(").concat(esc(p.realName), ")</span></div>\n      <div class=\"flex gap-2 items-center\">\n        <input type=\"number\" min=\"0\" max=\"20\" step=\"any\" title=\"\u0642\u062F\u0631\u062A \u0627\u0632 \u06F2\u06F0\" placeholder=\"\u0642\u062F\u0631\u062A\" value=\"").concat(typeof p.power === 'number' ? p.power : '', "\" onchange=\"setPower(").concat(i, ",this.value)\" class=\"inp !w-16 !py-1 text-center\">\n        <button onclick=\"editPlayer(").concat(i, ")\" class=\"bg-blue-600/50 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs\">\u0648\u06CC\u0631\u0627\u06CC\u0634</button>\n        <button onclick=\"deletePlayer(").concat(i, ")\" class=\"bg-rose-500/50 hover:bg-rose-500 text-white px-2 py-1 rounded text-xs\">\u062D\u0630\u0641</button>\n      </div>\n    </div>"); }).join('');
}
function renderAdminTop() {
    $('adminTop').innerHTML = topIds.map(function (_, i) { return "\n    <label class=\"block text-sm text-yellow-300\">".concat(['🥇 نفر اول', '🥈 نفر دوم', '🥉 نفر سوم'][i] || 'نفر ' + (i + 1), "\n      <select class=\"inp mt-1\" id=\"topSel").concat(i, "\" onchange=\"setTop(").concat(i, ",this.value)\">").concat(playerOpts('top'), "</select>\n    </label>"); }).join('');
    topIds.forEach(function (_, i) { $('topSel' + i).value = byId(topIds[i]) ? topIds[i] : ''; });
}
function setTop(i, id) {
    if (id)
        topIds = topIds.map(function (v, j) { return (j !== i && v === id) ? '' : v; });
    topIds[i] = id;
    save('ep_top', topIds);
    renderAdminTop();
    renderTopPlayers();
}
function renderAdminTeams() {
    $('adminTeams').innerHTML = teams.map(function (t, i) { return "\n    <div class=\"bg-black/30 p-3 rounded-xl border space-y-2\" style=\"border-color:rgb(".concat(TEAM_COLORS[i], "/.5)\">\n      <input class=\"inp font-bold\" value=\"").concat(esc(t.name), "\" onchange=\"setTeamName(").concat(i, ",this.value)\" placeholder=\"\u0646\u0627\u0645 \u062A\u06CC\u0645\">\n      ").concat(t.m.map(function (_, s) { return "<select class=\"inp\" id=\"tm".concat(i, "_").concat(s, "\" onchange=\"setMember(").concat(i, ",").concat(s, ",this.value)\">").concat(playerOpts('team'), "</select>"); }).join(''), "\n    </div>"); }).join('');
    teams.forEach(function (t, i) { return t.m.forEach(function (id, s) { $("tm".concat(i, "_").concat(s)).value = byId(id) ? id : ''; }); });
}
function setTeamName(i, v) { teams[i].name = v.trim() || 'تیم ' + (i + 1); save('ep_teams', teams); renderTeams(); }
function setMember(i, s, id) {
    if (id)
        teams.forEach(function (t) { return t.m = t.m.map(function (v) { return v === id ? '' : v; }); });
    teams[i].m[s] = id;
    save('ep_teams', teams);
    renderAdminTeams();
    renderTeams();
}
function savePlayer() {
    var idx = parseInt($('editIndex').value);
    var g = function (id) { return $(id).value; };
    var np = {
        id: idx === -1 ? uid() : players[idx].id,
        realName: g('newRealName') || 'ناشناس', gameName: g('newGameName') || 'EP Player', bale: g('newBale') || '-', phone: g('newPhone') || '-',
        rank: g('newRank') || '-', role: g('newRole') || 'عضو عادی', code: g('newCode') || '-', activity: g('newActivity') || '100%',
        type: g('newType') === 'new' ? 'new' : 'old'
    };
    if (g('newPower') !== '')
        np.power = Math.min(20, Math.max(0, Number(g('newPower'))));
    if (idx === -1)
        players.push(np);
    else
        players[idx] = np;
    savePlayersToStorage();
    renderAll();
    renderAdminAll();
    resetForm();
    alert('با موفقیت ذخیره شد!');
}
function editPlayer(i) {
    var p = players[i];
    $('editIndex').value = i;
    $('newRealName').value = p.realName;
    $('newGameName').value = p.gameName;
    $('newBale').value = p.bale;
    $('newPhone').value = p.phone && p.phone !== '-' ? p.phone : '';
    $('newRank').value = p.rank;
    $('newRole').value = p.role;
    $('newCode').value = p.code;
    $('newActivity').value = p.activity;
    $('newType').value = p.type === 'new' ? 'new' : 'old';
    $('newPower').value = typeof p.power === 'number' ? p.power : '';
    $('formTitle').innerText = 'ویرایش مشخصات بازیکن:';
}
function deletePlayer(i) {
    var reason = prompt('این بازیکن به آرشیو منتقل می‌شود. دلیل خروج (اختیاری):', '');
    if (reason === null)
        return;
    var p = players[i], id = p.id;
    players.splice(i, 1);
    archive.unshift(Object.assign({}, p, { leftAt: new Date().toLocaleDateString('fa-IR'), reason: reason.trim() }));
    topIds = topIds.map(function (v) { return v === id ? '' : v; });
    teams.forEach(function (t) { return t.m = t.m.map(function (v) { return v === id ? '' : v; }); });
    save('ep_top', topIds);
    save('ep_teams', teams);
    saveArchive();
    savePlayersToStorage();
    renderAll();
    renderAdminAll();
}
function restoreArchived(id) {
    var k = archive.findIndex(function (x) { return x.id === id; });
    if (k < 0)
        return;
    var p = Object.assign({}, archive[k]);
    delete p.leftAt;
    delete p.reason;
    archive.splice(k, 1);
    players.push(p);
    saveArchive();
    savePlayersToStorage();
    renderAll();
    renderAdminAll();
}
function purgeArchived(id) {
    if (!confirm('این عضو برای همیشه حذف شود؟ این کار برگشت ندارد.'))
        return;
    archive = archive.filter(function (x) { return x.id !== id; });
    weeks.forEach(function (w) { delete w.scores[id]; delete w.chats[id]; });
    saveWeeks();
    saveArchive();
    renderAll();
}
function renderArchive() {
    var q = ($('archiveSearch').value || '').toLowerCase().trim(), box = $('archiveBody');
    var list = archive.filter(function (p) { return !q || [p.realName, p.gameName, p.bale, p.phone || '', p.code, p.reason || ''].some(function (v) { return String(v).toLowerCase().includes(q); }); });
    if (!list.length) {
        box.innerHTML = "<div class=\"card p-6 text-center text-gray-400 col-span-full\" style=\"--c:148 163 184\">".concat(archive.length ? 'موردی پیدا نشد.' : 'آرشیو خالی است. بازیکنی که از پنل مدیریت حذف شود اینجا نگهداری می‌شود.', "</div>");
        return;
    }
    box.innerHTML = list.map(function (p) { return "\n    <div class=\"card p-4 space-y-1 cursor-pointer\" style=\"--c:148 163 184\" onclick=\"openProfile('".concat(p.id, "')\">\n      <div class=\"flex items-center justify-between gap-2\"><div class=\"font-bold text-slate-200 text-base truncate\">").concat(esc(p.gameName), "</div><span class=\"text-[11px] px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 whitespace-nowrap\">\u062E\u0631\u0648\u062C: ").concat(esc(p.leftAt || '—'), "</span></div>\n      <div class=\"text-sm text-gray-300\">\u0646\u0627\u0645 \u0648\u0627\u0642\u0639\u06CC: <span class=\"text-white\">").concat(esc(p.realName), "</span></div>\n      <div class=\"text-xs text-gray-400\">\u0622\u06CC\u062F\u06CC \u0628\u0644\u0647: ").concat(esc(p.bale), " &nbsp;|&nbsp; \u0634\u0645\u0627\u0631\u0647: <span dir=\"ltr\" class=\"inline-block\">").concat(esc(p.phone || '-'), "</span></div>\n      <div class=\"text-xs text-gray-400\">\u0646\u0642\u0634: ").concat(esc(p.role), " &nbsp;|&nbsp; \u06A9\u062F: <span class=\"font-mono\">").concat(esc(p.code), "</span></div>\n      ").concat(p.reason ? "<div class=\"text-xs text-rose-300 bg-rose-500/10 rounded-lg px-2 py-1 mt-1\">\u062F\u0644\u06CC\u0644 \u062E\u0631\u0648\u062C: ".concat(esc(p.reason), "</div>") : '', "\n      ").concat(isAdmin ? "<div class=\"flex gap-2 pt-2\" onclick=\"event.stopPropagation()\"><button onclick=\"restoreArchived('".concat(p.id, "')\" class=\"flex-1 bg-emerald-600/50 hover:bg-emerald-600 text-white py-1.5 rounded-lg text-xs font-bold\">\u21BA \u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC</button><button onclick=\"purgeArchived('").concat(p.id, "')\" class=\"bg-rose-600/50 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs\">\u062D\u0630\u0641 \u062F\u0627\u0626\u0645\u06CC</button></div>") : '', "\n    </div>"); }).join('');
}
function resetForm() {
    $('editIndex').value = -1;
    ['newRealName', 'newGameName', 'newBale', 'newPhone', 'newRank', 'newRole', 'newCode', 'newActivity', 'newPower'].forEach(function (id) { return $(id).value = ''; });
    $('newType').value = 'old';
    $('formTitle').innerText = 'افزودن بازیکن جدید:';
}
/* ---------- Player profile ---------- */
var PRESET_BADGES = ['👑 قهرمان تورنمنت', '🛡️ کاپیتان', '⭐ بازیکن برتر هفته', '🔥 فعال‌ترین', '🚀 رشد سریع', '🎯 بازیکن دقیق', '🤝 همکار تیمی'];
var admProf = '';
var isActiveP = function (p) { return (parseInt(p.activity) || 0) >= 50; };
function openProfile(id) {
    var p = byId(id) || archive.find(function (x) { return x.id === id; });
    if (!p)
        return;
    var gone = !byId(id);
    var ti = teams.findIndex(function (t) { return t.m.includes(id); }), top = resolveTop().findIndex(function (x) { return x.id === id; });
    var li = -1;
    weeks.forEach(function (w, i) { if (w.scores[id] !== undefined)
        li = i; });
    var lastScore = li >= 0 ? weeks[li].scores[id] : null, prevScore = li > 0 && weeks[li - 1].scores[id] !== undefined ? weeks[li - 1].scores[id] : undefined;
    var hasW = weeks.some(function (w) { return w.scores[id] !== undefined; }), hasC = weeks.some(function (w) { return w.chats[id] !== undefined; });
    var letter = (p.gameName.replace(/[^A-Za-z0-9\u0600-\u06FF]/g, '').charAt(0) || 'EP').toUpperCase();
    var chip = function (t, c) { return "<span class=\"text-xs px-3 py-1 rounded-full border\" style=\"color:rgb(".concat(c, ");border-color:rgb(").concat(c, "/.4);background:rgb(").concat(c, "/.1)\">").concat(t, "</span>"); };
    var box = function (v, l) { return "<div class=\"bg-black/30 border border-white/10 rounded-xl p-3 text-center\"><div class=\"font-black text-white text-lg\">".concat(v, "</div><div class=\"text-[11px] text-gray-400\">").concat(l, "</div></div>"); };
    var g = (p.wins || 0) + (p.losses || 0);
    $('profileBody').innerHTML = "\n    <button onclick=\"closeProfile()\" class=\"absolute top-4 left-4 text-gray-400 hover:text-white text-lg\">\u2715</button>\n    <div class=\"flex items-center gap-4 mb-4\">\n      <div class=\"w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg\" style=\"background:linear-gradient(135deg,#1f9e8f,#6d6fd0 60%,#e9b98f)\">".concat(esc(letter), "</div>\n      <div class=\"min-w-0\"><h3 class=\"text-xl font-black text-white truncate\">").concat(esc(p.gameName), "</h3><div class=\"text-sm text-gray-300\">").concat(esc(p.realName), "</div>").concat(p.joinDate ? "<div class=\"text-xs text-gray-500 mt-1\">\u0639\u0636\u0648 \u0627\u0632 ".concat(esc(p.joinDate), "</div>") : '', "</div>\n    </div>\n    <div class=\"flex flex-wrap gap-2 mb-4\">\n      ").concat(gone ? chip('🗃️ خارج‌شده از کلن' + (p.leftAt ? ' · ' + esc(p.leftAt) : ''), '148 163 184') : '', "\n      ").concat(chip(p.type === 'new' ? '✦ عضو جدید' : '👑 عضو قدیمی', p.type === 'new' ? '244 114 182' : '253 186 116'), "\n      ").concat(chip(isActiveP(p) ? '◉ فعال' : '○ کم‌فعال', isActiveP(p) ? '52 211 153' : '56 189 248'), "\n      ").concat(p.role && p.role !== '-' ? chip(esc(p.role), '129 140 248') : '', "\n      ").concat(p.rank && p.rank !== '-' ? chip('رنک: ' + esc(p.rank), '252 211 77') : '', "\n      ").concat(ti >= 0 ? chip('🛡️ ' + esc(teams[ti].name), TEAM_COLORS[ti]) : '', "\n      ").concat(top >= 0 ? chip('🏆 جایگاه ' + fa(top + 1) + ' نفرات برتر', '250 204 21') : '', "\n    </div>\n    ").concat(p.bio ? "<p class=\"text-sm text-gray-200 leading-7 bg-black/25 rounded-xl p-3 mb-4\">".concat(esc(p.bio), "</p>") : '', "\n    ").concat((p.badges || []).length ? "<div class=\"flex flex-wrap gap-2 mb-4\">".concat(p.badges.map(function (b) { return "<span class=\"text-xs px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-300/30 text-amber-200\">".concat(esc(b), "</span>"); }).join(''), "</div>") : '', "\n    <div class=\"grid grid-cols-3 gap-2 mb-4\">\n      ").concat(box(typeof p.power === 'number' ? fa(p.power) + '/۲۰' : '—', 'قدرت'), "\n      ").concat(box(esc(p.activity), 'فعالیت'), "\n      ").concat(box(lastScore === null ? '—' : fa(lastScore), 'آخرین نمره'), "\n      ").concat(box(fa(p.wins || 0), 'برد'), "\n      ").concat(box(fa(p.losses || 0), 'باخت'), "\n      ").concat(box(fa(p.titles || 0), 'قهرمانی'), "\n    </div>\n    ").concat(typeof p.power === 'number' ? "<div class=\"pbar mb-4\"><div class=\"pfill\" style=\"width:".concat(p.power / 20 * 100, "%\"></div></div>") : '', "\n    ").concat(g ? "<div class=\"text-xs text-gray-400 mb-4\">\u062F\u0631\u0635\u062F \u0628\u0631\u062F: <b class=\"text-white\">".concat(fa(Math.round((p.wins || 0) / g * 100)), "\u066A</b>").concat(prevScore !== undefined && lastScore !== null ? ' &nbsp;|&nbsp; تغییر نمره هفته آخر: ' + badge(lastScore - prevScore) : '', "</div>") : (prevScore !== undefined && lastScore !== null ? "<div class=\"text-xs text-gray-400 mb-4\">\u062A\u063A\u06CC\u06CC\u0631 \u0646\u0645\u0631\u0647 \u0647\u0641\u062A\u0647 \u0622\u062E\u0631: ".concat(badge(lastScore - prevScore), "</div>") : ''), "\n    ").concat(hasW ? "<div class=\"card p-3 mb-3\" style=\"--c:52 211 153\"><div class=\"text-sm font-bold text-white mb-1\">\u0631\u0648\u0646\u062F \u0646\u0645\u0631\u0647</div>".concat(lineChart('scores', id, '#34d399'), "</div>") : '', "\n    ").concat(hasC ? "<div class=\"card p-3 mb-3\" style=\"--c:165 180 252\"><div class=\"text-sm font-bold text-white mb-1\">\u0631\u0648\u0646\u062F \u062A\u0639\u062F\u0627\u062F \u0686\u062A</div>".concat(lineChart('chats', id, '#a5b4fc'), "</div>") : '', "\n    <div class=\"text-xs text-gray-400 space-y-1 bg-black/25 rounded-xl p-3\">\n      <div>\u0622\u06CC\u062F\u06CC \u0628\u0644\u0647: <span class=\"text-white\">").concat(esc(p.bale), "</span></div>\n      <div>\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633: <span dir=\"ltr\" class=\"text-white font-mono inline-block\">").concat(esc(p.phone || '-'), "</span></div>\n      <div>\u06A9\u062F \u0628\u0627\u0632\u06CC: <span class=\"text-white font-mono\">").concat(esc(p.code), "</span></div>\n    </div>\n    ").concat(isAdmin && !gone ? "<button onclick=\"editProfileFromModal('".concat(id, "')\" class=\"btn w-full mt-4\">\u270E \u0648\u06CC\u0631\u0627\u06CC\u0634 \u067E\u0631\u0648\u0641\u0627\u06CC\u0644</button>") : '');
    $('profileModal').classList.remove('hidden');
    $('profileModal').classList.add('flex');
}
function closeProfile() { $('profileModal').classList.add('hidden'); $('profileModal').classList.remove('flex'); }
function editProfileFromModal(id) { closeProfile(); admProf = id; openAdminModal(); showTab('prof'); }
function renderAdminProf() {
    var sel = $('admProfSel'), body = $('adminProfBody');
    if (!players.length) {
        sel.innerHTML = '';
        body.innerHTML = '';
        return;
    }
    if (!byId(admProf))
        admProf = players[0].id;
    sel.innerHTML = players.map(function (p) { return "<option value=\"".concat(p.id, "\">").concat(esc(p.gameName), " (").concat(esc(p.realName), ")</option>"); }).join('');
    sel.value = admProf;
    var p = byId(admProf), badges = p.badges || [];
    var custom = badges.filter(function (b) { return !PRESET_BADGES.includes(b); }).join('، ');
    var num = function (k, l) { return "<label class=\"text-xs text-gray-400 flex-1\">".concat(l, "<input type=\"number\" min=\"0\" class=\"inp mt-1 text-center\" value=\"").concat(p[k] == null ? '' : p[k], "\" onchange=\"setProf('").concat(k, "',this.value)\"></label>"); };
    body.innerHTML = "\n    <label class=\"block text-xs text-gray-400\">\u062F\u0631\u0628\u0627\u0631\u0647 \u0628\u0627\u0632\u06CC\u06A9\u0646<textarea rows=\"3\" class=\"inp mt-1\" placeholder=\"\u0686\u0646\u062F \u062E\u0637 \u062F\u0631\u0628\u0627\u0631\u0647 \u0633\u0628\u06A9 \u0628\u0627\u0632\u06CC\u060C \u0646\u0642\u0634 \u06CC\u0627 \u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A...\" onchange=\"setProf('bio',this.value)\">".concat(esc(p.bio || ''), "</textarea></label>\n    <label class=\"block text-xs text-gray-400\">\u062A\u0627\u0631\u06CC\u062E \u0639\u0636\u0648\u06CC\u062A<input class=\"inp mt-1\" value=\"").concat(esc(p.joinDate || ''), "\" placeholder=\"\u0645\u062B\u0644\u0627 \u06F1\u06F4\u06F0\u06F5/\u06F0\u06F8\" onchange=\"setProf('joinDate',this.value)\"></label>\n    <div class=\"flex gap-2\">").concat(num('wins', 'برد')).concat(num('losses', 'باخت')).concat(num('titles', 'قهرمانی'), "</div>\n    <div class=\"text-xs text-gray-400\">\u0645\u062F\u0627\u0644\u200C\u0647\u0627 \u0648 \u062F\u0633\u062A\u0627\u0648\u0631\u062F\u0647\u0627</div>\n    <div class=\"grid grid-cols-1 gap-1.5\">").concat(PRESET_BADGES.map(function (b, i) { return "<label class=\"flex items-center gap-2 text-sm bg-black/30 rounded-lg px-3 py-2 cursor-pointer\"><input type=\"checkbox\" ".concat(badges.includes(b) ? 'checked' : '', " onchange=\"toggleBadge(").concat(i, ",this.checked)\"> ").concat(esc(b), "</label>"); }).join(''), "</div>\n    <label class=\"block text-xs text-gray-400\">\u0645\u062F\u0627\u0644\u200C\u0647\u0627\u06CC \u062F\u0644\u062E\u0648\u0627\u0647 (\u0628\u0627 \u0648\u06CC\u0631\u06AF\u0648\u0644 \u062C\u062F\u0627 \u06A9\u0646)<input class=\"inp mt-1\" value=\"").concat(esc(custom), "\" placeholder=\"\u0645\u062B\u0644\u0627 \uD83C\uDFC5 \u0646\u0641\u0631 \u0627\u0648\u0644 \u0641\u0635\u0644\u060C \u26A1 \u0633\u0631\u06CC\u0639\u200C\u062A\u0631\u06CC\u0646\" onchange=\"setCustomBadges(this.value)\"></label>\n    <button onclick=\"openProfile('").concat(p.id, "')\" class=\"btn w-full\">\uD83D\uDC41 \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u067E\u0631\u0648\u0641\u0627\u06CC\u0644</button>");
}
function setProf(k, v) {
    var p = byId(admProf);
    if (!p)
        return;
    if (['wins', 'losses', 'titles'].includes(k)) {
        if (v === '')
            delete p[k];
        else
            p[k] = Math.max(0, Number(v));
    }
    else
        p[k] = v.trim();
    savePlayersToStorage();
}
function toggleBadge(i, on) {
    var p = byId(admProf), b = PRESET_BADGES[i], list = (p.badges || []).filter(function (x) { return x !== b; });
    if (on)
        list.push(b);
    p.badges = list;
    savePlayersToStorage();
}
function setCustomBadges(v) {
    var p = byId(admProf), keep = (p.badges || []).filter(function (b) { return PRESET_BADGES.includes(b); });
    p.badges = keep.concat(v.split(/[,،]/).map(function (x) { return x.trim(); }).filter(Boolean));
    savePlayersToStorage();
}
/* ---------- Stats ---------- */
var statsAll = false;
var fa1 = function (n) { return Number(n).toLocaleString('fa-IR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
function setPower(i, v) {
    if (v === '')
        delete players[i].power;
    else
        players[i].power = Math.min(20, Math.max(0, Number(v)));
    savePlayersToStorage();
    renderStats();
    if (isAdmin)
        renderAdminStatsSummary();
}
function renderAdminStats() {
    $('adminStatsRows').innerHTML = players.map(function (p, i) { return "\n    <div class=\"flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-pink-300/15\">\n      <span class=\"text-sm text-white flex-1 truncate\">".concat(esc(p.gameName), "</span>\n      <select class=\"inp !w-20 !px-1 !py-1 text-xs\" onchange=\"setType(").concat(i, ",this.value)\"><option value=\"old\" ").concat(p.type !== 'new' ? 'selected' : '', ">\u0642\u062F\u06CC\u0645\u06CC</option><option value=\"new\" ").concat(p.type === 'new' ? 'selected' : '', ">\u062C\u062F\u06CC\u062F</option></select>\n      <input class=\"inp !w-16 !px-1 !py-1 text-center\" value=\"").concat(esc(p.activity), "\" onchange=\"setActivity(").concat(i, ",this.value)\">\n      <input type=\"number\" min=\"0\" max=\"20\" step=\"any\" class=\"inp !w-14 !px-1 !py-1 text-center\" value=\"").concat(typeof p.power === 'number' ? p.power : '', "\" placeholder=\"\u2014\" onchange=\"setPower(").concat(i, ",this.value)\">\n    </div>"); }).join('');
    renderAdminStatsSummary();
}
function renderAdminStatsSummary() {
    var act = function (p) { return (parseInt(p.activity) || 0) >= 50; }, wp = players.filter(function (p) { return typeof p.power === 'number'; });
    var avg = wp.length ? wp.reduce(function (t, p) { return t + p.power; }, 0) / wp.length : 0;
    var c = function (v, l) { return "<div class=\"bg-black/30 border border-pink-300/20 rounded-xl p-2 text-center\"><div class=\"font-black text-white\">".concat(v, "</div><div class=\"text-[11px] text-gray-400\">").concat(l, "</div></div>"); };
    $('adminStatsSummary').innerHTML = c(fa(players.length), 'کل اعضا') + c(fa(players.filter(function (p) { return p.type === 'new'; }).length), 'جدید') + c(fa(players.filter(act).length), 'فعال') + c(fa(players.filter(function (p) { return !act(p); }).length), 'کم‌فعال') + c(fa(players.filter(function (p) { return p.type !== 'new'; }).length), 'قدیمی') + c(fa1(avg), 'میانگین قدرت');
}
function setType(i, v) { players[i].type = v === 'new' ? 'new' : 'old'; savePlayersToStorage(); renderStats(); renderAdminStatsSummary(); }
function setActivity(i, v) {
    v = v.trim() || '0%';
    if (/^\d+$/.test(v))
        v += '%';
    players[i].activity = v;
    savePlayersToStorage();
    renderStats();
    renderTopPlayers();
    renderAdminStatsSummary();
}
function renderStats() {
    var isActive = function (p) { return (parseInt(p.activity) || 0) >= 50; };
    var withP = players.filter(function (p) { return typeof p.power === 'number'; });
    var avg = withP.length ? withP.reduce(function (t, p) { return t + p.power; }, 0) / withP.length : 0;
    var actP = withP.filter(isActive);
    var pct = actP.length ? Math.round(actP.reduce(function (t, p) { return t + p.power; }, 0) / actP.length / 20 * 100) : 0;
    var card = function (ico, val, label, c, hl) { return "<div class=\"card p-4 flex flex-col gap-2 min-h-[130px] justify-between ".concat(hl ? 'shadow-lg shadow-amber-400/10' : '', "\" style=\"--c:").concat(c, "\"><span class=\"text-xl\" style=\"color:rgb(").concat(c, ")\">").concat(ico, "</span><div><div class=\"text-4xl font-black ").concat(hl ? 'text-amber-300' : 'text-white', "\">").concat(val, "</div><div class=\"text-sm text-gray-300 mt-1\">").concat(label, "</div></div></div>"); };
    var ranked = __spreadArray([], withP, true).sort(function (a, b) { return b.power - a.power; });
    var shown = statsAll ? ranked : ranked.slice(0, 5);
    $('statsBody').innerHTML = "\n    <div class=\"card p-5 mb-4\" style=\"--c:252 211 77\">\n      <div class=\"flex items-center justify-between mb-4\">\n        <div class=\"flex items-center gap-3\"><span class=\"text-3xl\">\u26A1</span><div><div class=\"font-black text-lg text-white\">\u0633\u0637\u062D \u0642\u062F\u0631\u062A EP</div><div class=\"text-xs text-gray-400\">\u0642\u062F\u0631\u062A \u062C\u0645\u0639\u06CC \u0627\u0639\u0636\u0627\u06CC \u0641\u0639\u0627\u0644 \u06A9\u0644\u0646</div></div></div>\n        <div class=\"text-3xl font-black text-amber-300\">".concat(fa(pct), "\u066A</div>\n      </div>\n      <div class=\"pbar\"><div class=\"pfill\" style=\"width:").concat(pct, "%\"></div></div>\n      <div class=\"flex justify-between text-xs text-gray-400 mt-2\"><span>\u06F0</span><span>\u06F1\u06F0</span><span>\u062D\u062F\u0627\u06A9\u062B\u0631 \u0642\u062F\u0631\u062A \u06F2\u06F0</span></div>\n    </div>\n    <div class=\"grid grid-cols-2 gap-3 mb-4\">\n      ").concat(card('♟', fa(players.length), 'کل اعضا', '129 140 248'), "\n      ").concat(card('👑', fa(players.filter(function (p) { return p.type !== 'new'; }).length), 'اعضای قدیمی', '253 186 116'), "\n      ").concat(card('✦', fa(players.filter(function (p) { return p.type === 'new'; }).length), 'اعضای جدید', '244 114 182'), "\n      ").concat(card('◉', fa(players.filter(isActive).length), 'اعضای فعال', '52 211 153'), "\n      ").concat(card('○', fa(players.filter(function (p) { return !isActive(p); }).length), 'کم‌فعال / غیرفعال', '56 189 248'), "\n      ").concat(card('⚡', fa1(avg), 'میانگین قدرت از ۲۰', '252 211 77', true), "\n    </div>\n    <div class=\"card p-5\" style=\"--c:129 140 248\">\n      <div class=\"flex items-center justify-between mb-3 pb-3 border-b border-white/10\">\n        <h3 class=\"font-black text-white\">\u26A1 \u0628\u0631\u062A\u0631\u06CC\u0646 \u0627\u0639\u0636\u0627\u06CC EP</h3>\n        ").concat(ranked.length > 5 ? "<button onclick=\"statsAll=!statsAll;renderStats()\" class=\"text-xs px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold\">".concat(statsAll ? 'نمایش کمتر' : 'مشاهده همه', "</button>") : '', "\n      </div>\n      ").concat(shown.length ? shown.map(function (p, i) { return "<div class=\"flex items-center gap-3 py-2 cursor-pointer\" onclick=\"openProfile('".concat(p.id, "')\">\n        <span class=\"w-6 text-center font-black text-indigo-300\">").concat(fa(i + 1), "</span>\n        <span class=\"font-bold text-white truncate w-32 shrink-0\">").concat(esc(p.gameName), "</span>\n        <div class=\"pbar flex-1\"><div class=\"pfill\" style=\"width:").concat(p.power / 20 * 100, "%\"></div></div>\n        <span class=\"font-black text-amber-300 text-sm w-14 text-left\">").concat(fa(p.power), "/\u06F2\u06F0</span>\n      </div>"); }).join('') : '<div class="text-center text-gray-500 text-sm py-4">هنوز قدرتی برای اعضا ثبت نشده. مدیر در پنل مدیریت قدرت هر عضو را وارد می‌کند.</div>', "\n    </div>\n    <p class=\"text-xs text-gray-500 mt-3\">\u0639\u0636\u0648 \u00AB\u0641\u0639\u0627\u0644\u00BB \u06CC\u0639\u0646\u06CC \u0645\u06CC\u0632\u0627\u0646 \u0641\u0639\u0627\u0644\u06CC\u062A \u06F5\u06F0\u066A \u06CC\u0627 \u0628\u06CC\u0634\u062A\u0631. \u0633\u0637\u062D \u0642\u062F\u0631\u062A\u060C \u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0642\u062F\u0631\u062A \u0627\u0639\u0636\u0627\u06CC \u0641\u0639\u0627\u0644 \u0646\u0633\u0628\u062A \u0628\u0647 \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F2\u06F0 \u0627\u0633\u062A.</p>");
}
/* ---------- Weekly scores, chats & analysis ---------- */
var weeks = load('ep_weeks', []);
weeks.forEach(function (w) { w.scores = w.scores || {}; w.chats = w.chats || {}; });
var selW = weeks.length - 1, admW = weeks.length - 1, metric = 'scores', chartPid = '';
var MET = { scores: { name: 'نمره', color: '#34d399' }, chats: { name: 'تعداد چت', color: '#a5b4fc' } };
var saveWeeks = function () { return save('ep_weeks', weeks); };
var fa = function (n) { return Number(n).toLocaleString('fa-IR', { maximumFractionDigits: 1 }); };
function setMetric(m) {
    metric = m;
    ['scores', 'chats'].forEach(function (k) { return $('m-' + k).classList.toggle('on', k === m); });
    renderAnalysis();
}
function spark(vals, color) {
    if (vals.length < 2)
        return '';
    var w = 70, h = 22, mn = Math.min.apply(Math, vals), mx = Math.max.apply(Math, vals), n = vals.length;
    var pts = vals.map(function (v, i) { return "".concat((w - 3 - i * (w - 6) / (n - 1)).toFixed(1), ",").concat((h - 3 - (v - mn) / ((mx - mn) || 1) * (h - 6)).toFixed(1)); }).join(' ');
    return "<svg width=\"".concat(w, "\" height=\"").concat(h, "\" viewBox=\"0 0 ").concat(w, " ").concat(h, "\" aria-hidden=\"true\"><polyline fill=\"none\" stroke=\"").concat(color, "\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"").concat(pts, "\"/></svg>");
}
function badge(d) {
    if (d === null)
        return '<span class="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-400">جدید</span>';
    if (d > 0)
        return "<span class=\"text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold\">\u25B2 ".concat(fa(d), "</span>");
    if (d < 0)
        return "<span class=\"text-xs px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold\">\u25BC ".concat(fa(-d), "</span>");
    return '<span class="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-300">بدون تغییر</span>';
}
function lineChart(key, pid, color) {
    var vals = weeks.map(function (w) {
        if (pid)
            return w[key][pid] === undefined ? null : w[key][pid];
        var a = players.map(function (p) { return w[key][p.id]; }).filter(function (v) { return v !== undefined; });
        return a.length ? a.reduce(function (t, v) { return t + v; }, 0) / a.length : null;
    });
    var def = vals.filter(function (v) { return v !== null; });
    if (!def.length)
        return '<div class="text-center text-sm text-gray-500 py-8">برای این مورد داده‌ای ثبت نشده است.</div>';
    var W = 600, H = 230, L = 40, R = 18, T = 24, B = 36, n = weeks.length;
    var mn = Math.min.apply(Math, def), mx = Math.max.apply(Math, def);
    if (mn === mx) {
        mn -= 1;
        mx += 1;
    }
    var pad = (mx - mn) * .15;
    mn -= pad;
    mx += pad;
    var x = function (i) { return n === 1 ? W / 2 : W - R - i * (W - L - R) / (n - 1); }, y = function (v) { return T + (1 - (v - mn) / (mx - mn)) * (H - T - B); };
    var grid = [0, 1, 2, 3].map(function (g) { var v = mn + (mx - mn) * g / 3; return "<line x1=\"".concat(L, "\" x2=\"").concat(W - R, "\" y1=\"").concat(y(v), "\" y2=\"").concat(y(v), "\" stroke=\"rgba(255,255,255,.08)\"/><text x=\"").concat(L - 6, "\" y=\"").concat(y(v) + 4, "\" text-anchor=\"end\" font-size=\"11\" fill=\"#94a3b8\">").concat(fa(Math.round(v * 10) / 10), "</text>"); }).join('');
    var pts = vals.map(function (v, i) { return v === null ? null : [x(i), y(v), v, i]; }).filter(Boolean);
    var area = pts.length > 1 ? "<polygon points=\"".concat(pts[0][0], ",").concat(H - B, " ").concat(pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '), " ").concat(pts[pts.length - 1][0], ",").concat(H - B, "\" fill=\"").concat(color, "\" opacity=\".12\"/>") : '';
    var step = n > 8 ? Math.ceil(n / 8) : 1;
    var labels = weeks.map(function (w, i) { return i % step ? '' : "<text x=\"".concat(x(i), "\" y=\"").concat(H - 12, "\" text-anchor=\"middle\" font-size=\"11\" fill=\"").concat(i === selW ? '#fff' : '#94a3b8', "\">").concat(esc(w.label.length > 9 ? w.label.slice(0, 9) + '…' : w.label), "</text>"); }).join('');
    var dots = pts.map(function (p) { return "<circle cx=\"".concat(p[0], "\" cy=\"").concat(p[1], "\" r=\"").concat(p[3] === selW ? 6 : 4, "\" fill=\"").concat(color, "\" stroke=\"#06141b\" stroke-width=\"2\"/><text x=\"").concat(p[0], "\" y=\"").concat(p[1] - 11, "\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#e2e8f0\">").concat(fa(Math.round(p[2] * 10) / 10), "</text>"); }).join('');
    return "<svg viewBox=\"0 0 ".concat(W, " ").concat(H, "\" class=\"w-full h-auto\" role=\"img\" aria-label=\"\u0646\u0645\u0648\u062F\u0627\u0631 \u0631\u0648\u0646\u062F\">").concat(grid).concat(area, "<polyline fill=\"none\" stroke=\"").concat(color, "\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\" points=\"").concat(pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '), "\"/>").concat(dots).concat(labels, "</svg>");
}
function renderAnalysis() {
    var body = $('analysisBody'), sel = $('weekSelect');
    if (!weeks.length) {
        sel.innerHTML = '';
        body.innerHTML = '<div class="card p-6 text-center text-gray-400">هنوز اطلاعاتی ثبت نشده است.</div>';
        return;
    }
    var key = metric, M = MET[key];
    selW = Math.min(Math.max(selW, 0), weeks.length - 1);
    sel.innerHTML = weeks.map(function (w, i) { return "<option value=\"".concat(i, "\">").concat(esc(w.label), "</option>"); }).join('');
    sel.value = selW;
    var wk = weeks[selW];
    var rows = players.filter(function (p) { return wk[key][p.id] !== undefined; }).map(function (p) {
        var cur = wk[key][p.id], pv = selW > 0 ? weeks[selW - 1][key][p.id] : undefined;
        return { p: p, cur: cur, d: pv !== undefined ? cur - pv : null, hist: weeks.slice(0, selW + 1).map(function (w) { return w[key][p.id]; }).filter(function (v) { return v !== undefined; }) };
    }).sort(function (a, b) { return b.cur - a.cur; });
    var chartOpts = '<option value="">' + (key === 'chats' ? 'میانگین تیم' : 'میانگین تیم') + '</option>' + players.map(function (p) { return "<option value=\"".concat(p.id, "\">").concat(esc(p.gameName), "</option>"); }).join('');
    var chartBox = "<div class=\"card p-4 mb-5\" style=\"--c:".concat(key === 'chats' ? '165 180 252' : '52 211 153', "\">\n    <div class=\"flex items-center justify-between gap-2 mb-2\"><h3 class=\"font-bold text-sm text-white\">\u0631\u0648\u0646\u062F ").concat(M.name, " \u062F\u0631 \u0647\u0641\u062A\u0647\u200C\u0647\u0627</h3>\n    <select class=\"inp !w-auto !py-1\" onchange=\"chartPid=this.value;renderAnalysis()\">").concat(chartOpts, "</select></div>\n    ").concat(lineChart(key, chartPid, M.color), "</div>");
    if (!rows.length) {
        body.innerHTML = chartBox + "<div class=\"card p-6 text-center text-gray-400\">\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0647\u0641\u062A\u0647 ".concat(M.name, "\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.</div>");
        body.querySelector('select').value = chartPid;
        return;
    }
    var withD = rows.filter(function (r) { return r.d !== null; });
    var tot = rows.reduce(function (t, r) { return t + r.cur; }, 0), avg = tot / rows.length;
    var sumD = withD.reduce(function (t, r) { return t + r.d; }, 0), avgD = withD.length ? sumD / withD.length : null;
    var up = withD.filter(function (r) { return r.d > 0; }).sort(function (a, b) { return b.d - a.d; })[0], down = withD.filter(function (r) { return r.d < 0; }).sort(function (a, b) { return a.d - b.d; })[0];
    var stat = function (t, v, sub, c) { return "<div class=\"card p-4 text-center\" style=\"--c:".concat(c, "\"><div class=\"text-xs text-gray-400 mb-1\">").concat(t, "</div><div class=\"font-black text-white truncate\">").concat(v, "</div><div class=\"text-xs mt-1\">").concat(sub, "</div></div>"); };
    var first = key === 'chats' ? stat('مجموع چت تیم', fa(tot), withD.length ? badge(sumD) : '<span class="text-gray-500">—</span>', '165 180 252') : stat('میانگین تیم', fa(avg), avgD === null ? '<span class="text-gray-500">—</span>' : badge(avgD), '52 211 153');
    body.innerHTML = chartBox + "\n    <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5\">\n      ".concat(first, "\n      ").concat(stat('بیشترین رشد', up ? esc(up.p.gameName) : '—', up ? badge(up.d) : '<span class="text-gray-500">رشدی ثبت نشده</span>', '52 211 153'), "\n      ").concat(stat('بیشترین افت', down ? esc(down.p.gameName) : '—', down ? badge(down.d) : '<span class="text-gray-500">افتی ثبت نشده</span>', '244 63 94'), "\n    </div>\n    <div class=\"space-y-2\">").concat(rows.map(function (r, i) {
        var t = r.hist.length > 1 ? r.hist[r.hist.length - 1] - r.hist[0] : 0;
        return "<div class=\"card p-3 flex items-center gap-3 cursor-pointer\" onclick=\"openProfile('".concat(r.p.id, "')\">\n        <span class=\"w-7 h-7 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-black flex items-center justify-center shrink-0\">").concat(fa(i + 1), "</span>\n        <div class=\"min-w-0\"><div class=\"font-bold text-white truncate\">").concat(esc(r.p.gameName), "</div><div class=\"text-xs text-gray-400\">").concat(esc(r.p.realName), "</div></div>\n        <div class=\"mr-auto flex items-center gap-3\">").concat(spark(r.hist, t >= 0 ? '#34d399' : '#fb7185'), "<span class=\"font-black text-white w-12 text-center\">").concat(fa(r.cur), "</span>").concat(badge(r.d), "</div>\n      </div>");
    }).join(''), "</div>\n    <p class=\"text-xs text-gray-500 mt-3\">\u062A\u063A\u06CC\u06CC\u0631 \u0646\u0633\u0628\u062A \u0628\u0647 ").concat(selW > 0 ? esc(weeks[selW - 1].label) : 'هفته قبل (هنوز وجود ندارد)', " \u062D\u0633\u0627\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A.</p>");
    body.querySelector('select').value = chartPid;
}
function renderAdminScore() {
    var sel = $('admWeekSel'), body = $('adminScoreBody');
    if (!weeks.length) {
        sel.innerHTML = '';
        body.innerHTML = '<div class="text-sm text-gray-400 text-center py-3">با «هفته جدید» شروع کن.</div>';
        return;
    }
    admW = Math.min(Math.max(admW, 0), weeks.length - 1);
    sel.innerHTML = weeks.map(function (w, i) { return "<option value=\"".concat(i, "\">").concat(esc(w.label), "</option>"); }).join('');
    sel.value = admW;
    var wk = weeks[admW], pv = admW > 0 ? weeks[admW - 1] : { scores: {}, chats: {} };
    var inp = function (k, p, ph) { return "<input type=\"number\" step=\"any\" class=\"inp !w-24 text-center\" value=\"".concat(wk[k][p.id] == null ? '' : wk[k][p.id], "\" placeholder=\"").concat(pv[k][p.id] !== undefined ? 'قبلی: ' + pv[k][p.id] : ph, "\" onchange=\"setVal('").concat(k, "','").concat(p.id, "',this.value)\">"); };
    body.innerHTML = "\n    <div class=\"flex gap-2\"><input class=\"inp\" value=\"".concat(esc(wk.label), "\" onchange=\"renameWeek(this.value)\" placeholder=\"\u0639\u0646\u0648\u0627\u0646 \u0647\u0641\u062A\u0647\"><button onclick=\"delWeek()\" class=\"bg-rose-600/60 hover:bg-rose-600 text-white px-3 rounded-lg text-xs whitespace-nowrap\">\u062D\u0630\u0641 \u0647\u0641\u062A\u0647</button></div>\n    <div class=\"flex justify-end gap-2 text-[11px] text-gray-400 pl-1\"><span class=\"w-24 text-center\">\u0646\u0645\u0631\u0647</span><span class=\"w-24 text-center\">\u062A\u0639\u062F\u0627\u062F \u0686\u062A</span></div>\n    ").concat(players.map(function (p) { return "<div class=\"flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-teal-300/15\">\n      <span class=\"text-sm text-white flex-1 truncate\">".concat(esc(p.gameName), " <span class=\"text-xs text-gray-400\">(").concat(esc(p.realName), ")</span></span>\n      ").concat(inp('scores', p, 'نمره')).concat(inp('chats', p, 'چت'), "\n    </div>"); }).join(''));
}
function addWeek() {
    weeks.push({ label: 'هفته ' + fa(weeks.length + 1), scores: {}, chats: {} });
    admW = selW = weeks.length - 1;
    saveWeeks();
    renderAdminScore();
    renderAnalysis();
}
function renameWeek(v) { weeks[admW].label = v.trim() || 'هفته ' + fa(admW + 1); saveWeeks(); renderAdminScore(); renderAnalysis(); }
function delWeek() {
    if (!confirm('این هفته و اطلاعاتش حذف شود؟'))
        return;
    weeks.splice(admW, 1);
    admW = selW = weeks.length - 1;
    saveWeeks();
    renderAdminScore();
    renderAnalysis();
}
function setVal(k, id, v) {
    if (v === '')
        delete weeks[admW][k][id];
    else
        weeks[admW][k][id] = Number(v);
    saveWeeks();
    renderAnalysis();
}
/* ---------- Menu: one section at a time ---------- */
var navLinks = __spreadArray([], document.querySelectorAll('nav .nv'), true);
function showSec(id) {
    document.querySelectorAll('section.sec').forEach(function (s) { return s.classList.toggle('hidden', s.id !== id); });
    navLinks.forEach(function (a) { return a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
    try {
        history.replaceState(null, '', '#' + id);
    }
    catch (e) { }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
navLinks.forEach(function (a) { return a.addEventListener('click', function (e) { e.preventDefault(); showSec(a.getAttribute('href').slice(1)); }); });
function renderAll() {
    [filterPlayers, renderBracket, renderTopPlayers, renderTeams, renderAnalysis, renderStats, renderArchive, renderEdu].forEach(function (f) { try {
        f();
    }
    catch (e) {
        console.error(f.name, e);
    } });
}
"use strict";
/* ---------- Education / tactics ---------- */
var tactics = load('ep_tactics', []);
var eduMin = Number(load('ep_edu_min', 18)) || 18;
var eduPid = load('ep_edu', '');
var eduArmy = '', eduEditId = '';
var saveTactics = function () { return save('ep_tactics', tactics); };
function avgScore(p) {
    var v = weeks.map(function (w) { return w.scores[p.id]; }).filter(function (x) { return x !== undefined; });
    return v.length ? v.reduce(function (t, x) { return t + x; }, 0) / v.length : null;
}
function eduTry() {
    var q = $('eduInput').value.trim().toLowerCase(), msg = $('eduMsg');
    var p = q && players.find(function (x) { return String(x.gameName).toLowerCase() === q || (x.code && x.code !== '-' && String(x.code).toLowerCase() === q); });
    if (!p) {
        msg.textContent = 'بازیکنی با این نام بازی یا کد پیدا نشد.';
        return;
    }
    var a = avgScore(p);
    if (a === null) {
        msg.textContent = 'هنوز نمره‌ای برای تو ثبت نشده است.';
        return;
    }
    if (a <= eduMin) {
        msg.textContent = 'میانگین نمره تو ' + fa1(a) + ' است. برای باز شدن این بخش باید بیشتر از ' + fa(eduMin) + ' شود.';
        return;
    }
    eduPid = p.id;
    save('ep_edu', eduPid);
    renderEdu();
}
function eduLock() { eduPid = ''; save('ep_edu', ''); renderEdu(); }
function eduSetArmy(a) { eduArmy = a; renderEdu(); }
function renderEdu() {
    var box = $('eduBody'), p = byId(eduPid), a = p ? avgScore(p) : null;
    var ok = isAdmin || (p && a !== null && a > eduMin);
    if (!ok) {
        box.innerHTML = "<div class=\"card p-6 text-center max-w-md mx-auto\" style=\"--c:251 146 60\">\n      <div class=\"text-5xl mb-3\">\uD83D\uDD12</div>\n      <div class=\"font-black text-white mb-1\">\u0628\u062E\u0634 \u0645\u062E\u0635\u0648\u0635 \u0627\u0639\u0636\u0627\u06CC \u0628\u0631\u062A\u0631</div>\n      <p class=\"text-sm text-gray-300 mb-4 leading-7\">\u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC\u06CC \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F \u06A9\u0647 \u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0646\u0645\u0631\u0647\u200C\u0634\u0627\u0646 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 <b class=\"text-orange-300\">".concat(fa(eduMin), "</b> \u0628\u0627\u0634\u062F.</p>\n      <input id=\"eduInput\" class=\"inp text-center mb-3\" placeholder=\"\u0646\u0627\u0645 \u0628\u0627\u0632\u06CC \u06CC\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC \u062E\u0648\u062F\u062A\" onkeydown=\"if(event.key==='Enter')eduTry()\" style=\"--c:251 146 60\">\n      <button onclick=\"eduTry()\" class=\"btn w-full\" style=\"--c:251 146 60\">\u0628\u0631\u0631\u0633\u06CC \u0648 \u0628\u0627\u0632 \u06A9\u0631\u062F\u0646</button>\n      <p id=\"eduMsg\" class=\"text-xs mt-3 text-rose-300 min-h-[1rem]\"></p></div>");
        return;
    }
    var armies = [];
    tactics.forEach(function (t) { if (armies.indexOf(t.army) < 0)
        armies.push(t.army); });
    if (eduArmy && armies.indexOf(eduArmy) < 0)
        eduArmy = '';
    var list = tactics.filter(function (t) { return !eduArmy || t.army === eduArmy; });
    var chip = function (label, on, val) { return "<button onclick=\"eduSetArmy('".concat(val, "')\" class=\"nv ").concat(on ? 'on' : '', "\" style=\"--c:251 146 60\">").concat(label, "</button>"); };
    box.innerHTML = "\n    <div class=\"flex items-center justify-between gap-2 mb-4 bg-black/25 rounded-xl p-3\">\n      <div class=\"text-sm text-gray-200\">".concat(p && a !== null && a > eduMin ? '🔓 سلام <b class="text-white">' + esc(p.gameName) + '</b> · میانگین تو: <b class="text-orange-300">' + fa1(a) + '</b>' : '🛡️ نمای مدیر', "</div>\n      ").concat(p ? '<button onclick="eduLock()" class="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">قفل کردن</button>' : '', "\n    </div>\n    ").concat(armies.length ? "<div class=\"flex gap-2 overflow-x-auto pb-2 mb-3\">".concat(chip('همه', !eduArmy, '')).concat(armies.map(function (x) { return chip(esc(x), eduArmy === x, esc(x).replace(/'/g, '&#39;')); }).join(''), "</div>") : '', "\n    ").concat(list.length ? "<div class=\"space-y-3\">".concat(list.map(function (t) { return "\n      <div class=\"card p-4\" style=\"--c:251 146 60\">\n        <div class=\"flex items-center justify-between gap-2 mb-2\"><h3 class=\"font-black text-white\">".concat(esc(t.title), "</h3><span class=\"text-[11px] px-3 py-1 rounded-full bg-orange-400/15 text-orange-200 border border-orange-300/30 whitespace-nowrap\">\u2694\uFE0F ").concat(esc(t.army), "</span></div>\n        <div class=\"text-sm text-gray-200 leading-8\" style=\"white-space:pre-wrap\">").concat(esc(t.body), "</div>\n      </div>"); }).join(''), "</div>") : '<div class="card p-6 text-center text-gray-400" style="--c:251 146 60">هنوز تاکتیکی ثبت نشده است.</div>');
}
/* admin */
function renderAdminEdu() {
    var box = $('adminEduBody');
    if (!box)
        return;
    var cur = tactics.find(function (t) { return t.id === eduEditId; }) || { army: '', title: '', body: '' };
    var armies = [];
    tactics.forEach(function (t) { if (armies.indexOf(t.army) < 0)
        armies.push(t.army); });
    var elig = players.filter(function (p) { var v = avgScore(p); return v !== null && v > eduMin; });
    box.innerHTML = "\n    <label class=\"block text-xs text-gray-400\">\u062D\u062F\u0627\u0642\u0644 \u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 (\u0628\u06CC\u0634\u062A\u0631 \u0627\u0632)\n      <input type=\"number\" step=\"any\" class=\"inp mt-1 text-center\" value=\"".concat(eduMin, "\" onchange=\"setEduMin(this.value)\"></label>\n    <div class=\"text-xs text-gray-400\">\u0627\u0639\u0636\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637 (").concat(fa(elig.length), "): <span class=\"text-orange-200\">").concat(elig.length ? elig.map(function (p) { return esc(p.gameName); }).join('، ') : 'هنوز کسی نیست', "</span></div>\n    <div class=\"space-y-2 bg-black/30 p-4 rounded-xl border border-orange-300/25\">\n      <h4 class=\"font-bold text-sm text-orange-300\">").concat(eduEditId ? 'ویرایش تاکتیک' : 'افزودن تاکتیک جدید', "</h4>\n      <input id=\"edArmy\" list=\"armyList\" class=\"inp\" placeholder=\"\u0628\u0631\u0627\u06CC \u06A9\u062F\u0627\u0645 \u0627\u0631\u062A\u0634\u061F\" value=\"").concat(esc(cur.army), "\">\n      <datalist id=\"armyList\">").concat(armies.map(function (x) { return '<option value="' + esc(x) + '">'; }).join(''), "</datalist>\n      <input id=\"edTitle\" class=\"inp\" placeholder=\"\u0639\u0646\u0648\u0627\u0646 \u062A\u0627\u06A9\u062A\u06CC\u06A9\" value=\"").concat(esc(cur.title), "\">\n      <textarea id=\"edBody\" rows=\"6\" class=\"inp\" placeholder=\"\u0645\u062A\u0646 \u062A\u0627\u06A9\u062A\u06CC\u06A9 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633...\">").concat(esc(cur.body), "</textarea>\n      <div class=\"flex gap-2\"><button onclick=\"eduSave()\" class=\"btn flex-1\">\u0630\u062E\u06CC\u0631\u0647 \u062A\u0627\u06A9\u062A\u06CC\u06A9</button>").concat(eduEditId ? '<button onclick="eduEditId=&#39;&#39;;renderAdminEdu()" class="bg-gray-700 text-white px-3 rounded-lg text-sm">لغو</button>' : '', "</div>\n    </div>\n    <div class=\"space-y-2\">").concat(tactics.map(function (t) { return "<div class=\"flex items-center justify-between gap-2 bg-black/30 p-2 rounded-lg border border-orange-300/15 text-sm\">\n      <div class=\"min-w-0\"><div class=\"font-bold text-white truncate\">".concat(esc(t.title), "</div><div class=\"text-xs text-orange-200\">\u2694\uFE0F ").concat(esc(t.army), "</div></div>\n      <div class=\"flex gap-2 shrink-0\"><button onclick=\"eduEdit('").concat(t.id, "')\" class=\"bg-blue-600/50 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs\">\u0648\u06CC\u0631\u0627\u06CC\u0634</button><button onclick=\"eduDel('").concat(t.id, "')\" class=\"bg-rose-600/50 hover:bg-rose-600 text-white px-2 py-1 rounded text-xs\">\u062D\u0630\u0641</button></div></div>"); }).join('') || '<div class="text-sm text-gray-500 text-center py-2">هنوز تاکتیکی ثبت نشده.</div>', "</div>");
}
function setEduMin(v) { eduMin = Number(v) || 18; save('ep_edu_min', eduMin); renderAdminEdu(); renderEdu(); }
function eduSave() {
    var army = $('edArmy').value.trim(), title = $('edTitle').value.trim(), body = $('edBody').value.trim();
    if (!army || !title || !body) {
        alert('ارتش، عنوان و متن تاکتیک را کامل بنویس.');
        return;
    }
    if (eduEditId) {
        var t = tactics.find(function (x) { return x.id === eduEditId; });
        if (t) {
            t.army = army;
            t.title = title;
            t.body = body;
        }
    }
    else
        tactics.push({ id: uid(), army: army, title: title, body: body });
    eduEditId = '';
    saveTactics();
    renderAdminEdu();
    renderEdu();
}
function eduEdit(id) { eduEditId = id; renderAdminEdu(); }
function eduDel(id) {
    if (!confirm('این تاکتیک حذف شود؟'))
        return;
    tactics = tactics.filter(function (t) { return t.id !== id; });
    if (eduEditId === id)
        eduEditId = '';
    saveTactics();
    renderAdminEdu();
    renderEdu();
}

function addDefaultMembers() {
    var added = 0, restored = 0;
    defaultPlayers.forEach(function (d) {
        if (players.some(function (p) { return p.gameName === d.gameName; }))
            return;
        var arch = archive.filter(function (p) { return p.gameName === d.gameName; })[0];
        if (arch) {
            restoreArchived(arch.id);
            restored++;
            return;
        }
        var c = JSON.parse(JSON.stringify(d));
        c.id = uid();
        players.push(c);
        added++;
    });
    savePlayersToStorage();
    renderAll();
    renderAdminAll();
    alert(added + ' عضو اضافه شد' + (restored ? ' و ' + restored + ' عضو از آرشیو برگشت' : '') + (added + restored === 0 ? ' (همه اعضای اولیه از قبل در لیست بودند)' : '') + '.');
}

"use strict";
/* ---------- Site gate (members only) ---------- */
function h53(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
var TEAM_HASH = 4153455446717171;
var normCode = function (s) { return String(s == null ? '' : s).replace(/\s+/g, '').toLowerCase(); };
var gateFails = 0, gateBlockUntil = 0;
function gateOpen() { document.body.classList.remove('locked'); $('gate').style.display = 'none'; }
function gateMsg(t) { $('gateMsg').textContent = t; }
function gateLogin() {
    if (Date.now() < gateBlockUntil) {
        gateMsg('چند بار اشتباه زدی. چند ثانیه صبر کن و دوباره تلاش کن.');
        return;
    }
    var code = normCode($('gateCode').value), team = $('gateTeam').value.trim();
    var p = code && code !== '-' ? players.find(function (x) { return normCode(x.code) === code; }) : null;
    if (!p || h53(team) !== TEAM_HASH) {
        gateFails++;
        if (gateFails >= 5) {
            gateFails = 0;
            gateBlockUntil = Date.now() + 30000;
            gateMsg('چند بار اشتباه زدی. ۳۰ ثانیه صبر کن.');
        }
        else
            gateMsg('کد بازی یا کد ورود تیم اشتباه است.');
        return;
    }
    save('ep_session', p.id);
    gateOpen();
    renderWho();
}
function gateToggleAdmin() { $('gateAdminBox').classList.toggle('hidden'); }
function gateAdminLogin() {
    if ($('gateAdminPass').value !== ADMIN_PASS) {
        gateMsg('رمز مدیر اشتباه است.');
        return;
    }
    save('ep_session', '__admin__');
    gateOpen();
    grantAdmin();
    renderWho();
}
function gateLogout() { save('ep_session', ''); location.reload(); }
function renderWho() {
    var sess = load('ep_session', ''), p = byId(sess), box = $('whoBox');
    if (!box)
        return;
    var name = p ? esc(p.gameName) : (sess === '__admin__' ? 'مدیر' : '');
    box.innerHTML = name ? '👋 خوش آمدی <b class="text-white">' + name + '</b> · <button onclick="gateLogout()" class="underline text-teal-300">خروج</button>' : '';
}
function gateCheck() {
    var sess = load('ep_session', '');
    var p = byId(sess);
    if ((p && normCode(p.code) && normCode(p.code) !== '-') || sess === '__admin__')
        gateOpen();
    if (AUTH_URL)
        $('gateAdminLink').style.display = 'none';
}

gateCheck();
renderWho();
initAuthUI();
renderAll();
showSec(['search', 'stats', 'tour', 'top', 'teams', 'analysis', 'archive', 'edu'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'search');
