const blogger_post_title_class = 'h3.post-title';
const blogger_post_comment_header = 'Post comment to Quan Bua';

const comment_page_head_divid = 'comment_page_head';
const comment_page_name_divid = 'comment_page_name';
const comment_container_divid = 'comment_container';

const urlBloggerCommentIframe = 'https://www.blogger.com/comment/frame';
const urlPostCommentMinPage = 'https://antonroch.github.io/blogger/blogger.comment.min.html';
const urlPostCommentPage = 'https://antonroch.github.io/blogger/blogger.comment.html';

String.prototype.escapebreaks = function(){return(this.replace(/<\/?p>/gi,'\n').replace(/<br\s*\/?>/gi,'\n').replace(/(\r?\n|\r){3,}/g,'\n\n'))}

function editorInit(config={dialogsInBody:true}, note='#summernote'){
  $(document).ready(function(){
    $(note).summernote(config);
  });
}

function editorGetCode(note='#summernote'){
  return $(note).summernote('code');
}

// RESERVED: Using global copytext(text)
function editorCopyCode(note='#summernote'){
  return copytext(editorGetCode(note));
}

function getBloggerBlogID(){
  return document.getElementById('blogID').value;
}

function getBloggerPostID(){
  return document.getElementById('postID').value;
}

function getBloggerPostCommentURL(){
  return `${urlBloggerCommentIframe}/${getBloggerBlogID()}?po=${getBloggerPostID()}`;
}

function openBloggerPostCommentPage(){
  window.open(getBloggerPostCommentURL(), '_blank').focus();
}

function openBloggerPostCommentFrame(){
  window.open(`${urlPostCommentMinPage}?blog=${getBloggerBlogID()}&post=${getBloggerPostID()}&head=${blogger_post_comment_header}&name=${editorGetPostTitle()}`).focus();
}

// Using global html2cmt() and copytext(text)
function editorParseCode(nobreaks=true, note='#summernote'){
  var commentCode = editorGetCode(note);
  comment = commentCode.html2cmt();
  copytext(comment.trim());
  openBloggerPostCommentFrame();
}

function editorSetCode(code='', note='#summernote'){
  $(note).summernote('code', code);
}

function editorSetFocus(note='.note-editable'){
  $(note).trigger('focus');
}

function editorGetPostTitle(title_class=blogger_post_title_class){
  return document.querySelector(title_class).textContent;
}

function checkImage(url){
  return new Promise((resolve)=>{
    const img = new Image();
    img.onload=()=>{resolve(true)};
    img.onerror=()=>{resolve(false)};
    img.src = url;
  });
}

function extractUrlQuery(query_string){
  let p = new URLSearchParams(query_string.split('?')[1]);
  return p.size==0 ? {} : Object.fromEntries(p.entries());
}

function editorSetCommentPage(src=null, blog='blog', post='post', head='head', name='name'){
  let dat = extractUrlQuery(window.location.href);
  if(dat[head]) document.getElementById(comment_page_head_divid).innerHTML = dat[head];
  if(dat[name]) document.getElementById(comment_page_name_divid).innerHTML = dat[name];
  document.getElementById(comment_container_divid).src = src || `${urlBloggerCommentIframe}/${dat[blog]}?po=${dat[post]}`;
}
