document.getElementById("profile-button")?.addEventListener("click", () => {
  document.getElementById("profile-menu")?.classList.toggle("hidden");
});

// Classes
class Dropdown {
  constructor(menu, button, textContainer, choicesContainer) {
    this.menu = menu;
    this.button = button;
    this.textContainer = textContainer;
    this.choicesContainer = choicesContainer;
    this.choices = this.choicesContainer.querySelectorAll("li");
  }

  applyDropdownToggler() {
    this.button.addEventListener("click", () => {
      this.menu.classList.toggle("hidden");
    });
  }

  applyChoiceListener() {
    this.choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        this.textContainer.textContent = choice.textContent;
        this.menu.classList.toggle("hidden");
      });
    });
  }
}

// Ajax searching
let searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", async function () {
  let response = await fetch("/books/search?q=" + searchBox.value);

  const booksContainer = document.getElementById("books-container");

  booksContainer.innerHTML = "";

  const html = await response.text();

  booksContainer.innerHTML += html;
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

// Data Count Dropdown
const dataCountMenu = document.getElementById("datacount-dropdown");
const dataCountButton = document.getElementById("datacount-button");
const dataCountTextContainer = document.getElementById(
  "datacount-text-container"
);
const dataCountChoicesContainer = document.getElementById(
  "datacount-choice-container"
);

const dataCountDropdown = new Dropdown(
  dataCountMenu,
  dataCountButton,
  dataCountTextContainer,
  dataCountChoicesContainer
);

dataCountDropdown.applyDropdownToggler();
dataCountDropdown.applyChoiceListener();

// Data Format Dropdown
const dataFormatMenu = document.getElementById("dataformat-dropdown");
const dataFormatButton = document.getElementById("dataformat-button");
const dataFormatTextContainer = document.getElementById(
  "dataformat-text-container"
);
const dataFormatChoicesContainer = document.getElementById(
  "dataformat-choice-container"
);

const dataFormatDropdown = new Dropdown(
  dataFormatMenu,
  dataFormatButton,
  dataFormatTextContainer,
  dataFormatChoicesContainer
);

dataFormatDropdown.applyDropdownToggler();
dataFormatDropdown.applyChoiceListener();
