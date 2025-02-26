function slideInToast() {
  toast.classList.remove("animate-slide-out-right");
  toast.classList.add("animate-slide-in-right");
  toast.classList.remove("hidden");
  toast.classList.add("flex");
}

function slideOutToast() {
  return new Promise((resolve) => {
    toast.classList.add("animate-slide-out-right");
    toast.classList.remove("animate-slide-in-right");
    setTimeout(function () {
      toast.classList.add("hidden");
      resolve();
    }, 500);
  });
}

function displaySortingDetailsModal(timeExecution, memory, sortingName) {
  sortingNameContainer.textContent = "Sort name:";
  generateContainer.textContent = "Data count:";
  formatContainer.textContent = "Data format:";
  memoryContainer.textContent = "Memory:";

  sortingNameContainer.textContent += ` ${sortingName}`;
  const sortTimeExecution = timeExecution;

  executionContainer.textContent = sortTimeExecution;
  generateContainer.textContent += ` ${dataCountDropdown.getSelectedValue()}`;
  formatContainer.textContent += ` ${dataFormatDropdown.getSelectedValue()}`;
  memoryContainer.textContent += ` ${(memory / 1000).toFixed(2)} KB`;

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

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (document.querySelector(selector)?.contains(e.target)) {
      callback();
    }
  });
}

function renderBookRow(book) {
  const borrowerButtonColor =
    book["is_borrowed"] == 1
      ? "border-red-600 text-red-600 bg-red-200"
      : "border-green-600 text-green-600 bg-green-200";
  const borrowButtonStatus =
    book["is_borrowed"] == 1 ? "Borrowed" : "Available";

  bookView = book["title"].replace(" ", "-").toLowerCase();

  return `
    <tr class="text-md even:bg-gray-100">
      <td class="px-3 py-1.5" data-cell="Book ID">${book["id"]} </td>
      <td class="px-3 py-1.5" data-cell="Category">${book["category"]} </td>
      <td class="px-3 py-1.5" data-cell="Book Title"><a href="books/${bookView}/view">${book["title"]}</a></td>
      <td class="px-3 py-1.5" data-cell="Author">${book["author"]} </td>
      <td class="px-3 py-1.5" data-cell="Pages">${book["pages"]} </td>
      <td class="px-3 py-1.5" data-cell="Status">
        <button class="rounded-md min-w-20 p-1 border ${borrowerButtonColor}">
          ${borrowButtonStatus}
        </button>
      </td>
    </tr>
    `;
}

function toggleErrorMessage(button, id, show) {
  if (show) {
    button.classList.add("border", "border-red-600");
    document.getElementById(id).classList.remove("hidden");
  } else {
    button.classList.remove("border", "border-red-600");
    document.getElementById(id).classList.add("hidden");
  }
}

// Classes
class Dropdown {
  constructor(menu, button, selected, choicesContainer, icon) {
    this.menu = menu;
    this.button = button;
    this.choicesContainer = choicesContainer;
    this.choices = this.choicesContainer.querySelectorAll("li");
    this.choice = null;
    this.selected = selected;
    this.icon = icon;
  }

  applyDropdownToggler() {
    document.addEventListener("click", (event) => {
      if (this.button.contains(event.target)) {
        this.menu.classList.toggle("hidden");
      } else {
        this.menu.classList.add("hidden");
      }
    });
  }

  applyChoiceListener() {
    this.choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        this.choice = choice.getAttribute("data-value");
        this.selected.textContent = choice.textContent;
        this.icon.classList.add("hidden");
        this.menu.classList.toggle("hidden");
        this.button.classList.add("gap-2");
      });
    });
  }

  getSelectedValue() {
    return this.choice;
  }
}

// Profile Menu
const booksContainer = document.getElementById("books-container");
const skeletonContainer = document.getElementById("skeleton-container");

// Data Count Dropdown
const dataCountMenu = document.getElementById("datacount-dropdown");
const dataCountButton = document.getElementById("datacount-button");
const dataCountSelected = document.getElementById("datacount-selected");
const dataCountChoicesContainer = document.getElementById(
  "datacount-choice-container"
);
const dataCountDropdownIcon = document.getElementById(
  "datacount-dropdown-icon"
);

