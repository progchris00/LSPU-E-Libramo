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

const sortDropdown = document.getElementById("sort-dropdown");
const sortButton = document.getElementById("sort-button");
sortButton?.addEventListener("click", () => {
  sortDropdown.classList.toggle("hidden");
});

const sortContainer = document.querySelector(".sort-container");
const sortChoices = sortContainer.querySelectorAll("li");
const booksContainer = document.getElementById("books-container");
const skeletonContainer = document.getElementById("skeleton-container");

// Alert
const toast = document.getElementById("toast-default");
const closeButton = document.getElementById("close-toast");

// Modal
const executionContainer = document.getElementById("time-execution-container");
const sortingNameContainer = document.getElementById("sorting-name-container");
const speedContainer = document.getElementById("speed-container");

sortChoices.forEach((choice) => {
  choice.addEventListener("click", async function () {
    booksContainer.innerHTML = "";
    skeletonContainer.classList.toggle("hidden");
    sortDropdown.classList.toggle("hidden");

    let response = await fetch(`/books/sort/${choice.id}`);
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

      sortingNameContainer.textContent = choice.innerText;
    });
    skeletonContainer.classList.toggle("hidden");
    booksContainer.innerHTML = row_data;
    executionContainer.textContent = book_data.time_execution.toFixed(2);

    if (book_data.time_execution < 1) {
      speedContainer.textContent = "Fast";
    } else if (book_data.time_execution > 2) {
      speedContainer.textContent = "Slow";
    }

    toast.classList.toggle("flex");
    toast.classList.toggle("hidden");
    toast.classList.add("animate-slide-in-right");
  });

  closeButton.addEventListener("click", function () {
    toast.classList.remove("animate-slide-in-right");
    toast.classList.add("animate-slide-out-right");

    setTimeout(function () {
      toast.classList.add("hidden");
    }, 500);
  });

  // Get elements
  const viewDetailsButton = document.getElementById("view-details-button");
  const modal = document.getElementById("default-modal");
  const closeModal = document.getElementById("close-modal");
  // const viewDetailsButton = document.getElementById("view-details");

  // Show the modal when the "View" link in the toast is clicked
  viewDetailsButton.addEventListener("click", () => {
    modal.classList.toggle("flex");
    modal.classList.toggle("hidden");
  });

  // Close the modal when the close button is clicked
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden"); // Hide modal
  });
});
