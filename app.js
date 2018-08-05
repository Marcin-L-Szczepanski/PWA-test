(function () {
  function fetchDOM () {
    const app = document.querySelector('#app');
    const container = app.querySelector('.entry-container');
    const loadMore = app.querySelector('.load-more');
  };
  
  async function getPosts (page = 1) {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts?_page=' + page);
    
    return await result.json();
  }
  
  async function getUsers () {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    
    return await result.json();
  }
  
})();