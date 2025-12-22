//////////////////////////////////////////////////
//
// Vars loaded from {blogger.pubvar.gd.js}
//
//////////////////////////////////////////////////
//
// Cookie-functions:
//
function setcookie(c_name,value,exdays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}
function getcookie(c_name){
  var i, x, y, ARRcookies = document.cookie.split(";");
  for(i=0; i<ARRcookies.length; i++){
    x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x = x.replace(/^\s+|\s+$/g,"");
    if(x==c_name){
      return(unescape(y));
    }
  }
}
//
//////////////////////////////////////////////////
//
// Format-functions:
//
function sortObject(Objs, rev, back){
  var sortable = [];
  for(var key in Objs){sortable.push([key,Objs[key]]);}
  sortable.sort(function(a,b){return(a[1]-b[1]);});
  if(rev){sortable.reverse();}
  if(back){
    var cbObjs = {};
    for(var key in sortable){cbObjs[sortable[key][0]]=sortable[key][1];}
    return(cbObjs);
  }
  return(sortable);
}
String.prototype.trim = function(){
  return(this.replace(/^\s+|\s+$/g,""));
}
String.prototype.include = function(pat){
  return(this.toLowerCase().split(',').includes(pat.toLowerCase()));
}
String.prototype.in = function(pat){
  return(pat.toLowerCase().split(',').includes(this.toLowerCase()));
}
Date.prototype.addDays = function(days){
  return(this.setDate(this.getDate()+days));
}
Date.prototype.toJDStr = function(){
  return(this.toJSON().split('T')[0]);
}
String.prototype.acceptImg = function(){//25
  return(this.match(regimg())!=null);
}
String.prototype.stripTags = function(allowed=sDefAllowedTagList+sMoreAllowedTagList){//25
  var input = this;
  allowed = (((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join('');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return(input.replace(commentsAndPhpTags,'').replace(tags,function($0,$1){
    return(allowed.indexOf('<'+$1.toLowerCase()+'>')>-1 ? $0 : '');
  }));
}
String.prototype.gmatch = function(bpat, epat, stid){
  var res = [];
  breaks = this.split(bpat);
  for(var i=0; i<breaks.length; i++){
    if(breaks[i].match(RegExp(stid, 'i'))
    && breaks[i].match(epat))
    res.push(bpat+breaks[i].split(epat)[0]+epat);
  }
  return(res);
}
String.prototype.replaceText = function(replaceWhat, replaceTo, exp='gi'){//25
  replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var reg = new RegExp(replaceWhat, exp);
  return(this.replace(reg, replaceTo));
}
String.prototype.clearText = function(clearWhat, exp='gi'){//25
  return(this.replaceText(clearWhat, '', exp));
}
String.prototype.youtube = function(vid_stid='youtube'){//25
  var res = this;
  if(vid_stid.in('img,image')){
    var vidlen = -1;
  }else if(vid_stid=='facebook'){
    var vidlen = -1;
    res = res.replaceText('[facebook]', '[facebook=');
    res = res.replaceText('[/facebook]', ']');
  }else if(vid_stid=='liveleak'){
    var vidlen = 6;
    res = res.replaceText('[liveleak]', '[liveleak=');
    res = res.replaceText('[/liveleak]', ']');
  }else if(vid_stid=='tiktok'){
    var vidlen = -1;
    res = res.replaceText('[tiktok]', '[tiktok=');
    res = res.replaceText('[/tiktok]', ']');
  }else{
    vid_stid = 'youtube';
    var vidlen = 11;
    res = res.replaceText('[youtube]', '[youtube=');
    res = res.replaceText('[/youtube]', ']');
  }
  var stid = vid_stid+'=';
  var bpat = '[';
  var epat = ']';
  var matches = res.gmatch(bpat, epat, stid);
  for(var i=0; i<matches.length; i++){
    var vid = matches[i].substring(matches[i].indexOf('=')+1).split(epat)[0].trim();
    if(vid_stid.in('img,image')){
      if(!vid.acceptImg()){
        res = res.replace(matches[i], '(Wrong image embeded)');
      }else{
        res = res.replace(matches[i], vid.embedImg());
      }
    }else if(vid_stid=='facebook'){
      vid = vid.split('v=').pop().split('&')[0].split('#')[0].split('<')[0].trim();
      if(isNaN(vid)){
        res = res.replace(matches[i], '(Wrong Facebook video embeded)');
      }else{
        res = res.replace(matches[i], vid.embedFacebook());
      }
    }else if(vid_stid=='liveleak'){
      vid = vid.split('?').pop().split('&')[0].split('=').pop().trim();
      if(vid.length!=vidlen){
        res = res.replace(matches[i], '(Wrong LiveLeak video embeded)');
      }else{
        res = res.replace(matches[i], vid.embedLiveleak());
      }
    }else if(vid_stid=='tiktok'){
      vid = vid.split('?')[0].split('/').pop().trim();
      if(isNaN(vid)){
        res = res.replace(matches[i], '(Wrong Tiktok video embeded)');
      }else{
        res = res.replace(matches[i], vid.embedTiktok());
      }
    }else{//YOUTUBE.COM
      vid = vid.split('v=').pop().split('&')[0].split('#')[0].split('<')[0].split('/').pop().split('?')[0].trim();
      if(vid.length!=vidlen){
        res = res.replace(matches[i], '(Wrong Youtube video embeded)');
      }else{
        res = res.replace(matches[i], vid.embedYoutube());
      }
    }
  }
  return(res);
}
String.prototype.embedImg = function(width=DEF_IMG_WIDTH){//25
  return(`<img ${DEF_STYLE} src="${this}"/>`);
}
String.prototype.embedFacebook = function(width=DEF_IMG_WIDTH, height=DEF_IMG_HEIGHT){//25
  return(`<iframe width="100%" height="auto" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FPlayStation%2Fvideos%2F${this}%2F&show_text=0" frameborder="0" allowfullscreen></iframe>`);
}
String.prototype.embedLiveleak = function(width=DEF_IMG_WIDTH, height=DEF_IMG_HEIGHT){//25
  return(`<iframe width="100%" height="auto" src="https://www.itemfix.com/e/${this}" frameborder="0" allowfullscreen></iframe>`);
}
String.prototype.embedYoutube = function(width=DEF_IMG_WIDTH, height=DEF_IMG_HEIGHT){//25
  return(`<iframe width="100%" height="auto" src="https://www.youtube.com/embed/${this}" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" frameborder="0" allowfullscreen></iframe>`);
}
String.prototype.embedTiktok = function(width=DEF_IMG_WIDTH, height=DEF_IMG_HEIGHT){//25
  return(`<iframe width="100%" height="auto" src="https://www.tiktok.com/embed/v2/${this}?lang=en-US" frameborder="0" allowfullscreen></iframe>`);
}
String.prototype.json2date = function(){
  var jts = this.split('T');
  var jymd = jts[0].split('-');
  var jhms = jts[1].split('+');
  var monthes = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return(monthes[jymd[1]-1]+' '+jymd[2]+' '+jhms[0].split('.')[0]+' UTC+'+jhms[1].replace(':','')+' '+jymd[0]);
}
function showListedDate(lDateTime){//25
  var lDate = lDateTime.split('T')[0];
  var lTime = lDateTime.split('T')[1].split('.')[0];
  var lZone = 'GMT+' + lDateTime.split('+')[1];
  return(`${lDate}&nbsp;${lTime}&nbsp;${lZone}`);
}
function showListedPostHref(lHref){
  var title = lHref.split('.html')[0];
  title = correctTitle(title,1); //VN
  return(title);
}
function correctTitle(title,langID){
  if(!langID){langID=1;}//[1:Viet;2:Eng]
  for(var i=0; i<exPageNames.length; i++){
    if(title==exPageNames[i][0] || title.match(RegExp('p/'+exPageNames[i][0],'i'))){
      return(exPageNames[i][langID]);
    }
  }
  title = title.split('/')[5];
  if(title){return(title.toUpperCase());}
  else return('Unknown page');
}
function convertCustomTags(text){//25:cmt2html
  text = text.youtube();
  text = text.youtube('facebook');
  text = text.youtube('liveleak');
  text = text.youtube('tiktok');
  text = text.youtube('image');
  text = text.youtube('img');
  text = insertSmiley(text);
  text = convertCustomFontTags(text);
  return(text);
}
function convertCustomFontTags(text){//25
  return(cleanTags(revertTags(text).stripTags()));
}
function clearCustomTags(text){//25
  return(text.clearcode());
}
String.prototype.cmt2html = function(){return(convertCustomTags(this))}//25
String.prototype.html2cmt = function(){//25
  return(escapeTags(this.nicetag().nicea().nicep().escapebreaks().stripTags()).trim());
}
String.prototype.tag2tag = function(tagName, aName1, allowedAttr){
  var hiddenElement = document.createElement("hiddenDivEx");
  hiddenElement.innerHTML = this;
  var tags = hiddenElement.getElementsByTagName(tagName);
  for(var i=0; i<tags.length; i++){
    if(tags[i].attributes.length<1){//Chrome
      continue;
    }
    for(var j=0; j<tags[i].attributes.length; j++){
      var aaName = tags[i].attributes[j].name.toLowerCase();
      if(((aName1)&&(aaName!=aName1))||((!aName1)&&(!allowedAttr.match(aaName)))){tags[i].removeAttribute(aaName);}
    }
  }
  return(hiddenElement.innerHTML);
}
function insertSmiley(htm){
  for(var smiley in iCommentSmileys){
    htm = htm.replaceText(smiley, iCommentSmileys[smiley]);
  }
  return(htm);
}
function updateDivContent(div_id, content){
  var div = document.getElementById(div_id);
  if(!content){div.innerHTML=convertCustomTags(div.innerHTML);}
  else{div.innerHTML=content;}
}
//
//////////////////////////////////////////////////
//
// Comment-format-customizing:
//
function getStyledComment(authorurl, author, published, content){
  return(openAuthorStyle(authorurl, author, published, true) + closeAuthorStyle(convertCustomTags(content.replace(/&quot;/gi,'"').replace(/&#39;/gi,"'")), true));
}
function getStyledTitle(ct, author, authorurl, authoravatar, hrefLink, published){
  return('<a title="' + author + '&nbsp;profile" href="' + authorurl + '"><img src="' + authoravatar + '" width="24" height="24" border="0"/></a>&nbsp;<b><a href="' + hrefLink + '" title="Posted&nbsp;at&nbsp;' + showListedDate(published) + '">' + author + '</a></b>&nbsp;<span style="font-size: x-small; color: #9FC5E8;"><i>(' + ct + ')</i></span>');
}
function getCounterPat(count){
  return('[CounterPat' + count + ']');
}
function openAuthorStyle(url, name, ctime, returnvalue){
  //\\ [ctime]:DateString
  isVipAuthor = false;
  isBLAuthor = false;
  isStyleItalic = false;
  isStyleBold = false;
  isStyleBGC = false;
  if(isBL(url,name,ctime)){
    isBLAuthor = true;
    if(returnvalue){return('');}
    else{return;}
  }
  var strSetStyle = '';
  var strTextStyle = '';
  for(var i=0; i<UserVIPs.length; i++){
    if(url.match(RegExp(UserVIPs[i][0], 'gi'))){
      isVipAuthor = true;
      var fSize = UserVIPs[i][2];
      var color = UserVIPs[i][3];
      var fFace = UserVIPs[i][4];
      var sItal = UserVIPs[i][5];
      var sBold = UserVIPs[i][6];
      var sBCol = UserVIPs[i][7];
      var avaID = UserVIPs[i][8]; //ShitAvatar
      strSetStyle = '<font zise="'+fSize+'" color="'+color+'" face="'+fFace+'">';
      if(returnvalue){strTextStyle+=strSetStyle;}
      else{document.write(strSetStyle);}
      if(sItal){
        isStyleItalic = true;
        strSetStyle = '<i>';
        if(returnvalue){strTextStyle+=strSetStyle;}
        else{document.write(strSetStyle);}
      }
      if(sBold){
        isStyleBold = true;
        strSetStyle = '<b>';
        if(returnvalue){strTextStyle+=strSetStyle;}
        else{document.write(strSetStyle);}
      }
      if(sBCol){
        isStyleBGC = true;
        strSetStyle = '<span style="background-color:'+sBCol+';">';
        if(returnvalue){strTextStyle+=strSetStyle;}
        else{document.write(strSetStyle);}
      }
      break;
    }
  }
  if(returnvalue){return(strTextStyle);}
}
function closeAuthorStyle(cbodyId, returnvalue){
  var strSetStyle = '';
  var strTextStyle = '';
  if(isBLAuthor){
    var strBL = 'Anh l&#224; &#244;ng b&#242; &#273;ang b&#7883; kh&#243;a m&#245;m &#273;cmnc';
    strSetStyle = rsBLAuthor ? rsBLAuthor : strBL;
    if(returnvalue){return(strSetStyle);}
    else{
      updateDivContent(cbodyId, strSetStyle);
      return;
    }
  }
  if(returnvalue){strTextStyle=cbodyId;}
  else{updateDivContent(cbodyId);}
  if(isStyleBGC){
    strSetStyle = '</span>';
    if(returnvalue){strTextStyle+=strSetStyle;}else{document.write(strSetStyle);}
  }
  if(isStyleBold){
    strSetStyle = '</b>';
    if(returnvalue){strTextStyle+=strSetStyle;}else{document.write(strSetStyle);}
  }
  if(isStyleItalic){
    strSetStyle = '</i>';
    if(returnvalue){strTextStyle+=strSetStyle;}else{document.write(strSetStyle);}
  }
  if(isVipAuthor){
    strSetStyle = '</font>';
    if(returnvalue){strTextStyle+=strSetStyle;}else{document.write(strSetStyle);}
  }
  if(returnvalue){return(strTextStyle);}
}
function isVIP(uid){
  for(var i=0; i<UserVIPs.length; i++){
    if(uid.match(RegExp(UserVIPs[i][0],'i'))){return(i);}
  }
  return(-1);
}
function isBL(url, name, ctime){
  for(var i=0; i<UserBLs.length; i++){
    if(url.match(RegExp(UserBLs[i][0], 'gi')) || name.match(RegExp(UserBLs[i][1], 'gi'))){
      rsBLAuthor = UserBLs[i][4] ? UserBLs[i][4] : false;
      if(UserBLs[i][2]){//UnlockDate
        var prs = UserBLs[i][2].split("/");
        var unlockDate = new Date(prs[0], prs[1]-1, prs[2]);
        if(UserBLs[i][3]){//LockFromDate
          prs = UserBLs[i][3].split("/");
          var lockDate = new Date(prs[0], prs[1]-1, prs[2]);
        }else{
          var lockDate = new Date(0, 0, 0);
        }
        var cmttime = new Date(ctime);
        if(isNaN(cmttime)){return(true);}
        if(cmttime>lockDate && cmttime<unlockDate){return(true);}
      }else{return(true);}
    }
  }
  return(false);
}
function showVIP(uri, tag, width, nbsp, ava, ancRec, ancData){
  if(ancRec){ancRec='cmt.'+ancRec;}else{ancRec='';}
  if(ancData){ancData='c'+ancData.split('-')[1];}else{ancData='';}
  var cmtUrl = strPostURL+"?commentPage="+numCommentPage+"&showComment="+ancData+"#"+ancData;
  var icon = '';
  var vipID = isVIP(uri);
  if(vipID>=0){
    if(vipID>0){//Admin:NotVIP
      var iconURL = (vipID<=numIndexVip1) ? (urlVip1Avatar) : ((vipID<=numIndexVip2) ? (urlVip2Avatar) : (urlVip3Avatar));
      if(!tag){icon = iconURL;}
      else{icon = nbsp + '<img src="' + iconURL + '" border="0" width="' + (width*0.75) + '"/>';}
    }
    if(ava){
      var cids = UserVIPs[vipID][8].split(','); //[th][vs][..]
      var cid = cids[0];
      if(cid){
        if(!tag){
          icon += ';' + urlIdAvatars[cid][0];
        }else{
          icon += nbsp + '<a title="'+urlIdAvatars[cid][1]+'" href="'+cmtUrl+'"><img src="' + urlIdAvatars[cid][0] + '" border="0" width="' + (width*1) + '"/></a>';
          for(var i=1; i<cids.length; i++){
            cid = cids[i];
            icon += nbsp + '<img title="'+urlIdAvatars[cid][1]+'" src="' + urlIdAvatars[cid][0] + '" border="0" width="' + (width*1) + '"/>';
          }
        }
      }
      if(tag){
        /// icon += nbsp + "<div class='fb-like' data-href='"+uri+"' data-send='false' data-layout='button_count' data-width='450' data-show-faces='false'></div>";
        /// icon += nbsp + '<g:plusone zise="medium" href="'+uri+'"></g:plusone>';
      }
    }
  }
  if(ancRec||ancData){
    /// icon += nbsp + "<div class='fb-like' data-href='"+cmtUrl+"' data-send='false' data-layout='button_count' data-width='450' data-show-faces='false'></div>";
    /// icon += nbsp + '<g:plusone zise="small" href="'+cmtUrl+'"></g:plusone>';
  }
  return(icon);
}
//
//////////////////////////////////////////////////
//
// Comments-paginating:
//
function recountTotalComments(){
  numEntryCommentRecount = (numCommentPage-1)*numCommentPerPage+CommentsCounter;
  return(numEntryCommentRecount);
}
function showPaginating(span_id, content){
  if(content != '')
  {content = 'Page:&nbsp;' + content;}
  updateDivContent(span_id, content);
}
function commentPagination(url, comment, printPaginating, pageNo, space){
  return commentPaginate('commentpaging', url, comment, printPaginating, pageNo, space);
}
function getPostPaginating(json){
  var numCmnts = json.feed.openSearch$totalResults.$t;
  commentPagination(strPostURL, numCmnts, 1, false, '&nbsp;');
  document.write('&nbsp;('+numCmnts+')');
}
function remakePaginating(){
  var pageHref = document.location.href;
  if(pageHref.split('/')[4]){ // Update pages but Main
    strPagination = strPagination.replace(/\&nbsp;/gi,'');
    if(!pageHref.match('/p/')){ // For "Post", not "Page"
      showPaginating("commentpaging-head", strPagination);
    }else{
      // Recount <numEntryCommentRecount>
      recountTotalComments();
      if(numEntryCommentRecount%numCommentPerPage>0){
        // Update <strPagination>
        commentPagination(pageHref.split('.html')[0]+'.html', numEntryCommentRecount, false, false, '');
        showPaginating("commentpaging-head", strPagination);
        showPaginating("commentpaging", strPagination);
      }else{
        showPaginating("commentpaging-head", strPagination);
      }
    }
  }
}
//
//////////////////////////////////////////////////
//
// Timer-functions:
//
function timedCount(showAlert, windowhost){
  showAlert = showAlert || false;
  windowhost = windowhost || window.location.hostname;
  if(timer_is_on == 1){
    $.getJSON(
    "https://"+windowhost+"/feeds/comments/default?redirect=false&max-results=1&alt=json-in-script&callback=?",
    {tags: "jquery,javascript", tagmode: "any", format: "json"},
    function(data){
      var counter = data.feed["openSearch$totalResults"].$t;
      var newComments = counter - totalComments;
      if(newComments>0){
        totalComments = counter;
        setcookie(cookieCount, totalComments, cookieDays);
        getRecentComments01();//LocalFunc
        if(showAlert){
          alert(newComments + " new comment(s) comming");
        }
      }
    });
  }
  timer = setTimeout(function(){ timedCount(showAlert, windowhost) }, timerInterval);
}
function doTimer(showAlert, windowhost){
  if(timer_is_on != 1){
    timer_is_on = 1;
    setAutoAlertMsg(msgCAAOn);
    setcookie(cookieName, 1, cookieDays);
    timedCount(showAlert, windowhost);
  }else{
    timer_is_on = 0;
    setAutoAlertMsg(msgCAAOff);
    setcookie(cookieName, 0, cookieDays);
  }
}
function setAutoAlertMsg(msg){
  document.getElementById("msgCommentAutoAlert").innerHTML = msg;
}
function doFloat(){
  if(nav_is_on != 1){
    nav_is_on = 1;
    setcookie(cookieNav, 1, cookieDays);
  }else{
    nav_is_on = 0;
    setcookie(cookieNav, 0, cookieDays);
  }
  setNavFloating(nav_is_on);
}
function setNavFloating(navOn){
  if(navOn == 1){
    setNavFloatingButton("spanNavFloatingButton", "blogPageTop", "comments", "blogPageBottom");
  }else{
    setNavFloatingButton("spanNavFloatingButton", 0);
  }
}
function setNavFloatingButton(nfbDiv, top, mid, bot){
  if(!mid){
    document.getElementById(nfbDiv).innerHTML = "";
  }else{
    var msgTop = '<a href="#'+top+'"><img src="https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/im_up.gif" border="0"/></a>';
    var msgMid = '<a href="#'+mid+'"><img src="https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/im_mid.gif" border="0"/></a>';
    var msgBot = '<a href="#'+bot+'"><img src="https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/im_down.gif" border="0"/></a>';
    document.getElementById(nfbDiv).innerHTML = msgTop+msgMid+msgBot;
  }
}
//
//////////////////////////////////////////////////
//
// Misc-functions:
//
function showMainMenu(){
  divmenu = document.getElementById("divMainMenu");
  if(divmenu.innerHTML=="") divmenu.innerHTML=strMainMenu;
  else hideMainMenu();
}
function hideMainMenu(){
  divmenu = document.getElementById("divMainMenu");
  strMainMenu = divmenu.innerHTML;
  divmenu.innerHTML = "";
}
function getCommentQuote(author, cmtnum, cmtid){
  var cmtnumRef = getGoToCommentLocation(cmtnum, cmtid);
  return 'Ref: '+author+' <A HREF="'+cmtnumRef+'">('+cmtnum+')</A> \r\n\r\n';
}
function openCommentQuote(text,cmtInput='hiddenPostBody',cmtForm='hiddenCommentForm'){
  //{xuteng}
  db(cmtInput, text);
  document[cmtForm].submit();
}
function setCommentQuote(text){
  element = document.getElementById(idTextareaCommentPost);
  element.value = text;
  element.focus();
  element.setSelectionRange(element.value.length,element.value.length);
}
function getGoToCommentValue(inputId){
  if(!inputId){inputId='go-to-comment';}
  var cmtnum = document.getElementById(inputId).value;
  if(isNaN(cmtnum)||(!cmtnum)){cmtnum=1;}
  return cmtnum;
}
function getGoToCommentLocation(cmtnum, cmtid){
  if(!cmtid){cmthash='#cmt.'+cmtnum;}else{cmthash='#c'+cmtid;}
  return location.href.split('?')[0].split('#')[0]+'?commentPage='+Math.ceil(cmtnum/numCommentPerPage)+cmthash;
}
function setGoToComment(inputId){
  var cmtnum = getGoToCommentValue(inputId);
  location.hash = '#cmt.'+cmtnum;
}
function setGoToCommentExt(inputId){
  var cmtnum = getGoToCommentValue(inputId);
  location.href = getGoToCommentLocation(cmtnum);
}
function pickButton(hide, sdiv, ocfShow, ocfHide,
titleShow, titleHide, imgShow, imgHide, idShow, idHide){
  hide = hide || false;
  sdiv = sdiv || "divRecentCommentsButton";
  ocfShow = ocfShow || "getRecentComments01();";
  ocfHide = ocfHide || "clearRecentComments01();";
  titleShow = titleShow || "Show latest comments";
  titleHide = titleHide || "Hide latest comments";
  imgShow = imgShow || "https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/icon_go_show.gif";
  imgHide = imgHide || "https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/icon_back_hide.gif";
  idShow = idShow || "iRecentCommentShow";
  idHide = idHide || "iRecentCommentHide";
  title = hide ? titleHide : titleShow;
  img = hide ? imgHide : imgShow;
  id = hide ? idHide : idShow;
  ocf = hide ? ocfHide : ocfShow;
  shtm = "<a id='" + id + "' href='#' onclick='" + ocf + ";return(false);'><img border='0' title='" + title + "' src='" + img + "'/></a>";
  document.getElementById(sdiv).innerHTML = shtm;
}
//
//////////////////////////////////////////////////
//
////
// V2014.008A:
////
function updateCommentContent(tagName, tagClass, tagIdBase, headIdBase, textIdBase, hideCounter){
  var comments = [];
  var divs = document.getElementsByTagName(tagName);
  for(index=0; index<divs.length; index++){
    if(divs[index].getAttribute('class')==tagClass){
      var comment = {};
      comment.id = divs[index].getAttribute('id');
      comment.authorUrl = divs[index].getAttribute('authorUrl');
      comment.timestamp = divs[index].getAttribute('timestamp');
      comments.push(comment);
    }
  }
  for(var index=0; index<comments.length; index++){
     var coreId = comments[index].id.split(tagIdBase)[1];
     var headId = headIdBase + coreId;
     var textId = textIdBase + coreId;
     var comheadid = document.getElementById(headId);
     var comtextid = document.getElementById(textId);
     var cmtnum = ((numCommentPage-1)*numCommentPerPage + index + 1);
     var mrHead = showVIP(comments[index].authorUrl, 1, 24, ' ', 1, cmtnum, coreId);
     var mrText = getStyledComment(comments[index].authorUrl, '?', comments[index].timestamp, comtextid.innerHTML);
     if(!hideCounter){mrHead = '<A NAME="cmt.'+cmtnum+'"></A><I><FONT COLOR="#FF9966">('+cmtnum+')</FONT></I>' + mrHead;}
     comheadid.innerHTML = mrHead;
     comtextid.innerHTML = mrText;
  }
}
////
// V2014.010A:
////
function copytext(text){//25
  const temporaryTextArea = document.createElement('textarea');
  temporaryTextArea.value = text;
  temporaryTextArea.style.position = 'fixed';
  temporaryTextArea.style.height = '0';
  temporaryTextArea.style.opacity = '0';
  document.body.appendChild(temporaryTextArea);
  temporaryTextArea.select();
  try{
    document.execCommand('copy');
    console.log('COPIED:', temporaryTextArea.value);
  }catch(err){
    console.error('COPY FAILED:', err);
  }finally{
    document.body.removeChild(temporaryTextArea);
  }
}
function updateOneCommentHeader(bcId, idPrefix, authorUrl, hideCounter, authorName, editor=false){
  CommentsCounter++;
  var cmtnum = ((numCommentPage-1)*numCommentPerPage + CommentsCounter);
  var comheadid = document.getElementById(idPrefix+bcId);
  var comgoid = document.getElementById('cgo-'+bcId);
  var mrHead = showVIP(authorUrl, 1, 24, ' ', 1, cmtnum, bcId);
  var cmtid = bcId.split('-')[1]; // bcId:[_cmt-xxxxxx]
  if(!hideCounter){mrHead = '<A NAME="cmt.'+cmtnum+'"></A><I><FONT COLOR="#FF9966">('+cmtnum+')</FONT></I>' + mrHead;}
  comheadid.innerHTML = mrHead;
  var quote = `getCommentQuote(decodeURI('${authorName}'),${cmtnum},'${cmtid}')`;
  var gocmt = `<IMG HEIGHT="12" SRC="https://cdn.jsdelivr.net/gh/asinerum/project/team/gui/button.gif" TITLE="Go comment"/>`
  if(editor)
    comgoid.innerHTML = `<A HREF="javascript:quot=${quote};editorAppendHtml(quot);editorSetFocus()">${gocmt}</A>`;
  else{
    comgoid.innerHTML = `<A HREF="javascript:quot=${quote};copytext(quot);openCommentQuote(quot)">${gocmt}</A>`;
  }
}
function updateOneCommentHeader2(bcId, idPrefix, authorUrl, hideCounter, authorName){
  updateOneCommentHeader(bcId, idPrefix, authorUrl, hideCounter, authorName, true)
}
function updateOneCommentContent(bcId, idPrefix, authorUrl, timestamp){
  var comtextid = document.getElementById(idPrefix+bcId); if(!comtextid)return;
  var mrText = getStyledComment(authorUrl, '?', timestamp, comtextid.innerHTML);
  comtextid.innerHTML = mrText;
}
function updateOneBloggerComment(bcId, idPrefix){
  var comid = document.getElementById(idPrefix+bcId);
  var authorUrl = comid.getAttribute('authorUrl');
  var authorName = comid.getAttribute('authorName');
  var timestamp = comid.getAttribute('timestamp');
  if(!DEF_HIDE_STAMPS){
    func = typeof(DEF_USE_BUILTIN_EDITOR)==='undefined' ? updateOneCommentHeader : updateOneCommentHeader2;
    func(bcId, 'is-', authorUrl, DEF_HIDE_COUNTS, authorName);
  }
  updateOneCommentContent(bcId, 'ss-', authorUrl, timestamp);
}
//
//////////////////////////////////////////////////
//
//25
//
const revertEXTags = function(text){
  text = text.exrevtagcolon('fo', '<font\n', '</font>');
  text = text.exrevtagcolon('ss', '<span style=', '</span>');
  text = text.exrevtagequal('al', '<div align=', '</div>');
  text = text.exrevtagequal('bg', '<span style=background-color:', '</span>');
  text = text.exrevtagequal('fa', '<font face=', '</font>');
  text = text.exrevtagequal('si', '<font zise=', '</font>');
  text = text.exrevtagequal('co', '<font color=', '</font>');
  text = text.sxrevtagequal('xut', '<b class="xut-', '"></b>');
  text = text.sxrevtagequal('xga', '<b class="xga-', '"></b>');
  return text;
}
const revertXTags = function(text){
  text = text.xrevtag('im', '<img src="', '"/>');
  text = text.xrevtag('img', '<img src="', '"/>');
  text = text.xrevtag('fim', '<img src="', '"/>');
  text = text.xrevtag('image', '<img src="', '"/>');
  text = text.xrevtag('ifr', '<iframe src="', '"></iframe>');
  text = text.xrevtag('ac', '<div align=center>', '</div>');
  text = text.xrevtag('ar', '<div align=right>', '</div>');
  text = text.xrevtag('xut', '<b class="xut-', '"></b>');
  text = text.xrevtag('xga', '<b class="xga-', '"></b>');
  return text;
}
const revertTags = function(text, longs=standardLongTags, shorts=standardShortTags){
  longs.split(',').forEach(tag=>{text=text.revtagex(tag, tag)});
  shorts.split(',').forEach(tag=>{text=text.revtag(tag, tag)});
  text = revertEXTags(text);
  text = revertXTags(text);
  return text;
}
const cleanTags = function(text, tagattrs=tagAllowedAttributes){
  Object.entries(tagattrs).forEach(([k,v])=>{text=text.tag2tag(k,'',v)})
  return text;
}
const escapeTags = function(text, longs=standardLongTags, shorts=standardShortTags){
  longs.split(',').forEach(tag=>{text=text.longreptag(tag, tag)});
  shorts.split(',').forEach(tag=>{text=text.shortreptag(tag, tag)});
  return text;
}
//
//////////////////////////////////////////////////