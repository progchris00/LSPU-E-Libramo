# Getting Started

1. Clone the repo
2. Create a python virtual environment

```bash
$ py -3 -m venv .venv
```

3. Activate the virtual envrionment

```bash
$ .venv\Scripts\activate
```

4. Install dependencies

```bash
$ pip install -r requirements.txt
```

5. Initialize sqlite database

```bash
$ flask --app app init-db
```

6. Populate database using a python script

```bash
$ python .\dummy_data_script.py
```
