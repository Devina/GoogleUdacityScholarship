import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

function ViewBooks(props) {
  const { onShelfChange } = props;
  const currentlyReading = props.books.filter(book => book.shelf === "currentlyReading");
  const wantToRead = props.books.filter(book => book.shelf === "wantToRead");
  const read = props.books.filter(book => book.shelf === "read");

  return (
    <div className="view-books">
      <div className="view-books-content">
        <div>
          <BookShelf
            bookshelfTitle="Currently Reading"
            bookshelfBooks={currentlyReading}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            bookshelfTitle="Want to Read"
            bookshelfBooks={wantToRead}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            bookshelfTitle="Read"
            bookshelfBooks={read}
            onShelfChange={onShelfChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ViewBooks;
