from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from app.auth import login_required
from app.db import get_db

bp = Blueprint('blog', __name__, url_prefix='/book')

@bp.route('/view', methods=('GET', 'POST'))
def view():
    db = get_db()
    books = db.execute(
        'SELECT * FROM book'
    ).fetchall()
    return render_template('books/view.html', books=books)