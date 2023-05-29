function clearForm() {
  const form = document.querySelector(".form");
  form.reset();
}

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const postTitle = document.querySelector(".title-input");
  const postSubtitle = document.querySelector(".subtitle-input");
  let date = new Date().toLocaleDateString("ro-RO");
  const postImage = document.querySelector(".image-input");
  const postCategory = document.querySelector(".category-input");
  const postSummary = document.querySelector(".summary-post");
  const postDescription = document.querySelector(".description-input");

  const warning = document.createElement("p");
  warning.innerText = "Please fill up this gap!";

  const inputs = document.querySelectorAll(".form-control");
  console.log(inputs);
  inputs.forEach((input) => {
    if (!input.value) {
      const inputContainer = input.parentElement;
      // const text = inputContainer.querySelectorAll("mb-3");
      // console.log(text);
      // text.forEach((form) => {
      //   form.appendChild(warning);
      //   console.log(form + "Ce i asta?");
      // });
      input.classList.add("border", "border-danger");
    }
  });

  const border = document.querySelectorAll(".border");
  if (border) {
    border.forEach((input) =>
      input.classList.remove("border", "border-success")
    );
  }

  if (!document.querySelector(".form-control.border-danger")) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle.value,
        subtitle: postSubtitle.value,
        time: date,
        image: postImage.value,
        category: postCategory.value,
        summary: postSummary.value,
        description: postDescription.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => clearForm());
  }
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  clearForm();
});

function updateValue(e) {
  if (e.target.value.length >= 1) {
    e.target.classList.remove("border", "border-danger");
    e.target.classList.add(
      "class",
      "form-control",
      "subtitle-input",
      "border",
      "border-success"
    );
  } else {
    console.log("sau aici");
    e.target.classList.remove("border", "border-succes");
    e.target.classList.add("border", "border-danger");

    const warning = document.createElement("p");
    warning.innerText = "Please fill up this gap!";
  }
}

const postTitle = document.querySelector(".title-input");
const postSubtitle = document.querySelector(".subtitle-input");
let date = new Date().toLocaleDateString("ro-RO");
const postImage = document.querySelector(".image-input");
const postCategory = document.querySelector(".category-input");
const postSummary = document.querySelector(".summary-post");
const postDescription = document.querySelector(".description-input");

postTitle.addEventListener("input", updateValue);
postSubtitle.addEventListener("input", updateValue);
postImage.addEventListener("input", updateValue);
postCategory.addEventListener("input", updateValue);
postSummary.addEventListener("input", updateValue);
postDescription.addEventListener("input", updateValue);
