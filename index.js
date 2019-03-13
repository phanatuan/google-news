let allNews = [];
let pageNumber = 1;
const moreButton = document.getElementById("more");
const currentNumberOfStories = document.getElementById(
  "currentNumberOfStories"
);
const newsCategory = document.getElementById("newsCategory");

const fetchNews = async () => {
  const API_KEY = "8be8520c430d410785329e09e4aab662";
  const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}&pageSize=10&page=${pageNumber}`;
  const json = await fetch(url).then(response => response.json());
  allNews = allNews.concat(json.articles);
  render(allNews);
};

const render = newsArray => {
  document.getElementById("display").innerHTML = renderNews(newsArray);
  currentNumberOfStories.innerHTML = allNews.length;
  newsCategory.innerHTML = renderCategory(newsArray);
};

const renderNews = newsArray => {
  if (newsArray) {
    return newsArray
      .map(article => {
        return `<div class="col-6">
        <div class="card mb-2">
            <img src="${article.urlToImage}" 
                 alt="${article.urlToImage}"
                 width= '100%'
                 height= auto
                 max-height = '300px'/>
            <div class="card-body">
                <div class="card-title"><h3>${article.title}</h3></div>
                <p>${moment(article.publishedAt).fromNow()}</p>
                <div class="card-text">${article.description}</div>
            </div>
        </div>
    </div>`;
      })
      .join("");
  }
};

const renderCategory = newsArray => {
  let result = {};
  console.log(newsArray);

  //from NewsArray to Category Object (with source: count keys/value) 
  for (let i = 0; i < newsArray.length; i++) {
    if (result[newsArray[i].source.name]) {
      result[newsArray[i].source.name] = result[newsArray[i].source.name] + 1;
    } else {
     result[newsArray[i].source.name] = 1;
    }
  }

  //render that Category Object
  return Object.keys(result).map(source => { 
      return `
        <div class='checkbox'> 
            <label> 
                <input type='checkbox' value="${source}" /> 
                ${source} (${result[source]})
            </label>
        </div>
      `}).join('');
};

//Click for more button
moreButton.addEventListener("click", () => {
  pageNumber++;
  console.log(`Page Number: ${pageNumber}`);
  fetchNews();
});

// render(allNews);
fetchNews();
