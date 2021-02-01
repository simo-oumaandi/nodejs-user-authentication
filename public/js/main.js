// FRONT END JAVASCRIPT 




console.log("working");
M.Sidenav.init(document.querySelector('.sidenav'));
M.FormSelect.init(document.querySelector('#status'));



// CKEDITOR 4 -> https://ckeditor.com/docs/ckeditor4/latest/guide/dev_installation.html
CKEDITOR.replace('body', {
    plugins: 'wysiwygarea, toolbar, basicstyles, link'
});