const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");
profileButton?.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

// Ajax searching
let searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", async function () {
  let response = await fetch("/books/search?q=" + searchBox.value);

  const booksContainer = document.getElementById("books-container");

  booksContainer.innerHTML = "";

  const html = await response.text();

  booksContainer.innerHTML += html;
});

// Data Count Dropdown
const countDropdown = document.getElementById("count-dropdown");
const countButton = document.getElementById("count-button");
countButton?.addEventListener("click", () => {
  countDropdown.classList.toggle("hidden");
});
const countTextContainer = document.getElementById("count-text-container");

const countContainer = document.querySelector(".count-container");
const countChoices = countContainer.querySelectorAll("li");

countChoices.forEach((choice) => {
  choice.addEventListener("click", async function () {
    countTextContainer.textContent = choice.id;
    countDropdown.classList.toggle("hidden");
  });
});

// Count Format Dropdown
const caseDropdown = document.getElementById("case-dropdown");
const caseButton = document.getElementById("case-button");
caseButton?.addEventListener("click", () => {
  caseDropdown.classList.toggle("hidden");
});
const formatTextContainer = document.getElementById("format-text-container");

const caseContainer = document.querySelector(".case-container");
const caseChoices = caseContainer.querySelectorAll("li");

caseChoices.forEach((choice) => {
  choice.addEventListener("click", async function () {
    formatTextContainer.textContent = choice.id;
    caseDropdown.classList.toggle("hidden");
  });
});

const booksContainer = document.getElementById("books-container");
const skeletonContainer = document.getElementById("skeleton-container");

const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", async function () {
  booksContainer.innerHTML = "";
  skeletonContainer.classList.toggle("hidden");

  let count = countTextContainer.textContent;
  let format = formatTextContainer.textContent;
  let response = await fetch(
    `/books/sort?count=${count.replace(",", "")}&format=${format}`
  );
  let book_data = await response.json();
  let row_data = "";
  let borrowerColor;
  let borrowerStatus;

  book_data.books.forEach((book) => {
    if (book["is_borrowed"] == 1) {
      borrowerColor = "border-red-600 text-red-600 bg-red-200";
      borrowerStatus = "Borrowed";
    } else {
      borrowerColor = "border-green-600 text-green-600 bg-green-200";
      borrowerStatus = "Available";
    }
    row_data += `
        <tr>
          <td class="px-3 py-1.5">${book["id"]} </td>
          <td class="px-3 py-1.5">${book["category"]} </td>
          <td class="px-3 py-1.5"><a href="books/${book["title"]
            .replace(" ", "-")
            .toLowerCase()}/view">${book["title"]}</a></td>
          <td class="px-3 py-1.5">${book["author"]} </td>
          <td class="px-3 py-1.5">${book["pages"]} </td>
          <td class="px-3 py-1.5">
            <button class="rounded-md min-w-20 p-1 border ${borrowerColor}">
              ${borrowerStatus}
            </button>
          </td>
        </tr>
        `;
  });
  skeletonContainer.classList.toggle("hidden");
  booksContainer.innerHTML = row_data;

  displaySortingDetailsModal(book_data.time_execution, "Cocktail");
  displayToastNotif();
});

// Alert
const toast = document.getElementById("toast-default");
const closeButton = document.getElementById("close-toast");
const toastViewDetails = document.getElementById("view-details-button");

// Modal
const executionContainer = document.getElementById("time-execution-container");
const sortingNameContainer = document.getElementById("sorting-name-container");
const speedContainer = document.getElementById("speed-container");
const generateContainer = document.getElementById(
  "sorting-generate-data-container"
);
const formatContainer = document.getElementById(
  "sorting-data-format-container"
);
const modal = document.getElementById("default-modal");
const modalCloseButton = document.getElementById("close-modal");

// sortChoices.forEach((choice) => {
//   choice.addEventListener("click", async function () {
//     booksContainer.innerHTML = "";
//     skeletonContainer.classList.toggle("hidden");
//     sortDropdown.classList.toggle("hidden");

//     let response = await fetch(`/books/sort/${choice.id}`);
//     let book_data = await response.json();

//     let row_data = "";

//     let borrowerColor;
//     let borrowerStatus;

//     book_data.books.forEach((book) => {
//       if (book["is_borrowed"] == 1) {
//         borrowerColor = "border-red-600 text-red-600 bg-red-200";
//         borrowerStatus = "Borrowed";
//       } else {
//         borrowerColor = "border-green-600 text-green-600 bg-green-200";
//         borrowerStatus = "Available";
//       }
//       row_data += `
//       <tr>
//         <td class="px-3 py-1.5">${book["id"]} </td>
//         <td class="px-3 py-1.5">${book["category"]} </td>
//         <td class="px-3 py-1.5"><a href="books/${book["title"]
//           .replace(" ", "-")
//           .toLowerCase()}/view">${book["title"]}</a></td>
//         <td class="px-3 py-1.5">${book["author"]} </td>
//         <td class="px-3 py-1.5">${book["pages"]} </td>
//         <td class="px-3 py-1.5">
//           <button class="rounded-md min-w-20 p-1 border ${borrowerColor}">
//             ${borrowerStatus}
//           </button>
//         </td>
//       </tr>
//       `;
//     });
//     skeletonContainer.classList.toggle("hidden");
//     booksContainer.innerHTML = row_data;

//     displaySortingDetailsModal(book_data.time_execution, choice.innerText);
//     displayToastNotif();
//   });
// });

closeButton.addEventListener("click", function () {
  toast.classList.remove("animate-slide-in-right");
  toast.classList.add("animate-slide-out-right");

  setTimeout(function () {
    toast.classList.add("hidden");
  }, 500);
});

// Toast logic
toastViewDetails.addEventListener("click", () => {
  toast.classList.remove("animate-slide-in-right");
  toast.classList.add("animate-slide-out-right");
  toast.classList.toggle("hidden");
  toast.classList.toggle("flex");

  modal.classList.toggle("flex");
  modal.classList.toggle("hidden");
});

// Modal Logic
modalCloseButton.addEventListener("click", function () {
  modal.classList.toggle("hidden");
  modal.classList.toggle("flex");
});

function displayToastNotif() {
  toast.classList.remove("animate-slide-out-right");
  toast.classList.add("animate-slide-in-right");
  toast.classList.remove("hidden");
  toast.classList.add("flex");
}

function displaySortingDetailsModal(timeExecution, sortingName) {
  sortingNameContainer.textContent = "Sort name:";
  generateContainer.textContent = "Data count:";
  formatContainer.textContent = "Data format:";

  sortingNameContainer.textContent += ` ${sortingName}`;
  const sortTimeExecution = timeExecution;

  executionContainer.textContent = sortTimeExecution;
  generateContainer.textContent += ` ${countTextContainer.textContent}`;
  formatContainer.textContent += ` ${formatTextContainer.textContent}`;

  if (sortTimeExecution < 1) {
    speedContainer.textContent = "Fast";
    speedContainer.classList.remove(
      "border-red-600",
      "text-red-600",
      "bg-red-200"
    );
    speedContainer.className += " border-green-600 text-green-600 bg-green-200";
  } else if (sortTimeExecution > 2) {
    speedContainer.textContent = "Slow";
    speedContainer.classList.remove(
      "border-green-600",
      "text-green-600",
      "bg-green-200"
    );
    speedContainer.className += " border-red-600 text-red-600 bg-red-200";
  }
}
