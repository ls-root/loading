document.querySelectorAll('.content span').forEach(function(oldSpan) {
  var webTuiSpan = document.createElement('span');
  webTuiSpan.setAttribute('is-', 'badge');
  webTuiSpan.setAttribute('cap-', 'square');
  webTuiSpan.textContent = oldSpan.textContent
  // Replace the old span with the new one
  oldSpan.replaceWith(webTuiSpan);
});