# Internet-Store
This is a web application with backend with Django framework and frontend with React.js running as a Internet Store.

## How to run project on local environment?

*Note: To start both installations you must be in the main directory each time. You can do it by:*
```sh
cd ..
```
*after each installation.*

### 1. Installing necessary dependencies front-end

Make sure you are in the main directory. 
1. From main dir move to ***shop-interface*** directory:
	```sh
	cd ./shop-interface
	```
2. Next install dependencies for ***React.js*** (Be sure you have Node.js on your local environment):
	```sh
	npm install
	```
3. You can run ***React.js*** app in develper mode by:
	```sh
	npm run dev
	```
4.  In default your dev server should run at this link:
	```sh
	http://127.0.0.1:5173/
	```

### 2. Installing necessary dependencies backend
Make sure you are in the main directory. 
1. From main dir move to ***server_side_app*** directory:
	```sh
	cd ./server_side_app
	```
2. Create a  ***virtual environment*** (Be sure you have Python on your local environment):
	```sh
	python3 -m venv venv
	```
3. Activate ***virtual environment***:
	- On Windows:
		```sh
		./venv/Scripts/activate
		```
	- On Linux/MacOS:
		```sh
		source ./venv/bin/activate
		```		
4. Next install dependencies for ***Django*** :
	```sh
	pip install Django
	```
5. Run development server by:
	```sh
	python3 manage.py runserver
	```
6.  In default your dev server should run at this link:
	```sh
	http://127.0.0.1:8000/
	```
