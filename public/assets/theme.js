try{document.documentElement.dataset.theme=localStorage.getItem('mengdao-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}
