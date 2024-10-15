from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
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