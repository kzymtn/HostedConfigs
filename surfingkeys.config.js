// ------------------------------------------------------------
// Properties list
// hit-a-hint
// hjklはヒントキー表示中の移動になったので使用できない 他に割り当ててキーを押すとhit-a-hintキャンセルに
api.Hints.setCharacters("asdfwerxcvuionm");
settings.hintAlign = "left";
// tab: Always select Tabs ('T') by omni bar
settings.tabsThreshold = 0;
// yank
settings.modeAfterYank = "Normal";
// scroll
settings.scrollStepSize = 100;
// prev/next link
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i;
settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
//VimVixen compatible new Tab in background
api.map("F", "gf");

// app/site specific settings
// Gmail
api.unmap("j", /mail.google.com/); // next mail
api.unmap("k", /mail.google.com/); // prev mail
api.unmap("s", /mail.google.com/); // add star
api.unmap("g", /mail.google.com/); // go
api.unmap("i", /mail.google.com/); // inbox
api.unmap("e", /mail.google.com/); // archive
api.unmap("a", /mail.google.com/); // select all
api.unmap("*", /mail.google.com/); // select all (* + a)

// FreshRSS 用の設定 (http://bflat/frss/)
const frssUrl = /bflat\/frss/;

// 1. ナビゲーション関連
// FreshRSS の「次の記事」「前の記事」を有効にするため、Surfingkeys のスクロールを解除
api.unmap('j', frssUrl);
api.unmap('k', frssUrl);
api.unmap('n', frssUrl);
api.unmap('p', frssUrl);

// 2. 記事操作・トグル関連
// m: 既読, f: お気に入り, v: 元記事を開く, A: 全て既読
api.unmap('m', frssUrl); 
api.unmap('f', frssUrl); // ※Surfingkeys の Hints (リンククリック) 機能と衝突するため解除
api.unmap('v', frssUrl); // ※Surfingkeys の Visual Mode と衝突するため解除
api.unmap('A', frssUrl);

// 3. 更新・画面遷移関連
// r: フィード更新, g: 各種移動 (gn, gp, ga, gs 等のプレフィックス)
api.unmap('r', frssUrl);
api.unmap('g', frssUrl);

// 4. 表示モード切り替え (任意)
// 1, 2, 3 などの数字キーで表示形式を切り替える場合
api.unmap('1', frssUrl);
api.unmap('2', frssUrl);
api.unmap('3', frssUrl);

/**
 * お気に入り記事を一定数開き、お気に入り解除する関数
 * @param {number} count - 開く記事の数
 */
api.unmap('o', frssUrl);
api.unmap('O', frssUrl);
'function openAndUnstar(count) {
    // お気に入り（Star付き）の記事コンテナを取得
    // FreshRSS のテーマやバージョンによりクラス名が異なる場合があるため、複数のセレクタに対応
    const favorites = Array.from(document.querySelectorAll('.flux.favorite, .flux.fav, .flux_header.favorite'))
                           .slice(0, count);

    if (favorites.length === 0) {
        Front.showBanner("お気に入り記事はありません。");
        return;
    }

    favorites.forEach(article => {
        const link = article.querySelector('.title a');
        const starBtn = article.querySelector('.star');

        if (link && starBtn) {
            // 1. お気に入り解除（Starボタンをクリック）
            starBtn.click();
            
            // 2. 新規タブ（バックグラウンド）で記事を開く
            // window.open よりも Surfingkeys の RUNTIME を使う方がポップアップブロックを回避しやすい
            RUNTIME("openLink", {
                url: link.href,
                tab: {
                    tabbed: true,
                    active: false // バックグラウンドで開く
                }
            });
        }
    });
    
    Front.showBanner(`${favorites.length}件の記事を開き、お気に入りを解除しました。`);
}

// 5件開く (o)
api.mapkey('o', '#11Open 5 favorites and unstar', function() {
    openAndUnstar(5);
}, {domain: frssUrl});

// 10件開く (O)
api.mapkey('O', '#11Open 10 favorites and unstar', function() {
    openAndUnstar(10);
}, {domain: frssUrl});

