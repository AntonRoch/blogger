const blogger_post_title_class = 'h3.post-title';
const blogger_post_comment_header = 'Post comment to Quan Bua';
const blogger_comment_copy_notice = 'Comment code copied. Now you can paste it to the comment posting input area';

const comment_page_head_divid = 'comment_page_head';
const comment_page_name_divid = 'comment_page_name';
const comment_container_divid = 'comment_container';

const urlBloggerCommentIframe = 'https://www.blogger.com/comment/frame';
const urlPostCommentMinPage = 'https://antonroch.github.io/blogger/blogger.comment.min.html';
const urlPostCommentPage = 'https://antonroch.github.io/blogger/blogger.comment.html';

const editorConfig = {
  dialogsInBody: true,
  toolbar: [['style', ['style']],
  ['style', ['bold', 'italic', 'underline', 'fontname', 'clear']],
  ['font', ['strikethrough', 'superscript', 'subscript']],
  ['color', ['color']],
  ['insert', ['table', 'hr']],
  ['para', ['ul', 'ol', 'paragraph']],
  ['insert', ['link', 'picture', 'video']],
  ['view', ['undo', 'redo', 'codeview', 'help']]],
  styleTags: ['pre', 'blockquote']
}

String.prototype.escapebreaks = function(){return(this.replace(/<\/?p>/gi,'\n').replace(/<br\s*\/?>/gi,'\n').replace(/(\r?\n|\r){3,}/g,'\n\n'))}

function editorInit(config=editorConfig, note='#summernote'){
  $(document).ready(function(){
    $(note).summernote(config);
  });
}

function editorGetHtml(note='.note-editable'){
  return $(note).html();
}

function editorSetHtml(html, note='.note-editable'){
  return $(note).html(html);
}

function editorInsertHtml(html, note='.note-editable'){
  html = html + editorGetHtml(note);
  editorSetHtml(html, note);  
}

function editorAppendHtml(html, note='.note-editable'){
  html = editorGetHtml(note) + html;
  editorSetHtml(html, note);  
}

function editorGetText(note='.note-editable'){
  return $(note).text();
}

function editorSetText(text, note='.note-editable'){
  return $(note).text(text);
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
  openBloggerPostCommentFrame(urlPostCommentPage);
}

function openBloggerPostCommentFrame(url=urlPostCommentMinPage){
  window.open(`${url}?blog=${getBloggerBlogID()}&post=${getBloggerPostID()}&head=${blogger_post_comment_header}&name=${editorGetPostTitle()}`).focus();
}

// Using global html2cmt() and copytext(text)
function editorParseCode(linefeed=true, msg=blogger_comment_copy_notice, note='#summernote'){
  var commentCode = editorGetCode(note);
  comment = commentCode.html2cmt();
  var feed = linefeed ? '\n' : '';
  copytext(feed + comment.trim());
  alert(msg);
  openBloggerPostCommentFrame();
}

function editorSetCode(code='', note='#summernote'){
  $(note).summernote('code', code);
}

function editorSetFocus(editor='.note-editor', editable='.note-editable', note='#summernote'){
  $(note).summernote('focus');
  let edit = $(note).next(editor).find(editable)[0];
  let range = document.createRange();
  let select = window.getSelection();
  range.selectNodeContents(edit);
  range.collapse(false);
  select.removeAllRanges();
  select.addRange(range);
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
