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
        self.height = 1  # Height of the node (initially 1)

class AVLTreeSort:
    def __init__(self, key):
        self.root = None
        self.key = key
    
    def insert(self, book):
        """Insert a book into the AVL tree and balance it."""
        if self.root is None:
            self.root = TreeNode(book)
        else:
            self.root = self._insert(self.root, book)
    
    def _insert(self, node, book):
        """Recursively insert a book into the AVL tree and balance it."""
        if node is None:
            return TreeNode(book)
        
        # Insert the book like a regular BST
        if book[self.key] < node.book[self.key]:
            node.left = self._insert(node.left, book)
        elif book[self.key] > node.book[self.key]:
            node.right = self._insert(node.right, book)
        else:
            return node  # Duplicate keys are not inserted

        # Update the height of the node
        node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))

        # Balance the node if needed
        balance = self._get_balance(node)
        
        # Left Heavy (Left-Left case)
        if balance > 1 and book[self.key] < node.left.book[self.key]:
            return self._rotate_right(node)
        
        # Right Heavy (Right-Right case)
        if balance < -1 and book[self.key] > node.right.book[self.key]:
            return self._rotate_left(node)
        
        # Left-Right case
        if balance > 1 and book[self.key] > node.left.book[self.key]:
            node.left = self._rotate_left(node.left)
            return self._rotate_right(node)
        
        # Right-Left case
        if balance < -1 and book[self.key] < node.right.book[self.key]:
            node.right = self._rotate_right(node.right)
            return self._rotate_left(node)

        return node
    
    def _rotate_left(self, z):
        """Left rotation to balance the tree."""
        y = z.right
        T2 = y.left

        # Perform rotation
        y.left = z
        z.right = T2

        # Update heights
        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

    def _rotate_right(self, z):
        """Right rotation to balance the tree."""
        y = z.left
        T3 = y.right

        # Perform rotation
        y.right = z
        z.left = T3

        # Update heights
        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

    def _get_height(self, node):
        """Get the height of a node."""
        if not node:
            return 0
        return node.height

    def _get_balance(self, node):
        """Get the balance factor of a node."""
        if not node:
            return 0
        return self._get_height(node.left) - self._get_height(node.right)

    def inorder(self):
        """Return a sorted list of books in-order."""
        books = []
        self._inorder(self.root, books)
        return books
    
    def _inorder(self, node, books):
        """Helper function to traverse the tree in-order."""
        if node:
            self._inorder(node.left, books)
            books.append(node.book)
            self._inorder(node.right, books)

def tree_sort(data, key):
    """Sort a list of books based on the given key."""
    tree = AVLTreeSort(key)
    
    for book in data:
        tree.insert(book)
    
    sorted_books = tree.inorder()
    
    return sorted_books