// Reference: https://github.com/brookhong/Surfingkeys/issues/63
settings.blocklistPattern = /https:\/\/(colab\.research\.google\.com|prism\.openai\.com|docs\.google\.com)\/.*/i;
// Netflix
api.unmap("f", /netflix.com/); // fullscreen

// order
settings.historyMUOrder = false;
settings.tabsMRUOrder = false;

// input box
// trueだとTwitterで入力ボックスに切り替えてもリンクキーが表示されたまま 切り替えたリンクキーが最後に入力される
settings.cursorAtEndOfInput = false;

// ------------------------------------------------------------
// Help
// PassThrough mode 1.5秒間だけsurfingkeys無効
api.mapkey(
  "p",
  "#0enter ephemeral PassThrough mode to temporarily suppress SurfingKeys",
  function () {
    api.Normal.passThrough(1500);
  },
);

// ------------------------------------------------------------
// Mouse Click
api.map("Q", ";di");
api.map("[", "[[");
api.map("]", "]]");

// ------------------------------------------------------------
// Scroll Page / Element
api.map("<Ctrl-k>", "e");
api.map("<Ctrl-j>", "d");

// ------------------------------------------------------------
// Tabs
api.map("ga", "g0"); // go to the first tab
api.map("ge", "g$"); // go to the last tab
api.map("xtu", "gx0"); // remove tabls like C-a in shell
api.map("xtk", "gx$"); // remove tabke like C-K in shell
api.map("xth", "gxt"); // close a tab on left
api.map("xtl", "gxT"); // close a tab on right
api.map("tp", "<Alt-p>"); // pin/unpin the current tab
api.map("t", "T"); // choose tab
api.map("<Ctrl-h>", "E"); // got
api.map("<ctrl-l>", "R");
api.map("<", "<<");
api.map(">", ">>");

// ------------------------------------------------------------
// Page Navigation
api.map("u", "gu");
api.map("g/", "gU");
api.map("H", "S");
api.map("L", "D");

// ------------------------------------------------------------
// Search selected with
// 無効にしても同じキーをaddSearchAliasに設定すると、無効にしたサイトのファビコンがなぜか表示される
api.removeSearchAlias("b");
api.removeSearchAlias("d");
api.removeSearchAlias("e");
api.removeSearchAlias("w");
api.removeSearchAlias("s");

// ------------------------------------------------------------
// Clipboard
api.map("yn", "yl");

// ------------------------------------------------------------
// Omnibar
// api.map('gO', 'go');
// api.map('b', 'oh');
// api.unmap('ob');
// api.map('oM', 'om');
// api.unmap('om');

// ------------------------------------------------------------
// Visual Mode
api.vmap("A", "0");
api.vmap("E", "$");
api.vunmap("gr");
api.vunmap("q");

// ------------------------------------------------------------
// vim-like marks
api.map("M", "m");
api.unmap("m");

// ------------------------------------------------------------
// Chrome URLs
api.unmap("gc");
api.unmap("gk");

// ------------------------------------------------------------
// Proxy
api.unmap("cp");
api.unmap(";pa");
api.unmap(";pb");
api.unmap(";pd");
api.unmap(";ps");
api.unmap(";pc");
api.unmap(";cp");
api.unmap(";ap");

// ------------------------------------------------------------
// Misc
// Markdown形式でサイトリンクコピー
api.mapkey("ymd", "Copy current page's link in markdown format", function () {
  const url = new URL(window.location.href);
  var title = window.document.title.replace(/(<|>)/g, "\\$1");
  api.Clipboard.write(`[${title}](${url.href})`);
});

// Scrapbox形式でサイトリンクコピー
api.mapkey("scy", "Copy current page's link in scrapbox format", function () {
  const url = new URL(window.location.href);
  var title = window.document.title.replace(/(<|>)/g, "\\$1");
  api.Clipboard.write(`[${title} ${url.href}]`);
});

