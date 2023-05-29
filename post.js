const postId = JSON.parse(localStorage.getItem("idPost"));

fetch("http://localhost:3000/posts/" + postId)
  .then((response) => response.json())
  .then((post) => {
    createPost(post);
  });

function clearForm() {
  const form = document.querySelector(".form");
  form.reset();
  // validation.remove();
}

function createPost(post) {
  const mainContainer = document.querySelector(".post");

  const postContainer = document.createElement("div");
  postContainer.classList.add("text-center");

  const postHeaderContainer = document.createElement("div");

  const postHeaderTimeContainer = document.createElement("div");
  postHeaderTimeContainer.innerText = post.time + " in " + post.category;

  postHeaderContainer.appendChild(postHeaderTimeContainer);

  const postTitleConainter = document.createElement("h1");
  postTitleConainter.innerText = post.title;

  postHeaderContainer.appendChild(postTitleConainter);

  const postImage = document.createElement("img");
  postImage.setAttribute("src", post.image);
  postImage.setAttribute("alt", post.summary);
  postImage.setAttribute("class", "banner-img");

  postContainer.appendChild(postHeaderContainer);
  postContainer.appendChild(postImage);

  const postDescription = document.createElement("div");
  postDescription.setAttribute("class", "mt-3 fs-5 container");
  postDescription.innerText = post.description;

  postContainer.appendChild(postDescription);

  const breakLine = document.createElement("hr");
  postContainer.appendChild(breakLine);

  mainContainer.appendChild(postContainer);
}

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const firstName = document.querySelector(".firstName-input").value;
  const lastName = document.querySelector(".lastName-input").value;
  const comment = document.querySelector(".comments-input").value;
  const date = new Date().toLocaleDateString("ro-RO");

  const validation = document.createElement("p");
  validation.classList.add("text-danger", "fs-5", "validation-message");
  validation.innerText =
    "Do you want to remain anonymous? then leave this site, here is no place for people like you! Try Tor Browser :)";

  const validationsLocation = document.querySelector(".validations");

  if (firstName === "" || lastName === "" || comment === "") {
    validationsLocation.appendChild(validation);
    if (validation) {
      const validationMessage = document.querySelector(".validation-message");
      validationMessage.remove();
      validationsLocation.appendChild(validation);
    }
  } else {
    const validationMessage = document.querySelector(".validation-message");
    if (validationMessage) {
      validationMessage.remove();
    }
    fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        comment: comment,
        postId: postId,
        time: date,
        likes: 0,
        dislikes: 0,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((comment) => {
        const warningMessageContainer = document.querySelector(
          ".no-comments-warning"
        );
        if (warningMessageContainer) {
          warningMessageContainer.remove();
        }
        clearForm();
        createComment(comment);
      });
  }
});

fetch("http://localhost:3000/comments?postId=" + postId)
  .then((response) => response.json())
  .then((comments) => {
    if (comments.length === 0) {
      console.log("da");

      const emptyCommentsContainer = document.createElement("div");
      emptyCommentsContainer.classList.add("no-comments-warning");

      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("text-center");
      emptyMessage.innerText = "No comments!";

      emptyCommentsContainer.appendChild(emptyMessage);
      const commentSection = document.querySelector(".comments");
      commentSection.appendChild(emptyCommentsContainer);
    }
    comments.forEach((comment) => {
      createComment(comment);
      if (comment.dislikes > comment.likes) {
        const commentContainer = document.querySelector(
          '.comment-container[data-id="' + comment.id + '"]'
        );
        commentContainer.classList.add("opacity");
      }
    });
  });

