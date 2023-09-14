//Default

//\\loadLib('https://apis.google.com/js/platform.js');
//\\loadLib('https://www.google.com/jsapi');

//Custom

//\\data__blog_blogId = &#39;<data:blog.blogId/>&#39;;
//\\data__top_languageCode = &#39;<data:top.languageCode/>&#39;;
//\\data__top_blogspotReviews = &#39;<data:top.blogspotReviews/>&#39;;

//\\data__post_id = &#39;<data:post.id/>&#39;;
//\\data__post_url = &#39;<data:post.url/>&#39;;
//\\data__post_numComments = &#39;<data:post.numComments/>&#39;;
//\\data__post_appRpcRelayPath = &#39;<data:post.appRpcRelayPath/>&#39;;

function getRecentCommentsButton(hide, sdiv, ocfShow, ocfHide) {
  return pickButton(hide, sdiv, ocfShow, ocfHide);
}

function getRecentComments01(host, sdiv) {
  host = host || window.location.hostname;
  sdiv = sdiv || "divRecentCommentsLong";
  getRecentCommentsButton(true);
  getRecentComments(host, numRecentComments, maxCommentChars, "[user]'s [title] ([date])", useAvatar, false, sdiv);
  timer_is_on = 1;
  setcookie(cookieName, 1, cookieDays);
  timedCount(false);
}

function getRecentComments02(sdiv){
  getRecentCommentsFull(null, 50, 4096, "[user] [title] ([date])", true, false, sdiv);
  timer_is_on = 1;
  setCookie(cookieName, 1, cookieDays);
  timedCount(false);
}

function clearRecentComments01(sdiv) {
  sdiv = sdiv || "divRecentCommentsLong";
  getRecentCommentsButton(false);
  document.getElementById(sdiv).innerHTML = "";
  timer_is_on = 0;
  setcookie(cookieName, 0, cookieDays);
}

function commentPaging(div='commentpaging') {
  //{xuteng}
  if (numEntryComment) { db(div, strPagination.replace(/\&nbsp;/gi, '')); }
  else { commentPaginate(div, data__post_url, data__post_numComments*1, 1, false, SPACE); }
}

function commentPaginate(div, url, comment, printPaginating, pageNo, space) {
  //{xuteng}
  strEntryURL = url;
  numEntryComment = comment;
  var posturl = url;
  var comment = comment;
  cmpage = Math.ceil(comment/numCommentPerPage);
  if (cmpage<=1) {
    strPagination = '1';
    numCommentPage = 1;
  } else {
    strPagination = '';
    if (!pageNo) {
      var pagePath = document.location.href.match(/commentPage=\d+/gi);
      if (pagePath) pageNo = pagePath[0].substring(pagePath[0].indexOf('=')+1);
      else pageNo = 1;
    }
    for (var i=1; i<=cmpage; i++) {
      if (i==pageNo) { strPagination += '<a name="CurrentCommentPage"><font color="red">'+pageNo+'</font></a>'; }
      else { strPagination += '<a href="'+posturl+'?commentPage='+i+'#comments">'+i+'</a>'; }
      if (space) { strPagination += space; }
    }
    numCommentPage = pageNo;
  }
  if (printPaginating) db(div, strPagination);
  else return(strPagination);
}

function updateOneComment() {
  updateOneBloggerComment(data__comment_cmtBodyIdPostfix, 'is-');
}

function writeScript(script) {
  document.write(`<script type="text/javascript" src="${script}"></script>`);
}

function writeFeedScript() {
  writeScript(`https://${window.location.hostname}/feeds/${strPostID}/comments/default?max-results=1&alt=json-in-script&callback=getPostPaginating`);
}

//Default

function setAttributeOnload(object, attribute, val) {
  if (window.addEventListener) {
    window.addEventListener('load', function(){ object[attribute] = val; }, false);
  } else {
    window.attachEvent('onload', function(){ object[attribute] = val; });
  }
}

function initialize() {
  google.annotations.setApplicationId(data__top_blogspotReviews);
  google.annotations.createAll();
  google.annotations.fetch();
}

function loadGapi() {
  gapi.load("gapi.iframes:gapi.iframes.style.bubble", function() {
    if (gapi.iframes && gapi.iframes.getContext) {
      gapi.iframes.getContext().openChild({
        url: 'https://www.blogger.com/navbar.g?targetBlogID\x3d2275817107352430673\x26blogName\x3dRUSSIAN+WARSHIP+GO+FUCK+YOURSELF:+%D0%A0%D0%A3%D0%A1...\x26publishMode\x3dPUBLISH_MODE_BLOGSPOT\x26navbarType\x3dDISABLED\x26layoutType\x3dLAYOUTS\x26searchRoot\x3dhttps://an-hoang-trung-tuong-2014.blogspot.com/search\x26blogLocale\x3den\x26v\x3d2\x26homepageUrl\x3dhttp://an-hoang-trung-tuong-2014.blogspot.com/\x26vt\x3d-8380617218860959290',
        where: document.getElementById("navbar-iframe-container"),
        id: "navbar-iframe"
      });
    }
  });
}

function loadGad() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/google_top_exp.js';
  var head = document.getElementsByTagName('head')[0];
  if (head) { head.appendChild(script); }
}

//Custom

function initGlobalStatus() {
  DEF_HIDE_STAMPS = false;
  DEF_HIDE_COUNTS = false;
  strMainMenu = '';
  strBlogID = data__blog_blogId;
  strPostID = data__post_id;
  strPostURL = data__post_url;
}

function initTimerStatus() {
  timerInterval = 60000;
  cookieName = 'QuanBuaAutoCommentAlert';
  cookieCount = 'QuanBuaCommentCount';
  cookieDays = 365;
  timer = null;
  timer_is_on = getcookie(cookieName);
  totalComments = getcookie(cookieCount)||0;
}