// hatenabookamark
api.mapkey(";hb", "Hatena bookmark", function () {
  var d = new Date();
  var s = document.createElement("script");
  window.location.href = "https://b.hatena.ne.jp/entry/" + window.location.href;
});

// right click
api.mapkey(";rc", "enable right click", function () {
  var d = document;
  var s = [
    "user-select",
    "-webkit-user-select",
    "-moz-user-select",
    "-ms-user-select",
  ];
  var a = ["mousedown", "selectstart", "copy", "contextmenu"];
  var p = function (e) {
    e.stopPropagation();
  };
  [
    "mousedown",
    "contextmenu",
    "selectstart",
    "copy",
    "keydown",
    "keypress",
    "keyup",
  ].forEach(function (n) {
    d.addEventListener(n, p, true);
  });
  d.body.addEventListener("contextmenu", p);
  Array.prototype.forEach.call(document.querySelectorAll("*"), function (l) {
    s.forEach(function (t) {
      l.style.setProperty(t, "auto", "important");
    });
    a.forEach(function (n) {
      l.addEventListener(n, p, true);
    });
  });
});

api.unmap("gr");
api.mapkey("gD", "Open Chrome dns cache", function () {
  api.tabOpenLink("chrome://net-internals/#dns");
});
api.mapkey("gE", "Open Chrome Extensions", function () {
  api.tabOpenLink("chrome://extensions/");
});
api.mapkey("gH", "Open Chrome Help", function () {
  api.tabOpenLink("chrome://settings/help");
});
api.mapkey("gK", "Open Chrome Extensons shortcuts", function () {
  api.tabOpenLink("chrome://extensions/shortcuts");
});
api.mapkey("gS", "Open Chrome Settings", function () {
  api.tabOpenLink("chrome://settings/");
});
// 新しいウィンドウで開く
api.mapkey("gwt", "Open New Window TweetDeck", function () {
  window.open("https://tweetdeck.twitter.com/", "", "width=1484, height=900");
});
api.mapkey("T", "Open URL", function () {
  api.Front.openOmnibar({ type: "URLs", extra: "getAllSites" });
});

// ------------------------------------------------------------
// Mouse Click
// 後で設定しないとうまくいかない
api.map("mf", "cf");

// vim-like marks
// qmarks URL設定
// 参考: https://gist.github.com/zeltak/1a7fa67eb2a4fc7e4e6e63cd3b39886c
var overlayedGlobalMarks = {
  0: "https://www.aguse.jp/",
  1: "https://calendar.gameiroiro.com/animecd.php",
  2: "https://ascii2d.net/",
  4: "https://cards-dev.twitter.com/validator",
  5: "https://rakko.tools/tools/2/",
  6: "https://misttraingirls.wikiru.jp/",
  7: "https://wiki3.jp/nikke",
  a: "https://annict.com/sign_in",
  A: "https://www.google.com/analytics/web/?hl=ja",
  B: "https://www.dmm.com/rental/ppr/-/basket/",
  c: "https://cloudinary.com/users/login",
  d: "https://www.diigo.com/sign-in",
  D: "https://mission.games.dmm.com/",
  e: "https://ecnavi.jp/login/",
  E: "https://www.evernote.com/Login.action",
  f: "https://fewlight.net/",
  g: "https://accounts.google.com/?hl=ja-JP",
  G: "https://github.com/login",
  i: "https://jp.inoreader.com/login",
  I: "https://gist.github.com/auth/github?return_to=https%3A%2F%2Fgist.github.com",
  j: "https://translate.google.com/?hl=ja&sl=auto&tl=ja&op=translate",
  k: "https://kanji.sljfaq.org/drawj.html",
  l: "http://localhost:4000/",
  L: "http://www.dmm.com/rental/-/wishlist/",
  m: "https://monitor.macromill.com/airs/exec/monitorLoginAction.do",
  M: "https://ssl.pc.moppy.jp/login/",
  n: "https://app.netlify.com/",
  N: "https://notes.toodledo.com/",
  O: "https://outlines.toodledo.com/#/dashboard",
  p: "https://www.pixiv.net/login.php?ref=wwwtop_accounts_index",
  P: "https://photos.google.com/login",
  q: "https://creazy.net/amazon_quick_affiliate#AmaQuick",
  r: "https://research-panel.jp/login/",
  s: "https://speedtest.gate02.ne.jp/",
  S: "https://accounts.google.com/ServiceLogin?service=sitemaps&hl=ja&continue=https://search.google.com/search-console?hl",
  t: "https://twitter.com/home",
  T: "https://twisave.com/",
  v: "https://www.virustotal.com/gui/home/url",
  w: "https://fewlight.net/wish-list/",
};

