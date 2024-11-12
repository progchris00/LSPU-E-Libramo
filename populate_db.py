import sqlite3
import random
import string
from faker import Faker

# Initialize Faker to generate random names, titles, etc.
fake = Faker()

# Database connection
conn = sqlite3.connect('./instance/app.sqlite')
cursor = conn.cursor()

# Function to create dummy data
def reverse_dummy_data(cursor, num_records=10000):
    letters = list(string.ascii_uppercase)[::-1]  # 'Z' to 'A'
    
    for i in range(num_records):
        author = fake.name()
        title_prefix = letters[i % len(letters)]  # Wrap around when we run out of letters
        title = f"{title_prefix} " + fake.sentence(nb_words=2).replace(".", "")  # Title starts with the chosen letter
        category = random.choice(['Fiction', 'Technology', 'Science', 'History', 'Psychology', 'Accounting'])
        is_borrowed = random.choice([0, 1])
        pages = random.randint(50, 1000)
        borrower_id = random.randint(1, 1000) if is_borrowed else None  # Assuming user table has IDs from 1 to 1000
        cover = fake.image_url(width=200, height=300)
        rating = round(random.uniform(1, 5), 1)
        description = fake.paragraph(nb_sentences=4, variable_nb_sentences=False)

        # Insert data into the table
        cursor.execute('''  
            INSERT INTO reverse_book (author, title, category, is_borrowed, pages, borrower_id, cover, rating, book_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (author, title, category, is_borrowed, pages, borrower_id, cover, rating, description))

def sorted_dummy_data(cursor, num_records=10000):
    letters = list(string.ascii_uppercase)  # 'A' to 'Z'
    
    for i in range(num_records):
        author = fake.name()
        title_prefix = letters[i % len(letters)]  # Wrap around when we run out of letters
        title = f"{title_prefix} " + fake.sentence(nb_words=2).replace(".", "")  # Title starts with the chosen letter
        category = random.choice(['Fiction', 'Technology', 'Science', 'History', 'Psychology', 'Accounting'])
        is_borrowed = random.choice([0, 1])
        pages = random.randint(50, 1000)
        borrower_id = random.randint(1, 1000) if is_borrowed else None  # Assuming user table has IDs from 1 to 1000
        cover = fake.image_url(width=200, height=300)
        rating = round(random.uniform(1, 5), 1)
        description = fake.paragraph(nb_sentences=4, variable_nb_sentences=False)

        # Insert data into the table
        cursor.execute('''  
            INSERT INTO sorted_book (author, title, category, is_borrowed, pages, borrower_id, cover, rating, book_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (author, title, category, is_borrowed, pages, borrower_id, cover, rating, description))

def random_dummy_data(cursor, num_records=10000):
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
            INSERT INTO random_book (author, title, category, is_borrowed, pages, borrower_id, cover, rating, book_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (author, title, category, is_borrowed, pages, borrower_id, cover, rating, description))

# Execute the function
reverse_dummy_data(cursor)
random_dummy_data(cursor)
sorted_dummy_data(cursor)

# Commit changes and close the connection
conn.commit()
conn.close()