function createComment(comment) {
  const commentSection = document.querySelector(".comments");

  const commentContainer = document.createElement("div");
  commentContainer.setAttribute(
    "class",
    "d-flex aling-content-center m-4 border-radius p-2 bg-light shadow comment-container"
  );
  commentContainer.setAttribute("data-id", comment.id);

  const profile = document.createElement("div");
  profile.setAttribute(
    "class",
    "profile-img-name text-center m-2 max-witdh-150"
  );

  const commentImage = document.createElement("img");
  commentImage.setAttribute(
    "src",
    "https://scontent.fclj1-2.fna.fbcdn.net/v/t39.30808-6/347627978_1207254316645759_8342458136069692808_n.jpg?_nc_cat=106&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1Z9uOIdtDK8AX_3_p69&_nc_ht=scontent.fclj1-2.fna&oh=00_AfBvqr3MiZb2ELJzS-eni0-g4EwjUR7JUOm1i5MJCWyM4Q&oe=646DD6E8"
  );
  commentImage.setAttribute("class", "comment-image");

  const commentTextContainer = document.createElement("div");
  commentTextContainer.setAttribute(
    "class",
    "d-flex align-items-center flex-grow-1 m-2"
  );

  const commentNameContainer = document.createElement("div");
  commentNameContainer.setAttribute("class", "actualComment");

  const commentName = document.createElement("h5");
  commentName.classList.add("m-0");
  commentName.innerText = comment.firstname + " " + comment.lastname;

  profile.appendChild(commentImage);
  profile.appendChild(commentName);

  const commentDescription = document.createElement("p");
  commentDescription.setAttribute("class", "fs-5");
  commentDescription.innerText = comment.comment;

  commentNameContainer.appendChild(commentDescription);

  const commentDate = document.createElement("p");
  commentDate.setAttribute("class", "text-secondary");
  commentDate.innerText = comment.time;

  commentNameContainer.appendChild(commentDate);

  const iconsContainer = document.createElement("div");
  iconsContainer.setAttribute("class", "align-self-center text-center");

  const clearBtn = document.createElement("i");
  clearBtn.setAttribute(
    "class",
    "fa-solid fa-trash align-self-center m-4 fs-4"
  );

  clearBtn.setAttribute("data-id", comment.id);
  clearBtn.addEventListener("click", () => {
    const commentId = document.querySelector(
      '.fa-trash[data-id="' + comment.id + '"]'
    );
    fetch("http://localhost:3000/comments/" + comment.id, {
      method: "DELETE",
    }).then(() => {
      commentContainer.remove(commentId);
      const comments = document.querySelectorAll(".comment-container");

      if (comments.length === 0) {
        const emptyCommentsContainer = document.createElement("div");
        emptyCommentsContainer.classList.add("no-comments-warning");

        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("text-center");
        emptyMessage.innerText = "No comments!";

        emptyCommentsContainer.appendChild(emptyMessage);
        commentSection.appendChild(emptyCommentsContainer);
      }
    });
  });

  const likeBtnContainer = document.createElement("div");
  likeBtnContainer.setAttribute(
    "class",
    "border-end d-flex align-items-center"
  );

  const counterLike = document.createElement("span");
  counterLike.setAttribute("class", "p-1 fs-5 align-self-center like-counter");
  counterLike.innerText = comment.likes;

  const likeBtn = document.createElement("i");
  likeBtn.setAttribute("class", "fa-regular fa-thumbs-up fs-5 m-2");

  likeBtnContainer.appendChild(counterLike);
  likeBtnContainer.appendChild(likeBtn);

  const dislikeBtnContainer = document.createElement("div");
  dislikeBtnContainer.setAttribute("class", "p-1 d-flex align-items-center");

  const counterDislike = document.createElement("span");
  counterDislike.setAttribute("class", "fs-5");
  counterDislike.innerText = comment.dislikes;

  likeBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/comments/" + comment.id, {
      method: "PATCH",
      body: JSON.stringify({
        likes: +counterLike.innerText + 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        counterLike.innerText = response.likes;
        if (response.likes >= response.dislikes) {
          commentContainer.classList.remove("opacity");
        }
      });
  });

  const dislikeBtn = document.createElement("i");
  dislikeBtn.setAttribute(
    "class",
    "fa-regular fa-thumbs-down fs-5 m-2 dislike-counter"
  );

  dislikeBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/comments/" + comment.id, {
      method: "PATCH",
      body: JSON.stringify({
        dislikes: +counterDislike.innerText + 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        counterDislike.innerText = response.dislikes;
        if (response.dislikes > response.likes) {
          commentContainer.classList.add("opacity");
        }
      });
  });

  dislikeBtnContainer.appendChild(dislikeBtn);
  dislikeBtnContainer.appendChild(counterDislike);

  const activeBtn = document.createElement("div");
  activeBtn.setAttribute("class", "d-flex bg-white border border-radius");

  activeBtn.appendChild(likeBtnContainer);
  activeBtn.appendChild(dislikeBtnContainer);

  commentContainer.appendChild(profile);
  commentTextContainer.appendChild(commentNameContainer);
  commentContainer.appendChild(commentTextContainer);

  iconsContainer.appendChild(clearBtn);
  iconsContainer.appendChild(activeBtn);

  commentContainer.appendChild(iconsContainer);

  commentSection.appendChild(commentContainer);
}
