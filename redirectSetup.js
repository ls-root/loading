fetch('isusernew.php')
  .then(res => res.json())
  .then(isNew => {
    if (isNew) window.location.href = '/setup.html'
  })
  .catch(err => console.error('Redirect check failed:', err))
