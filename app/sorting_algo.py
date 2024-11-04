# from binarytree import Node  # Import the Node class from the binarytree module to represent nodes in the tree.
# import array as arr  # Import the array module for creating efficient array data structures.
# from memory_profiler import memory_usage  # Import memory_usage to monitor memory consumption of functions.
# import time  # Import time module to measure execution time.

# Define a class for tree nodes.
class TreeNode:
    def __init__(self, key):  # Constructor for initializing a node with a key.
        self.left = None  # Initialize the left child to None.
        self.right = None  # Initialize the right child to None.
        self.value = key  # Assign the key to the node's value.

# Function to build a binary search tree (BST) from an array.
def build_bst(array):
    root = None  # Start with an empty tree (root is None).
    for value in array:  # Iterate through each value in the array.
        root = insert_bst(root, value)  # Insert each value into the BST.
    return root  # Return the root of the constructed BST.

# Function to insert a key into the BST.
def insert_bst(root, key):
    if not root:  # If the current root is None, create a new Node.
        return Node(key)  # Create and return a new Node with the key.
    if key < root.value:  # If the key is less than the current node's value...
        root.left = insert_bst(root.left, key)  # Recur down the left subtree.
    else:  # Otherwise...
        root.right = insert_bst(root.right, key)  # Recur down the right subtree.
    return root  # Return the unchanged root node.

# Function to sort an array using a BST and return the sorted array.
def tree_sort_bst(array):
    if not array:  # If the input array is empty...
        return arr.array('i', [])  # Return an empty array.
    root = build_bst(array)  # Build the BST from the array.
    sorted_list = arr.array('i', [])  # Create an empty array to hold sorted values.
    inorder_traversal(root, sorted_list)  # Perform in-order traversal to populate the sorted array.
    return root, sorted_list  # Return the root of the BST and the sorted list.

# Function for in-order traversal of the BST.
def inorder_traversal(node, sorted_list):
    if node:  # If the current node is not None...
        inorder_traversal(node.left, sorted_list)  # Recur on the left child.
        sorted_list.append(node.value)  # Append the current node's value to the sorted list.
        inorder_traversal(node.right, sorted_list)  # Recur on the right child.

# Function to print the in-order traversal of the BST.
def print_in_order_traversal(root, result, depth=0):
    if root:  # If the current root is not None...
        print_in_order_traversal(root.left, result, depth + 1)  # Recur on the left child.
        print(f"Current Node {root.value} - Result: {result.tolist() + [root.value]}")  # Print the current node and the result.
        result.append(root.value)  # Append the current node's value to the result.
        print_in_order_traversal(root.right, result, depth + 1)  # Recur on the right child.

# Function to measure the time and memory used by a sorting function.
def measure_time_and_memory(sort_function, array):
    start_time = time.time()  # Record the start time.
    mem_usage = memory_usage((sort_function, (array,)))  # Measure memory usage during the function call.
    end_time = time.time()  # Record the end time.
    return sort_function(array), end_time - start_time, max(mem_usage) - min(mem_usage)  # Return function output, execution time, and memory usage.

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

def odd_even_sort(arr, n):

    is_sorted = 0
    while is_sorted == 0:
        is_sorted = 1
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = 0

        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = 0

    return

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        print(f"Array after inserting element at position {i}: {arr}")

def stoogeSort(arr, start, end):
    if start >= end:
        return
    if arr[start] > arr[end]:
        temp = arr[start]
        arr[start] = arr[end]
        arr[end] = temp
        print(f"Swapped elements at positions {start} and {end}: {arr}")
    if end - start + 1 > 2:
        mid = (end - start + 1) // 3
        print(f"Sorting first 2/3: {arr[start:end-mid+1]}")

        stoogeSort(arr, start, end - mid)
        print(f"After sorting first 2/3: {arr}")

        print(f"Sorting last 2/3: {arr[start+mid:end+1]}")

        stoogeSort(arr, start + mid, end)
        print(f"After sorting last 2/3: {arr}")

        print(f"Sorting first 2/3 again: {arr[start:end-mid+1]}")

        stoogeSort(arr, start, end - mid)
        print(f"After sorting first 2/3 again: {arr}")

    return arr
