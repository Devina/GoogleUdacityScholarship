import React from "react";
import { Route } from "react-router-dom";
import SearchBooks from "./containers/SearchBooks";
import ViewBooks from "./containers/ViewBooks";
import * as BooksAPI from "./utils/BooksAPI";
import "./styles/App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  onShelfChange = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }));
    BooksAPI.update(book, shelf);
  };

  render() {
    return (
      <div className="app">
        <Route path="/"
          exact render={() => (
            <div>
              <div className="view-books-title">
                <h1>MyReads</h1>
              </div>
              <ViewBooks
                books={this.state.books}
                onShelfChange={this.onShelfChange}
              />
            </div>
          )}
        />

        <Route path="/search"
          render={({ history }) => (
            <SearchBooks
              onShelfChange={this.onShelfChange}
              history={history}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
