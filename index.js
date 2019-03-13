let allNews = [];
let pageNumber = 1;
const moreButton = document.getElementById("more");
const currentNumberOfStories = document.getElementById('currentNumberOfStories');

const fetchNews = async () => {
  const API_KEY = "8be8520c430d410785329e09e4aab662";
  const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}&pageSize=1&page=${pageNumber}`;
  console.log(url);
  const json = await fetch(url).then(response => response.json());
  allNews = allNews.concat(json.articles)
  render(allNews);
};

const render = newsArray => {
  document.getElementById("display").innerHTML = renderNews(newsArray);
  currentNumberOfStories.innerHTML = allNews.length;
};


//Click for more button
moreButton.addEventListener("click", () => {
  pageNumber++;
  console.log(`Page Number: ${pageNumber}`);
  fetchNews();
});

const renderNews = newsArray => {
  if (newsArray) {
    return newsArray.map(article => {
      return `<div class="col-4">
        <div class="card mb-2">
            <img src="${article.urlToImage}" 
                 alt="${article.urlToImage}"
                 width= '100%'
                 height= auto
                 max-height = '300px'/>
            <div class="card-body">
                <div class="card-title"><h3>${article.title}</h3></div>
                <div class="card-text">${article.description}</div>
            </div>
        </div>
    </div>`;
    }).join('');
  }
};


render(allNews);
fetchNews();
