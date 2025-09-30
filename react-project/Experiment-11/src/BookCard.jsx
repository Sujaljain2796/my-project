import React from "react";
import "./App.css";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
    </div>
  );
}

export default BookCard;
