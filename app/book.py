from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort

from app.auth import login_required
from app.db import get_db

bp = Blueprint('book', __name__, url_prefix='/books')

@bp.route('')
def index():
    db = get_db()
    books = db.execute(
        'SELECT * FROM book'
    ).fetchall()
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