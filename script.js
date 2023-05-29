fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      createPost(post);
    });
  });
fetch("http://localhost:3000/posts?_limit=2&_sort=time&_order=desc")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      createStory(post);
    });
  });

function createPost(post) {
  const rightContainerPosts = document.querySelector(".col-9");

  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container", "container");
  postContainer.setAttribute("data-idPost", post.id);

  const timetextContainer = document.createElement("div");
  timetextContainer.classList.add(
    "time-text-container",
    "ps-2",
    "d-flex",
    "justify-content-between"
  );

  const headingContainerForPost = document.createElement("div");

  const paragraphTimeText = document.createElement("p");
  paragraphTimeText.classList.add("m-0");

  const activeBtnContainer = document.createElement("div");
  activeBtnContainer.classList.add("dropdown");

  const activeBtnsForPost = document.createElement("i");
  activeBtnsForPost.setAttribute(
    "class",
    "fa-solid fa-ellipsis-vertical dropdown"
  );
  activeBtnsForPost.setAttribute("type", "button");
  activeBtnsForPost.setAttribute("data-bs-toggle", "dropdown");
  activeBtnsForPost.setAttribute("aria-expanded", "false");

  const activeDropdown = document.createElement("ul");
  activeDropdown.setAttribute("class", "dropdown-menu");

  const activeDropdownList = document.createElement("li");
  activeDropdownList.setAttribute("class", "dropdown-item");
  activeDropdownList.innerText = "Delete post";

  activeDropdownList.addEventListener("click", (event) => {
    event.preventDefault();
    const postsContainer = document.querySelector(
      '.post-container[data-idPost="' + post.id + '"]'
    );
    const storyContainer = document.querySelector(
      '.popular-stories-container[data-postid="' + post.id + '"]'
    );
    const storiesContainer = document.querySelector(".stories");
    fetch("http://localhost:3000/posts/" + post.id, {
      method: "DELETE",
    }).then(() => {
      postsContainer.remove();
      storyContainer.remove();
      storiesContainer.innerText = "";
      fetch("http://localhost:3000/posts?_limit=2&_sort=time&_order=desc")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((post) => {
            createStory(post);
          });
        });
    });
  });

  activeDropdown.appendChild(activeDropdownList);
  activeBtnsForPost.appendChild(activeDropdown);

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

  const titleOfThePost = document.createElement("h2");
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

  const descriptionOfThePost = document.createElement("h5");
  descriptionOfThePost.classList.add("m-2");
  descriptionOfThePost.innerText = post.summary;

  const breakLine = document.createElement("hr");

  headingContainerForPost.appendChild(paragraphTimeText);
  headingContainerForPost.appendChild(titleOfThePost);
  timetextContainer.appendChild(headingContainerForPost);
  timetextContainer.appendChild(activeBtnsForPost);
  postContainer.appendChild(timetextContainer);
  postContainer.appendChild(imageLinkPost);
  postContainer.appendChild(descriptionOfThePost);
  postContainer.appendChild(breakLine);
  rightContainerPosts.appendChild(postContainer);
}

function createStory(post) {
  const mainRow = document.querySelector(".stories");

  const popularStoriesContainer = document.createElement("div");
  popularStoriesContainer.setAttribute(
    "class",
    "popular-stories-container container"
  );
  popularStoriesContainer.setAttribute("data-postId", post.id);

  const storyTitle = document.createElement("h6");
  storyTitle.innerText = post.title;

  popularStoriesContainer.appendChild(storyTitle);

  const storyImage = document.createElement("img");
  storyImage.setAttribute("src", post.image);
  storyImage.setAttribute("class", "popular-img");
  storyImage.setAttribute("alt", post.summary);

  popularStoriesContainer.appendChild(storyImage);

  const storyTime = document.createElement("p");
  storyTime.classList.add("time", "mt-2");

  storyTime.innerText = post.time + " in " + post.category;

  popularStoriesContainer.appendChild(storyTime);

  mainRow.appendChild(popularStoriesContainer);
}

const tags = document.querySelectorAll(".tag");
tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    localStorage.setItem("tagCategory", JSON.stringify(tag.innerText));
  });
});

function updateValue(e) {
  fetch("http://localhost:3000/posts?q=" + e.target.value)
    .then((response) => response.json())
    .then((data) => {
      const postRow = document.querySelector(".col-9");
      postRow.innerText = "";
      data.forEach((post) => {
        createPost(post);
      });
    });
}
