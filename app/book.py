from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort

from app.auth import login_required
from app.db import get_db
from app.sorting_algo import *

bp = Blueprint('book', __name__, url_prefix='/books')

@bp.route('')
def index():
    course_mapping = {
        "BSCS" : "Technology",
        "BSA" : "Accounting",
        "BSP" : "Psychology"
    }

    db = get_db()

    if g.user is None:
        books = db.execute(
            'SELECT * FROM book'
        ).fetchall()
    else:
        course = g.user["course"]
        all_books = db.execute("SELECT * FROM book").fetchall()

        target_books = [book for book in all_books if book["category"] == course_mapping[course]]
        other_books = [book for book in all_books if book["category"] != course_mapping[course]]

        sorted_target_books = cocktail_sort(target_books, "rating")
        sorted_other_books = cocktail_sort(other_books, "rating")

        books = sorted_target_books + other_books

    return render_template('book/index.html', books=books)

@bp.route("/search")
def search():
    db = get_db()
    query = request.args.get('q', '') 
    books = db.execute("SELECT * FROM book WHERE title LIKE ?", (f"%{query}%",)).fetchall()

    books_list = [dict(book) for book in books]

    return render_template("book/partials/books-table.html", books=books)

@bp.route("/<title>/view", methods=("GET", "POST"))
def view(title):
    book = get_book(title.replace("-", " "))
    return render_template("book/view.html", book=book)

def get_book(title):
    book = get_db().execute("SELECT * FROM book WHERE lower(title) = ?", (title,)).fetchone()

    if book is None:
        abort(404, f"Book with title {title} cannot be found.")
    
    return book