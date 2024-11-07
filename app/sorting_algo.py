
def cocktail_sort(data, key):
    """
    Sorts the list of dictionary-like rows by the specified key using cocktail sort.
    
    Parameters:
    data (list): List of rows (each row is a dictionary-like object)
    key (str): The key to sort by (e.g., 'title' or 'author')
    
    Returns:
    list: Sorted list of rows
    """
    n = len(data)
    swapped = True
    start = 0
    end = n - 1
    
    while swapped:
        swapped = False
        
        for i in range(start, end):
            if data[i][key] > data[i + 1][key]:
                data[i], data[i + 1] = data[i + 1], data[i]
                swapped = True

        if not swapped:
            break

        end -= 1

        swapped = False
 
        for i in range(end, start, -1):
            if data[i][key] < data[i - 1][key]:
                data[i], data[i - 1] = data[i - 1], data[i]
                swapped = True
        start += 1
    
    return data

def insertion_sort(data, key):

    for i in range(1, len(data)):
        key_item = data[i]
        j = i - 1
        # Compare the specified key of the dictionaries
        while j >= 0 and key_item[key].lower() < data[j][key].lower():
            data[j + 1] = data[j]
            j -= 1
        data[j + 1] = key_item
    return data

class TreeNode:
    def __init__(self, book):
        self.book = book
        self.left = None
        self.right = None

class TreeSort:
    def __init__(self, key):
        self.root = None
        self.key = key
    
    def insert(self, book):
        if self.root is None:
            self.root = TreeNode(book)
        else:
            self._insert(self.root, book)
    
    def _insert(self, node, book):
        if book[self.key] < node.book[self.key]:
            if node.left is None:
                node.left = TreeNode(book)
            else:
                self._insert(node.left, book)
        else:
            if node.right is None:
                node.right = TreeNode(book)
            else:
                self._insert(node.right, book)
    
    def inorder(self):
        books = []
        self._inorder(self.root, books)
        return books
    
    def _inorder(self, node, books):
        if node:
            self._inorder(node.left, books)
            books.append(node.book)
            self._inorder(node.right, books)

def tree_sort_books(book_data, key):
    tree = TreeSort(key)
    
    for book in book_data:
        tree.insert(book)
    
    sorted_books = tree.inorder()
    
    return sorted_books