// qmarksで設定したURLを新しいタブで開く
api.mapkey("gn", "Jump to vim-like mark in new tab", function (mark) {
  var priorityURLs = overlayedGlobalMarks[mark];
  if (priorityURLs === undefined) {
    // fallback to Surfingkeys default jump
    Normal.jumpVIMark(mark, true);
    return;
  }
  if (typeof priorityURLs == typeof "") {
    priorityURLs = [priorityURLs];
  }
  for (var url of priorityURLs) {
    var markInfo = {
      url: url,
      scrollLeft: 0,
      scrollTop: 0,
    };
    markInfo.tab = {
      tabbed: true,
      active: true,
    };
    api.RUNTIME("openLink", markInfo);
  }
});

// qmarksで設定したURLを現在のタブで開く
api.mapkey("go", "Jump to vim-like mark in current tab", function (mark) {
  var priorityURLs = overlayedGlobalMarks[mark];
  if (priorityURLs === undefined) {
    // fallback to Surfingkeys default jump
    Normal.jumpVIMark(mark, true);
    return;
  }
  if (typeof priorityURLs == typeof "") {
    priorityURLs = [priorityURLs];
  }
  for (var url of priorityURLs) {
    var markInfo = {
      url: url,
      scrollLeft: 0,
      scrollTop: 0,
    };
    markInfo.tab = {
      tabbed: false,
      active: false,
    };
    api.RUNTIME("openLink", markInfo);
  }
});

