String.prototype.escapebreaks = function(){return(this.replace(/<\/?p>/gi,'\n\n').replace(/<br\s*\/?>/gi,'\n'))}

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
  return `https://www.blogger.com/comment/fullpage/post/${getBloggerBlogID()}/${getBloggerPostID()}`;
}

function openBloggerPostCommentPage(){
  window.open(getBloggerPostCommentURL(), '_blank').focus();
}

// Using global html2cmt() and copytext(text)
function editorParseCode(nobreaks=true, note='#summernote'){
  var commentCode = editorGetCode(note);
  comment = commentCode.html2cmt();
  if(nobreaks){
    comment = comment.escapebreaks();
  }
  copytext(comment);
  openBloggerPostCommentPage();
}

function editorSetCode(code='', note='#summernote'){
  $(note).summernote('code', code);
}

function editorSetFocus(note='.note-editable'){
  $(note).trigger('focus');
}
