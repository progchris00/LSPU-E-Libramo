const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");
profileButton?.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

// Ajax searching
let book_style = null;
let book_status = null;
document.getElementById("search-box").addEventListener("input", function () {
  const query = this.value;

  fetch(`/books/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";

      data.forEach((book) => {
        const { book_style, book_status } =
          book.is_borrowed == 1
            ? {
                book_style: "text-warning-600 bg-warning",
                book_status: "Borrowed",
              }
            : {
                book_style: "text-success-600 bg-success",
                book_status: "Available",
              };

        booksContainer.innerHTML += `
                    <tr class="py-2 px-4 text-md">
                        <td class="px-3 py-1.5">${book.id}</td>
                        <td class="px-3 py-1.5">${book.category}</td>
                        <td class="px-3 py-1.5">${book.title}</td>
                        <td class="px-3 py-1.5">${book.author}</td>
                        <td class="px-3 py-1.5">${book.pages}</td>
                        <td class="px-3 py-1.5">
                          <button class="rounded-md p-2 ${book_style}">${book_status}</button>
                        </td>
                    </tr>
                `;
      });
    })
    .catch((error) => console.error("Error fetching books:", error));
});
