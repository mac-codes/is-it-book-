## Is It Book?

Is It Book? is a web application built using MERN stack and GraphQL that allows users to search and save books. The application fetches data from Google Books API and allows users to save the books they like in their personal reading list.

# Deployed app

https://search-and-love-books.herokuapp.com/

# Table of Contents

* Installation
* Usage
* Technologies
* Contributing
* License

# Installation

1. Clone the Repo to your local machine using the following command:

`git clone https://github.com/mac-codes/is-it-book-.git`

2. Install the necessary dependencies by navigating to the root directory of the project in your terminal and running the following command:

`npm install`

3. In order to run the application locally, you will need to have MongoDB installed and running on your machine. You can download MongoDB Community Server here.

4. Once you have MongoDB installed and running, create a `.env` file in the root directory of the project and add your MongoDB connection string in the following format:

`MONGODB_URI=<your MongoDB connection string>`

5. Run the following command to start the development server:

`npm start`

# Usage

After starting the development server, you can access the application by navigating to `http://localhost:3001` in your web browser.

You can search for books by typing in the search bar and clicking the "Search" button. The results will be displayed below the search bar, and you can click the "Save" button to add a book to your personal reading list.

To view your personal reading list, click the "See Your Books" button in the navigation bar. Here, you can view and delete books from your list.

# Technologies

Is It Book? was built using the following technologies:

* React.js
* Node.js
* Express.js
* GraphQL
* Apollo Server
* MongoDB
* Google Books API

# Contributing

If you would like to contribute to is it Book?, please submit a pull request with yout changes.

# License
Is it Book? is Licensed under the MIT license.

# References

`https://github.com/jcgom3/Challenge-21-MERN-Book-Search-Engine`
