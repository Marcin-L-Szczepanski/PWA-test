(function () {
    const app = document.querySelector('#app');
    const container = app.querySelector('.entry-container');
    const loadMore = app.querySelector('.load-more');
  
  async function getPosts (page = 1) {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + page);
    
    return await result.json();
  }
  
  async function getUsers () {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    
    return await result.json();
  }
  
  async function loadEntries (page = 1) {
    const [posts, users] = await Promise.all([getPosts(page), getUsers()]);
   // console.log(posts);
  //  console.log(users);
    
      return posts.map(post => {
    //    console.log(post);
        const user = users.filter(u => u.id === post.userId)[0];
    //    console.log(user);
        return `<section class="entry"><h2 class="entry-title">${post.title}</h2><article class="entry-body">${post.body}</article><div class="entry-author"><a href="mailto:${user.email}">${user.name}</a></div></section>`;
        }).join('');
  }
  
  
  function appendEntries(entries) {
    const output = container.querySelector('output') || container.appendChild(document.createElement('output'));
    output.outerHTML = entries += '<output></output>';
  }
  
  (async function() {
    let page = 1;
    
    async function loadMoreEntries() {
      loadMore.disabled = true;
      const entries = await loadEntries(page++);
      console.log(entries);
      appendEntries(entries);
    }
    
    loadMoreEntries();
  })();
  
  console.log(loadEntries(1));
  
})();


window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  e.prompt();
});

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('sw.js');
  } catch (e) {
    console.error('ServiceWorker failed', e);
  }
}

// check for support
if ('serviceWorker' in navigator) {
  try {
    // calls navigator.serviceWorker.register('sw.js');
    registerServiceWorker();
  } catch (e) {
    console.error(e);
  }
}