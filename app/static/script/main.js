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
    });

    skeletonContainer.classList.toggle("hidden");
    booksContainer.innerHTML = row_data;
  });

// Modals
const toast = document.getElementById('toast-default');
const closeButton = document.getElementById('close-toast');
const slideButton = document.getElementById('slideButton');

// Function to show the toast with slide-in effect
slideButton.addEventListener('click', function () {
toast.classList.remove('animate-slide-out-right');
toast.classList.remove('hidden');
toast.classList.add('animate-slide-in-right');
});

// Function to remove the toast with slide-out effect
closeButton.addEventListener('click', function () {
toast.classList.remove('animate-slide-in-right');
toast.classList.add('animate-slide-out-right');

// Wait for the slide-out animation to complete before removing the element
setTimeout(function () {
toast.classList.add('hidden');
}, 500); // Match the animation duration (0.5s)
});

 // Get elements
const viewToastLink = document.getElementById('view-toast-link');
const modal = document.getElementById('default-modal');
const closeModal = document.getElementById('close-modal');
const viewDetailsButton = document.getElementById('view-details');
 
// Show the modal when the "View" link in the toast is clicked
viewToastLink.addEventListener('click', function(e) {
   e.preventDefault();
   modal.classList.remove('hidden');  // Show modal
 });

 // Close the modal when the close button is clicked
 closeModal.addEventListener('click', function() {
   modal.classList.add('hidden');  // Hide modal
 });

 // Hide the modal when the "View Details" button is clicked
 viewDetailsButton.addEventListener('click', function() {
   modal.classList.add('hidden');  // Hide modal
 });

});
