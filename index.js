let allNews = [];
let pageNumber = 1;
let pageSize = 10;
let category = "technology";
const moreButton = document.getElementById("more");
const currentNumberOfStories = document.getElementById(
  "currentNumberOfStories"
);
const newsSource = document.getElementById("newsSource");
const categoryCheckbox = document.getElementsByName("categoryCheckbox");
const categoryMenu = document.getElementById("categoryMenu");
const dropdownItem = document.getElementsByClassName("dropdown-item");
let sourceSelected = [];
let browserUrl = new URL(window.location.href);
const categoryList = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];


const fetchNews = async from => {
  const API_KEY = "8be8520c430d410785329e09e4aab662";
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=${pageSize}&page=${pageNumber}&category=${category}`;

  const json = await fetch(url).then(response => response.json());
  if (from === "dropdown") {
    allNews = json.articles;
  } else {
    allNews = allNews.concat(json.articles);
  }
  render(allNews);
};

const render = (newsArray, from) => {
  let filteredNewsArray;
  if (sourceSelected.length == 0) {
    filteredNewsArray = newsArray;
  } else {
    filteredNewsArray = newsArray.filter(article =>
      sourceSelected.includes(article.source.name)
    );
  }
  document.getElementById("display").innerHTML = renderNews(filteredNewsArray);
  currentNumberOfStories.innerHTML = newsArray.length;

  categoryMenu.innerHTML = renderCategory();
  handleDropdown();

  if (!from) {
    //This is to skip the Checkbox if we call the render function inside the checkbox click
    newsSource.innerHTML = renderSource(newsArray);
    handleCheckbox();
  } else {
    console.log("handleCheckbox is not run");
  }
};

const renderNews = newsArray => {
  if (newsArray) {
    return newsArray
      .map(article => {
        return `<div class="card mb-4 rounded-5">
            ${article.urlToImage ? `<img class='image-size' 
                 src="${article.urlToImage}" 
                 alt="${article.urlToImage}"
              />`:''}
            <div class="card-header"><a class='text-decoration-none' href=${article.url}><h3>${trimString(article.title)}</h3></a></div>
            <div class="card-body">
                <p>${moment(article.publishedAt).fromNow()} - <b>${article.source.name}</b> - <b>${article.author ? article.author : ''}</b> </p>
                <div class="card-text">${article.description ? article.description : ''}</div>
            </div>
        </div>`;
      })
      .join("");
  }
};

const trimString = (string) => {  //Trim the title
  return string.split(' ').slice(0,10).join(' ').concat(' ...')
}

const renderSource = newsArray => {
  let result = {};
  for (let i = 0; i < newsArray.length; i++) {
    if (result[newsArray[i].source.name]) {
      result[newsArray[i].source.name]++;
    } else {
      result[newsArray[i].source.name] = 1;
    }
  }

  return Object.keys(result)
    .map(source => {
      return `
        <div class='checkbox'> 
            <label> 
                <input type='checkbox' value="${source}"
                       name='categoryCheckbox' /> 
                ${source} (${result[source]})
            </label>
        </div>
      `;
    })
    .join("");
};

const renderCategory = () => {
  return categoryList
    .map(category => {
      return `<a class="dropdown-item" href="#">${category}</a>`;
    })
    .join("");
};

//Toogle the checkbox => Printout Value
const handleCheckbox = () => {
  categoryCheckbox.forEach(eachBox =>
    eachBox.addEventListener("change", () => {
      console.log("hello");
      if (eachBox.checked) {
        sourceSelected = [...sourceSelected, eachBox.value];
      } else {
        sourceSelected = sourceSelected.filter(
          source => source !== eachBox.value
        );
      }
      render(allNews, "checkbox");
    })
  );
};

const handleDropdown = () => {
  [...dropdownItem].forEach(item =>
    item.addEventListener("click", () => {
      category = item.innerHTML;
      changeUrl(category);
      fetchNews('dropdown');
    })
  );
};

const changeUrl = category => {
  //clear Browser URL
  // window.location.href = browserUrl.origin + browserUrl.pathname;
  console.log(browserUrl);
  browserUrl.searchParams.set("category", category);
  window.location.href = browserUrl.toString();
};

//Click for more button
moreButton.addEventListener("click", () => {
  pageNumber++;
  console.log(`Page Number: ${pageNumber}`);
  fetchNews();
});

fetchNews();
/*
    render
    Begin: allNews = []
    Load: new Array of allNews + 20 
*/


/* Known Bug: 
If still got checkbox, the Dropdown button not work */
