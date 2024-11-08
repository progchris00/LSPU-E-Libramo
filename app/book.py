import time
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort

from app.auth import login_required
from app.db import get_db
from app.sorts import *

bp = Blueprint('book', __name__, url_prefix='/books')

@bp.route('')
def index():
    db = get_db()

    if g.user is None:
        books = db.execute(
            'SELECT * FROM book LIMIT 10'
        ).fetchall()
        target_category = None
    else:
        course = g.user["course"]
        target_category = get_target_category(course)
        all_books = db.execute("SELECT * FROM book").fetchall()

        target_books = [book for book in all_books if book["category"] == target_category]
        other_books = [book for book in all_books if book["category"] != target_category]

        sorted_target_books = cocktail_sort(target_books, "rating")
        sorted_other_books = cocktail_sort(other_books, "rating")

        books = sorted_target_books + other_books

    return render_template('book/index.html', books=books, target_category=target_category)


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


@bp.route("/sort/<sortingType>")
def sort(sortingType):
    start_time = time.time()
    books = get_sorted_book(sortingType)
    time_execution = time.time() - start_time

    books = [dict(book) for book in books]

    response = {
        "books": books,
        "time_execution": time_execution
    }

    return jsonify(response)

# Utility functions
def get_book(title):
    book = get_db().execute("SELECT * FROM book WHERE lower(title) = ?", (title,)).fetchone()

    if book is None:
        abort(404, f"Book with title {title} cannot be found.")
    
    return book


def get_target_category(course):
    course_mapping = {
        "BSCS" : "Technology",
        "BSA" : "Accounting",
        "BSP" : "Psychology"
    }

    return course_mapping[course]


def get_sorted_book(sortingName):
    db = get_db()
    books = db.execute("SELECT * FROM book").fetchall()
    books = [book for book in books]

    if sortingName == "cocktail":
        return cocktail_sort(books, "title")
    elif sortingName == "insertion":
        return insertion_sort(books, "title")
    elif sortingName == "treesort":
        return tree_sort(books, "title")