const searchInput = document.querySelector('#search-input');

const params = new URLSearchParams(window.location.search)
const query = params.get('query')

searchInput.value = query

searchContent(query)

searchInput.addEventListener('keyup', debounce((e) => {
  if(e.key == 'Enter') {
    const query = e.target.value
    // Perform a search if there is a query
    searchContent(query)
  }
}, 250))


function searchContent(query) {
  if (query) {
    // Retain the search input in the form when displaying results
    document.getElementById('search-input').setAttribute('value', query)

    const idx = lunr(function () {
      this.ref('id')
      this.field('title', {
        boost: 15
      })

      for (const key in window.store) {
        this.add({
          id: key,
          title: window.store[key].title,
          thumbnail: window.store[key].thumbnail,
          url: window.store[key].url,
          category: window.store[key].category,
          date: window.store[key].date,
          // description: window.store[key].description,
          author: window.store[key].author,
          author_photo: window.store[key].author_photo,
          author_job: window.store[key].author_job,
        })
      }
    })

    // Perform the search
    const results = idx.search(query)

    console.log(results);
    // Update the list with results
    displayResults(results, window.store)
  } 
}

function displayResults (results, store) {
  const searchResults = document.querySelector('#results')
  if (results.length) {
    let resultList = ''
    // Iterate and build result list elements
    for (const n in results) {
      const item = store[results[n].ref]
      resultList += `
        <figure class="post-card mt-3 md:mt-0 pt-8 md:pt-0">
          <a href="${item.url}" class="block w-full rounded-md hover:opacity-90 transition aspect-video">
            <img src="${item.thumbnail}"  class="w-full h-full object-cover rounded-lg" alt="{{ .Title }}">
          </a>
          <div class="md:col-span-4 py-5">
            <div class="text-sm opacity-60 flex items-center gap-x-3">
              <span class="uppercase">${item.category}</span> <div class="h-1 w-1 rounded-full bg-white"></div> ${item.date}
            </div>
            <a href="${item.url}" class="block hover:underline py-3">
              <figcaption class="font-medium leading-loose line-clamp-2 capitalize text-2xl">
                ${item.title}
              </figcaption>
            </a>
            <p class="opacity-60 leading-loose tracking-wider w-full md:w-[85%] line-clamp-3">
            ${item.description}
            </p>
            <div class="flex items-center gap-3 mt-5">
              <img src="${item.author_photo}" class="w-14 h-14 aspect-square rounded-full object-cover" alt="{{ .Params.Author }}">
              <div>
                <h3>${item.author}</h3>
                <p class="opacity-60">${item.author_job}</p>
              </div>
            </div>
          </div>
        </figure>
      `
    }
    searchResults.innerHTML = resultList
  } else {
    searchResults.innerHTML = 'No results found.'
  }
}

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;
	    
    let later = function() {  
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};