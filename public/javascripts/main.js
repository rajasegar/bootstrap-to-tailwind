const txtBootstrap = document.getElementById('txtBootstrap');
const txtTailwind = document.getElementById('txtTailwind');
txtBootstrap.addEventListener('input', (ev) => {
  txtTailwind.value = ev.target.value;
});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