// ------------------------------------------------------------
// 検索エンジン
// Google 1年以内
api.addSearchAlias(
  "1",
  "Google 1年以内",
  "https://www.google.com/search?q={0}&lr=lang_ja&hl=ja&tbs=lr:lang_1ja,qdr:y",
);
api.mapkey("o1", "Search with alias Google 1年以内", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "1" });
});
// 2ch(5ch)横断検索 - re.Find2ch
api.addSearchAlias(
  "2",
  "2ch(5ch)横断検索 - re.Find2ch",
  "https://refind2ch.org/search?q=",
);
api.mapkey("o2", "Search with alias 2ch(5ch)横断検索", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "2" });
});
// Google 3ヶ月以内
api.addSearchAlias(
  "3",
  "Google 3ヶ月以内",
  "https://www.google.com/search?q={0}&lr=lang_ja&hl=ja&tbs=lr:lang_1ja,qdr:m3",
);
api.mapkey("o3", "Search with alias Google 3ヶ月以内", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "3" });
});
// Google 6ヶ月以内
api.addSearchAlias(
  "6",
  "Google 6ヶ月以内",
  "https://www.google.com/search?q={0}&lr=lang_ja&hl=ja&tbs=lr:lang_1ja,qdr:m6",
);
api.mapkey("o6", "Search with alias Google 6ヶ月以内", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "6" });
});
// Amazon jp
api.addSearchAlias("a", "amazon", "https://www.amazon.co.jp/s?k=");
api.mapkey("oa", "Search with alias amazon", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "a" });
});
// DMM 単品CDレンタル
api.addSearchAlias(
  "C",
  "DMM 単品CDレンタル",
  "https://www.dmm.com/rental/ppr/-/search/=/searchstr={0}/floor=cd/limit=120/",
);
api.mapkey("oC", "Search with alias DMM 単品CDレンタル", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "C" });
});
// Can I use
api.addSearchAlias("ci", "Can I use", "https://caniuse.com/?search=");
api.mapkey("oci", "Search with alias Can I use", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "ci" });
});
// Chocolatey
api.addSearchAlias("cl", "Chocolatey", "https://chocolatey.org/packages?q=");
api.mapkey("ocl", "Search with alias Chocolatey", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "cl" });
});
// Chrome ウェブストア
api.addSearchAlias(
  "cw",
  "chrome ウェブストア",
  "https://chrome.google.com/webstore/search?q=",
);
api.mapkey("ocw", "Search with alias chrome ウェブストア", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "cw" });
});
// DMM 単品DVDレンタル
api.addSearchAlias(
  "D",
  "DMM 単品DVDレンタル",
  "https://www.dmm.com/rental/ppr/-/search/=/searchstr={0}/floor=dvd/limit=120/",
);
api.mapkey("oD", "Search with alias DMM 単品DVDレンタル", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "D" });
});
// Google翻訳 auto-en
api.addSearchAlias(
  "e",
  "Google翻訳 auto-en",
  "https://translate.google.com/?hl=ja&tab=TT&sl=auto&tl=en&text=",
);
api.mapkey("oe", "Search with alias Google翻訳 auto-en", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "e" });
});
// Google 日本除外で1年以内 検索語によっては除外が難しい
api.addSearchAlias(
  "E",
  "Google 日本除外 1年以内",
  "https://www.google.com/search?q={0}&gl=us&hl=en&pws=0&tbs=qdr:y-lang_ja",
);
api.mapkey("oE", "Search with alias Google 日本除外 1年以内", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "E" });
});
// GitHub
api.addSearchAlias("G", "GitHub", "https://github.com/search?q=");
api.mapkey("oG", "Search with alias GitHub", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "G" });
});
// Gist my
api.addSearchAlias(
  "i",
  "Gist my",
  "https://gist.github.com/search?q=user%3Amasato3+{0}&ref=searchresults",
);
api.mapkey("oi", "Search with alias Gist my", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "i" });
});
// Gist
api.addSearchAlias(
  "I",
  "Gist",
  "https://gist.github.com/search?utf8=%E2%9C%93&q=",
);
api.mapkey("oI", "Search with alias Gist", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "I" });
});
// Google翻訳 auto-jp
api.addSearchAlias(
  "j",
  "Google翻訳 auto-jp",
  "https://translate.google.com/?hl=ja&sl=auto&tl=ja&text=",
);
api.mapkey("oj", "Search with alias Google翻訳 auto-jp", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "j" });
});
// JVN iPedia - 脆弱性対策情報データベース
api.addSearchAlias(
  "J",
  "JVN iPedia",
  "https://jvndb.jvn.jp/search/index.php?mode=_vulnerability_search_IA_VulnSearch&lang=ja&useSynonym=1&keyword=",
);
api.mapkey("oJ", "Search with alias JVN iPedia", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "J" });
});
// 価格.com 日本語文字化け
api.addSearchAlias("k", "価格.com", "http://kakaku.com/search_results/");
api.mapkey("ok", "Search with alias 価格.com", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "k" });
});
// まとも検索
// 参考: https://fukuyuki.github.io/mtm.html
api.addSearchAlias(
  "ms",
  "まとも検索",
  "https://www.google.com/search?q=site%3Aac.jp+OR+site%3Ago.jp+OR+site%3Alg.jp+",
);
api.mapkey("oms", "Search with alias まとも検索", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "ms" });
});
// MDN Web Docs
api.addSearchAlias(
  "mw",
  "MDN Web Docs",
  "https://developer.mozilla.org/ja/search?q=",
);
api.mapkey("omw", "Search with alias MDN Web Docs", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "mw" });
});
// goo辞書 all
api.addSearchAlias(
  "o",
  "goo辞書 all",
  "https://dictionary.goo.ne.jp/srch/all/{0}/m0u/",
);
api.mapkey("oo", "Search with alias goo辞書 all", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "o" });
});
// portableapps
api.addSearchAlias(
  "pa",
  "portableapps",
  "https://portableapps.com/search/node/",
);
api.mapkey("opa", "Search with alias portableapps", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "pa" });
});
// ピクシブ百科事典
api.addSearchAlias(
  "pd",
  "ピクシブ百科事典",
  "https://dic.pixiv.net/search?query=",
);
api.mapkey("opd", "Search with alias ピクシブ百科事典", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "pd" });
});
// Google Play store アプリ
api.addSearchAlias(
  "ps",
  "Google Play store アプリ",
  "https://play.google.com/store/search?q={0}&c=apps",
);
api.mapkey("ops", "Search with alias Google Play store アプリ", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "ps" });
});
// Qiita 新着順
api.addSearchAlias(
  "q",
  "Qiita 新着",
  "https://qiita.com/search?q={0}&sort=created",
);
api.mapkey("oq", "Search with alias Qiita 新着", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "q" });
});
// Yahoo!リアルタイム検索
api.addSearchAlias(
  "r",
  "Yahoo!リアルタイム検索",
  "https://search.yahoo.co.jp/realtime/search?p={0}&ei=UTF-8&ifr=tp_sc",
);
api.mapkey("or", "Search with alias Yahoo!リアルタイム検索", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "r" });
});
// Yahoo!リアルタイム検索 画像/動画
api.addSearchAlias(
  "R",
  "Yahoo!リアルタイム検索 画像/動画",
  "https://search.yahoo.co.jp/realtime/search?p={0}&ei=UTF-8&mtype=image",
);
api.mapkey(
  "oR",
  "Search with alias Yahoo!リアルタイム検索 画像/動画",
  function () {
    api.Front.openOmnibar({ type: "SearchEngine", extra: "R" });
  },
);
// Twitter
api.addSearchAlias("tt", "twitter", "https://twitter.com/search?q=");
api.mapkey("ott", "Search with alias twitter", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "tt" });
});
// Twitter user 最新
api.addSearchAlias(
  "tu",
  "twitter user 最新",
  "https://twitter.com/search?q=from:{0}&f=live",
);
api.mapkey("otu", "Search with alias twitter user 最新", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "tu" });
});
// Twitter my 最新
api.addSearchAlias(
  "tm",
  "twitter my 最新",
  "https://twitter.com/search?q=from:masatonyoron%20{0}&f=live",
);
api.mapkey("otm", "Search with alias twitter my 最新", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "tm" });
});
// Wikipedia jp
api.addSearchAlias("w", "wikipedia", "https://ja.wikipedia.org/wiki/");
api.mapkey("ow", "Search with alias wikipedia", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "w" });
});
// zenn
api.addSearchAlias("z", "zenn", "https://zenn.dev/search?q=");
api.mapkey("oz", "Search with alias zenn", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "z" });
});
// 1Screen
api.addSearchAlias("!", "1Screen", "https://1screen.tv/jp/search?q=");
api.mapkey("o!", "Search with alias 1Screen", function () {
  api.Front.openOmnibar({ type: "SearchEngine", extra: "!" });
});

