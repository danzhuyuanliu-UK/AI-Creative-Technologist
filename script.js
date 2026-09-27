const tabs = [...document.querySelectorAll('[data-tab]')];
function selectTab(name, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.dataset.tab === name;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(`panel-${tab.dataset.tab}`).hidden = !selected;
    if (selected && focus) tab.focus();
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[next].dataset.tab, true);
  });
});
document.querySelectorAll('[data-select]').forEach(link => link.addEventListener('click', () => selectTab(link.dataset.select)));
const dialog = document.getElementById('video-dialog');
const frame = document.getElementById('video-frame');
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  document.getElementById('video-title').textContent = button.dataset.title;
  document.getElementById('video-external').href = `https://youtu.be/${button.dataset.video}`;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`;
  iframe.title = button.dataset.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.replaceChildren(iframe);
  dialog.showModal();
}));
document.getElementById('close-video').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => frame.replaceChildren());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