// Data Format Dropdown
const dataFormatMenu = document.getElementById("dataformat-dropdown");
const dataFormatButton = document.getElementById("dataformat-button");
const dataFormatSelected = document.getElementById("dataformat-selected");
const dataFormatChoicesContainer = document.getElementById(
  "dataformat-choice-container"
);
const dataFormatDropdownIcon = document.getElementById(
  "dataformat-dropdown-icon"
);

// Toast notification
const toast = document.getElementById("toast-default");
const closeButton = document.getElementById("close-toast");
const toastViewDetails = document.getElementById("view-details-button");

// Modal
const executionContainer = document.getElementById("time-execution-container");
const sortingNameContainer = document.getElementById("sorting-name-container");
const memoryContainer = document.getElementById("memory-container");
const speedContainer = document.getElementById("speed-container");
const generateContainer = document.getElementById(
  "sorting-generate-data-container"
);
const formatContainer = document.getElementById(
  "sorting-data-format-container"
);
const modal = document.getElementById("default-modal");
const modalCloseButton = document.getElementById("close-modal");
const viewResultButton = document.getElementById("view-result");

// Class instantiation
const dataCountDropdown = new Dropdown(
  dataCountMenu,
  dataCountButton,
  dataCountSelected,
  dataCountChoicesContainer,
  dataCountDropdownIcon
);

dataCountDropdown.applyDropdownToggler();
dataCountDropdown.applyChoiceListener();

const dataFormatDropdown = new Dropdown(
  dataFormatMenu,
  dataFormatButton,
  dataFormatSelected,
  dataFormatChoicesContainer,
  dataFormatDropdownIcon
);

dataFormatDropdown.applyDropdownToggler();
dataFormatDropdown.applyChoiceListener();

addGlobalEventListener("click", "#profile-button", () => {
  document.getElementById("profile-menu").classList.toggle("hidden");
});

// Ajax searching
const searchBox = document.getElementById("search-box");

const updateDebounceText = debounce(async (query) => {
  try {
    let response = await fetch(`/books/search?q=${encodeURIComponent(query)}`);

    booksContainer.innerHTML = "";

    if (response.ok) {
      const html = await response.text();

      booksContainer.innerHTML += html;
    } else {
      booksContainer.innerHTML =
        "<p>Failed to load books. Please try again.</p>";
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    booksContainer.innerHTML =
      "<p>Error fetching books. Please try again later.</p>";
  }
});

searchBox.addEventListener("input", () => {
  updateDebounceText(searchBox.value);
});

function debounce(cb, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

document
  .getElementById("sort-button")
  .addEventListener("click", async function () {
    let htmlRow = "";
    let dataCount = dataCountDropdown.getSelectedValue();
    let dataFormat = dataFormatDropdown.getSelectedValue();

    if (!dataCount) {
      toggleErrorMessage(dataCountButton, "no-count", true);
      return;
    } else {
      toggleErrorMessage(dataCountButton, "no-count", false);
    }

    await slideOutToast();

    if (!dataFormat) {
      toggleErrorMessage(dataFormatButton, "no-format", true);
      return;
    } else {
      toggleErrorMessage(dataFormatButton, "no-format", false);
    }

    skeletonContainer.classList.toggle("hidden");
    booksContainer.innerHTML = "";

    let response = await fetch(
      `/books/sort?count=${dataCount}&format=${dataFormat}`
    );

    let bookData = await response.json();

    let memory;

    const resources = performance.getEntriesByType("resource");
    resources.forEach((resource) => {
      if (
        resource.name.replace("http://127.0.0.1:5000", "") ===
        `/books/sort?count=${dataCount}&format=${dataFormat}`
      ) {
        memory = resource.transferSize;
      }
    });

    console.log(memory);
    console.log(memory / 1000);

    bookData.books.forEach((book) => {
      htmlRow += renderBookRow(book);
    });

    skeletonContainer.classList.toggle("hidden");
    booksContainer.innerHTML = htmlRow;

    slideInToast();
    displaySortingDetailsModal(bookData.time_execution, memory, "Cocktail");
  });

closeButton.addEventListener("click", function () {
  slideOutToast();
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

viewResultButton.addEventListener("click", () => {
  modal.classList.toggle("hidden");
  modal.classList.toggle("flex");
});
