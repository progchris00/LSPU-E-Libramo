import sqlite3
import random
from faker import Faker

# Initialize Faker to generate random names, titles, etc.
fake = Faker()

# Database connection
conn = sqlite3.connect('./instance/app.sqlite')
cursor = conn.cursor()

# Function to create dummy data
def create_dummy_books(cursor, num_records=5000):
    for _ in range(num_records):
        author = fake.name()
        title = fake.sentence(nb_words=3).replace(".","")
        category = random.choice(['Fiction', 'Technology', 'Science', 'History', 'Psychology', 'Accounting'])
        is_borrowed = random.choice([0, 1])
        pages = random.randint(50, 1000)
        borrower_id = random.randint(1, 1000) if is_borrowed else None  # Assuming user table has IDs from 1 to 1000
        cover = fake.image_url(width=200, height=300)
        rating = round(random.uniform(1, 5), 1)
        description = fake.paragraph(nb_sentences=4, variable_nb_sentences=False)

        # Insert data into the table
        cursor.execute('''
            INSERT INTO book (author, title, category, is_borrowed, pages, borrower_id, cover, rating, book_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (author, title, category, is_borrowed, pages, borrower_id, cover, rating, description))

# Execute the function
create_dummy_books(cursor)

# Commit changes and close the connection
conn.commit()
conn.close()
