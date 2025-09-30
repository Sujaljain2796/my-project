import React from "react";
import BookCard from "./BookCard.jsx";

function BookList({ books }) {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((b) => <BookCard key={b.id} book={b} />)
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
}

export default BookList;
