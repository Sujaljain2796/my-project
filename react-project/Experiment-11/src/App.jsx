import React, { useState } from "react";
import BookList from "./BookList.jsx";
import "./App.css";

function App() {
  const [books] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Moby Dick", author: "Herman Melville", year: 1851 },
  ]);

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📚 Book Library</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Book list */}
      <BookList books={filteredBooks} />
    </div>
  );
}

export default App;