// ------------------------------------------------------------
// Insert Mode
// 絵文字off
api.iunmap(":");

// ------------------------------------------------------------
// 特定のサイトでSurfingkeysの一部キー優先
// inoreader
api.unmapAllExcept(
  [
    "p",
    "i",
    "I",
    "q",
    "F",
    "<Ctrl-k>",
    "<Ctrl-j>",
    "T",
    "X",
    "h",
    "l",
    "<",
    ">",
    "w",
    "L",
    "H",
    "t",
    "b",
    "'",
  ],
  /jp.inoreader.com/,
);
// pixiv cockpit for pixiv使用中
api.unmapAllExcept(
  [
    "p",
    "gi",
    "I",
    "f",
    "q",
    "F",
    "[",
    "]",
    "gg",
    "G",
    "<Ctrl-k>",
    "<Ctrl-j>",
    "yt",
    "gxa",
    "gxe",
    "ga",
    "ge",
    "gp",
    "T",
    "on",
    "x",
    "X",
    "W",
    "h",
    "l",
    "<",
    ">",
    "r",
    "L",
    "H",
    "sG",
    "se",
    "sj",
    "spd",
    "sw",
    "yy",
    "yn",
    "t",
    "o1",
    "o2",
    "o3",
    "o6",
    "ox",
    "oh",
    "og",
    "oy",
    "oM",
    "oa",
    "oA",
    "oC",
    "oci",
    "ocl",
    "ocw",
    "od",
    "oD",
    "oe",
    "oE",
    "of",
    "oF",
    "oG",
    "oi",
    "oI",
    "oj",
    "ok",
    "omb",
    "oms",
    "omw",
    "oo",
    "opa",
    "opd",
    "ops",
    "oq",
    "or",
    "ota",
    "ott",
    "otu",
    "otm",
    "ow",
    "oz",
    "o!",
    "v",
    "b",
    "gn",
    "go",
    "'",
    ";e",
    "gE",
    "gH",
    "gK",
    "gS",
    "gD",
  ],
  /www.pixiv.net/,
);
// toggl
api.unmapAllExcept(
  [
    "p",
    "i",
    "I",
    "f",
    "q",
    "F",
    "gg",
    "G",
    "j",
    "k",
    "<Ctrl-k>",
    "<Ctrl-j>",
    "yt",
    "ga",
    "ge",
    "gp",
    "T",
    "on",
    "X",
    "W",
    "h",
    "l",
    "<",
    ">",
    "L",
    "H",
    "yy",
    "t",
    "b",
    "gn",
    "go",
    "'",
    "ymd",
  ],
  /toggl.com/,
);
// Toodledo Tasks クリック後でないと一部のキー動かない
api.unmapAllExcept(
  [
    "p",
    "f",
    "I",
    "F",
    "mf",
    "gg",
    "G",
    "j",
    "k",
    "<Ctrl-k>",
    "<Ctrl-j>",
    "yt",
    "gxe",
    "ga",
    "ge",
    "gp",
    "T",
    "on",
    "X",
    "W",
    "h",
    "l",
    "<",
    ">",
    "L",
    "H",
    "sG",
    "yy",
    "t",
    "o1",
    "o2",
    "o3",
    "o6",
    "ox",
    "oh",
    "og",
    "oy",
    "oM",
    "oa",
    "oa",
    "oC",
    "oci",
    "ocl",
    "ocw",
    "od",
    "oD",
    "oe",
    "oE",
    "of",
    "oF",
    "oG",
    "oi",
    "oI",
    "oj",
    "oJ",
    "ok",
    "omb",
    "oms",
    "omw",
    "oo",
    "opa",
    "opd",
    "ops",
    "oq",
    "or",
    "ota",
    "ott",
    "otu",
    "otm",
    "ots",
    "ow",
    "oz",
    "o!",
    "b",
    "gn",
    "go",
    "'",
    ";e",
    "gE",
    "gH",
    "gK",
    "gS",
    "gD",
    "gwt",
  ],
  /www.toodledo.com/,
);
// Toodledo Notes/Outlines
api.unmapAllExcept(
  [
    "p",
    "gi",
    "I",
    "f",
    "F",
    "mf",
    "gg",
    "G",
    "<Ctrl-k>",
    "<Ctrl-j>",
    "yt",
    "gxe",
    "ga",
    "ge",
    "gp",
    "T",
    "on",
    "X",
    "W",
    "h",
    "l",
    "<",
    ">",
    "L",
    "H",
    "sG",
    "yy",
    "yn",
    "t",
    "b",
    "gn",
    "go",
    "'",
    "ymd",
  ],
  /notes.toodledo.com|outlines.toodledo.com/,
);

// ------------------------------------------------------------
// style
// theme
settings.theme = `
  .sk_theme {
    font-family: sans-serif;
    font-size: 16px;
}`;

// Link Hints
api.Hints.style(`
  font-family: monospace;
  font-size: 16px;
  font-weight: normal;
  text-transform: lowercase;
`);

// Text Hints
api.Hints.style(
  `
  font-family: monospace;
  font-size: 16px;
  text-transform: lowercase;
  `,
  "text",
);
