const tagCategory = JSON.parse(localStorage.getItem("tagCategory"));

fetch("http://localhost:3000/posts?category=" + encodeURIComponent(tagCategory))
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      createPost(post);
    });
  });
function createPost(post) {
  const rightContainerPosts = document.querySelector(".col-9");

  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container", "container");

  const timetextContainer = document.createElement("div");
  timetextContainer.classList.add("time-text-container", "ps-2");

  const paragraphTimeText = document.createElement("p");
  paragraphTimeText.classList.add("m-0");

  const spanTimePast = document.createElement("span");
  spanTimePast.classList.add("time");
  spanTimePast.innerText = post.time;

  const spanTimeText = document.createElement("span");
  spanTimeText.classList.add("text-secondary");
  spanTimeText.innerText = " in ";

  const spanCategory = document.createElement("span");
  spanCategory.classList.add("category");
  spanCategory.innerText = post.category;

  paragraphTimeText.appendChild(spanTimePast);
  paragraphTimeText.appendChild(spanTimeText);
  paragraphTimeText.appendChild(spanCategory);

  const titleOfThePost = document.createElement("h4");
  titleOfThePost.innerText = post.title;

  const imageLinkPost = document.createElement("a");
  imageLinkPost.setAttribute("href", "post.html");

  const imageOfThePost = document.createElement("img");
  imageOfThePost.setAttribute("src", post.image);
  imageOfThePost.setAttribute("alt", post.summary);
  imageOfThePost.setAttribute("class", "banner-img");
  imageOfThePost.addEventListener("click", () => {
    localStorage.setItem("idPost", JSON.stringify(post.id));
  });

  imageLinkPost.appendChild(imageOfThePost);

  const descriptionOfThePostContainer = document.createElement("div");
  descriptionOfThePostContainer.classList.add("banner-text");

  const descriptionOfThePost = document.createElement("p");
  descriptionOfThePost.classList.add("m-2");
  descriptionOfThePost.innerText = post.summary;

  const breakLine = document.createElement("hr");

  timetextContainer.appendChild(paragraphTimeText);
  timetextContainer.appendChild(titleOfThePost);
  postContainer.appendChild(timetextContainer);
  postContainer.appendChild(imageLinkPost);
  postContainer.appendChild(descriptionOfThePost);
  postContainer.appendChild(breakLine);
  rightContainerPosts.appendChild(postContainer);
}

fetch("http://localhost:3000/posts?_limit=2&_sort=time&_order=desc")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      createStory(post);
    });
  });

function createStory(post) {
  const leftContainerPosts = document.querySelector(".col-3");

  const popularStoriesContainer = document.createElement("div");
  popularStoriesContainer.setAttribute(
    "class",
    "popular-stories-container container"
  );

  const storySubtitle = document.createElement("h6");
  storySubtitle.innerText = post.subtitle;

  popularStoriesContainer.appendChild(storySubtitle);

  const storyImage = document.createElement("img");
  storyImage.setAttribute("src", post.image);
  storyImage.setAttribute("class", "popular-img");
  storyImage.setAttribute("alt", post.summary);

  popularStoriesContainer.appendChild(storyImage);

  const storyTime = document.createElement("p");
  storyTime.classList.add("time", "mt-2");

  storyTime.innerText = post.time + " in " + post.category;

  popularStoriesContainer.appendChild(storyTime);

  leftContainerPosts.appendChild(popularStoriesContainer);
}

const categoryContainer = document.querySelector(".category-container");

const category = document.createElement("h2");
category.innerText = tagCategory;

categoryContainer.appendChild(category);

const tags = document.querySelectorAll(".tag");
tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    localStorage.setItem("tagCategory", JSON.stringify(tag.innerText));
  });
});
