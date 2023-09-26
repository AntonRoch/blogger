//////////////////////////////////////////////////
//
const resourcesLocation = 'https://cdn.jsdelivr.net/gh/antonroch/blogger';
const iconImageLocation = `${resourcesLocation}/img`;
//
//////////////////////////////////////////////////
//
////
// var DEF_HIDE_STAMPS = TRUE; //Comment-archive
// var DEF_HIDE_STAMPS = FALSE;
// var DEF_HIDE_COUNTS = FALSE;
////
//
var DEF_IMG_WIDTH = 480;
var DEF_IMG_HEIGHT = 270;
let DEF_STYLE = 'style="max-width:100%;height:auto"';
//
var CommentsCounter = 0;
var numCommentPerPage = 200;
var sDefAllowedTagList = "<br><b><i><a>";
var sMoreAllowedTagList = "<p><img><font><span><div><u><li><ol><ul><sup><sup><blockquote><hr>";
var autoResizeCommentFont = true;
var nFontSizeMax = 6;
var nFontSizeMin = 3;
//
var numIndexVip1 = 20;
var numIndexVip2 = 50;
var urlVip1Avatar = `${iconImageLocation}/is_vip02.jpg`;
var urlVip2Avatar = `${iconImageLocation}/is_vip03.jpg`;
var urlVip3Avatar = `${iconImageLocation}/is_vip04.gif`;
//
// Ext-pages-defines:
var exPageCmntPages = {};
var exPageNames = [];
//
// Paginating:
var numEntryComment = 0; //Data-post
var numEntryCommentFeed = 0; //JSON-Feeder
var numEntryCommentRecount = 0; //Onfly-count
var numCommentPage = 1;
var strPagination = '';
var strEntryURL = '';
var strPostURL = '';
var strPostID = '';
var strBlogID = '';
//
// Comment-authors:
var urlIdAvatars = {};
var iCommentSmileys = {};
//
// Comment-containers:
var dataFullComments = {};
var idTextareaCommentPost = 'comment-body';
//
// Comment-format:
var UserBLs = [];
var UserVIPs = [];
var isVipAuthor = false;
var isBLAuthor = false;
var rsBLAuthor = false;
var isStyleItalic = false;
var isStyleBold = false;
var isStyleBGC = false;
//
// Comment-consts:
var numRecentComments = 25;
var maxCommentChars = 175;
var useAvatar = false;
var urlAnoAvatar = `${iconImageLocation}/noava.jpg`;
var urlIconPostA = `${iconImageLocation}/im_star3.gif`;
var urlIconPostB = `${iconImageLocation}/im_star2.gif`;
var urlIconPostC = `${iconImageLocation}/im_star1.gif`;
//
// Stamps-n-cards:
urlIdAvatars['00'] = [`${iconImageLocation}/i_quanbua2.gif`, 'L&#227;nht&#7909; t&#224;nb&#7841;o manh&#273;&#7897;ng'];
urlIdAvatars['th'] = [`${iconImageLocation}/i_tinhhoa.gif`, 'Tinhhoa phongnh&#227; baola'];
urlIdAvatars['vs'] = [`${iconImageLocation}/i_vangson.gif`, 'V&#224;ngson m&#7855;t s&#7855;c m&#244;ng to &#273;&#249;i tr&#242;n'];
urlIdAvatars['bn'] = [`${iconImageLocation}/i_bannong.gif`, 'B&#7847;nn&#244;ng m&#7891;m &#273;&#7887; c&#7855;n nhanh'];
urlIdAvatars['jh'] = [`${iconImageLocation}/i_jahoi.gif`, 'C&#225;cm&#225;c gi&#224;h&#243;i, c&#7845;m th&#7857;ng m&#224;y tr&#234;u'];
urlIdAvatars['tt'] = [`${iconImageLocation}/i_tintin.gif`, 'Tintin ch&#432;a m&#7845;t trinh &#273;&#226;u'];
urlIdAvatars['db'] = [`${iconImageLocation}/i_daibang.gif`, '&#272;&#7841;ib&#224;ng b&#7909;ng c&#243;c d&#225;i m&#232;o tai d&#417;i'];
urlIdAvatars['mt'] = [`${iconImageLocation}/i_momthoi.gif`, 'M&#245;m th&#7889;i, bam su&#7889;t b&#7843;y ng&#224;y'];
urlIdAvatars['oq'] = [`${iconImageLocation}/i_ocquat.gif`, '&#211;c qu&#7845;t, kh&#244;n nh&#7845;t Qu&#225;n n&#224;y con &#417;i'];
urlIdAvatars['ld'] = [`${iconImageLocation}/i_liudan.gif`, 'L&#7921;u&#273;&#7841;n gi&#7853;t ch&#7889;t qu&#259;ng ngay'];
urlIdAvatars['td'] = [`${iconImageLocation}/i_thandit.gif`, 'Th&#7847;n &#273;&#7883;t, ch&#417;i kh&#233;o, v&#259;n hay, c&#7863;c d&#224;i'];
urlIdAvatars['vc'] = [`${iconImageLocation}/i_daubo.gif`, '&#272;&#7847;u b&#242;, b&#7843;oth&#7911; thi&#234;nt&#224;i'];
urlIdAvatars['sl'] = [`${iconImageLocation}/i_salong.gif`, 'Sal&#244;ng th&#225;nh g&#250;c mi&#7879;tm&#224;i l&#224; &#273;&#226;y'];
urlIdAvatars['lx'] = [`${iconImageLocation}/i_loxo.gif`, 'L&#242;xo b&#7853;t m&#227;i kh&#244;ng ngu&#244;i'];
urlIdAvatars['eo'] = [`${iconImageLocation}/i_echop.gif`, '&#7870;ch ng&#7891;i &#273;&#225;y gi&#7871;ng, bi&#7871;t &#273;&#7901;i n&#224;o ngon'];
urlIdAvatars['cs'] = [`${iconImageLocation}/i_casau.gif`, 'C&#225;s&#7845;u m&#7863;t x&#7845;u v&#227;i l&#7891;n'];
urlIdAvatars['xl'] = [`${iconImageLocation}/i_xilip.gif`, 'Xil&#237;p h&#7891;ng t&#237;m cho ch&#224;ng hai-phai'];
urlIdAvatars['oc'] = [`${iconImageLocation}/i_ongcu.gif`, 'Anh C&#7909; r&#259;ng b&#7921;a r&#226;u th&#432;a'];
urlIdAvatars['ol'] = [`${iconImageLocation}/i_ongle.gif`, 'Anh Le ph&#225;tx&#237;t r&#226;u nh&#432; qu&#7843; m&#236;n'];
urlIdAvatars['om'] = [`${iconImageLocation}/i_ongmao.gif`, 'Anh Mao r&#226;u c&#7841;o s&#7841;ch tr&#417;n'];
urlIdAvatars['on'] = [`${iconImageLocation}/i_ongnin.gif`, 'Anh Nin r&#226;u m&#7885;c tr&#249;m quanh quai h&#224;m'];
urlIdAvatars['bc'] = [`${iconImageLocation}/i_boncau.gif`, 'X&#237; b&#7879;t, n&#244;n kh&#7841;c khai m&#249;'];
urlIdAvatars['cd'] = [`${iconImageLocation}/i_chuidit.gif`, 'Gi&#7845;y l&#244;, nh&#245;n &#273;&#225;m ph&#242; qu&#234; m&#7899;i d&#249;ng'];
urlIdAvatars['tb'] = [`${iconImageLocation}/i_taobon.gif`, 'T&#225;ob&#243;n t&#7915; s&#225;ng t&#7899;i &#273;&#234;m'];
urlIdAvatars['tv'] = [`${iconImageLocation}/i_tinvit.gif`, 'Chuy&#234;n tung tin v&#7883;t, &#7843;o h&#417;n loa ph&#432;&#7901;ng'];
urlIdAvatars['tz'] = [`${iconImageLocation}/i_tongzat.gif`, 'Em to&#7885;c: M&#7865;o, M&#225;n, T&#224;y, M&#432;&#7901;ng'];
urlIdAvatars['dance'] = [`${iconImageLocation}/dance.gif`, 'Guerrilla'];
urlIdAvatars['fun'] = [`${iconImageLocation}/fun.gif`, 'Actress'];
urlIdAvatars['hit'] = [`${iconImageLocation}/hit.gif`, 'Policeman'];
urlIdAvatars['hug'] = [`${iconImageLocation}/hug.gif`, 'Teacher'];
urlIdAvatars['kiss'] = [`${iconImageLocation}/kiss.gif`, 'Capitalist'];
urlIdAvatars['laugh'] = [`${iconImageLocation}/laugh.gif`, 'Communist'];
urlIdAvatars['think'] = [`${iconImageLocation}/think.gif`, 'Wanking Netizen'];
urlIdAvatars['ship'] = [`${iconImageLocation}/ship.gif`, 'Shipping Biker'];
urlIdAvatars['show'] = [`${iconImageLocation}/show.gif`, 'Fucking Bastard'];
urlIdAvatars['ride'] = [`${iconImageLocation}/ride.gif`, 'Homeless Wanderer'];
//
// Comment-href:
exPageNames[0] = ['ban-hang', 'Mua-ban', 'Bookstore'];
exPageNames[1] = ['tu-van-kinh-doanh', 'Tuvan kinhdoanh', 'Business Consulting'];
exPageNames[2] = ['tu-van-cong-nghe', 'Tuvan congnghe', 'Technology Consulting'];
exPageNames[3] = ['tu-van-giao-duc', 'Tuvan giaoduc', 'Education Consulting'];
exPageNames[4] = ['tu-van-phap-ly', 'Tuvan phaply', 'Law Consulting'];
exPageNames[5] = ['tu-van-van-xa', 'Tuvan vanxa', 'Culture Consulting'];
exPageNames[6] = ['tu-van-suc-khoe', 'Tuvan suckhoe', 'Health Consulting'];
exPageNames[7] = ['tu-van-gia-inh', 'Tuvan giadinh', 'Life Consulting'];
exPageNames[8] = ['tu-van-tam-linh', 'Tuvan tamlinh', 'Spirit Consulting'];
exPageNames[9] = ['tu-van-choi', 'Tuvan anchoi', 'Entertainment Consulting'];
exPageNames[10] = ['index-mucluc', 'Mucluc Bua', 'Shit Index'];
exPageNames[11] = ['resources', 'Tainguyen Bua', 'Shit Resources'];
exPageNames[12] = ['comment-archive', 'Luutru Bua', 'Shit Archive'];
exPageNames[13] = ['thamgia-paid-box', 'Thamgia Paibox', 'Join Paibox'];
exPageNames[14] = ['thamgia-fast-mba', 'Thamgia Fast MBA', 'Join Fast MBA'];
exPageNames[15] = ['thamgia-fast-flp', 'Thamgia Fast FLP', 'Join Fast FLP'];
exPageNames[16] = ['meo-comment', 'Meo comment', 'Comment Tricks'];
exPageNames[17] = ['bam-box', 'Bam', 'Bam Box'];
exPageNames[18] = ['web-games', 'Game', 'Web Games'];
exPageNames[19] = ['comments-quickview', 'CommentView & Chat', 'CommentView & Chat'];
//
// Comment-smiley:
iCommentSmileys['*dance*'] = [`<img src="${iconImageLocation}/dance.gif" border="0"/>`];
iCommentSmileys['*fun*'] = [`<img src="${iconImageLocation}/fun.gif" border="0"/>`];
iCommentSmileys['*hit*'] = [`<img src="${iconImageLocation}/hit.gif" border="0"/>`];
iCommentSmileys['*hug*'] = [`<img src="${iconImageLocation}/hug.gif" border="0"/>`];
iCommentSmileys['*kiss*'] = [`<img src="${iconImageLocation}/kiss.gif" border="0"/>`];
iCommentSmileys['*laugh*'] = [`<img src="${iconImageLocation}/laugh.gif" border="0"/>`];
iCommentSmileys['*think*'] = [`<img src="${iconImageLocation}/think.gif" border="0"/>`];
iCommentSmileys['*ship*'] = [`<img src="${iconImageLocation}/ship.gif" border="0"/>`];
iCommentSmileys['*show*'] = [`<img src="${iconImageLocation}/show.gif" border="0"/>`];
iCommentSmileys['*ride*'] = [`<img src="${iconImageLocation}/ride.gif" border="0"/>`];
//
//////////////////////////////////////////////////