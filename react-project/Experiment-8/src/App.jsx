import React, { useState } from "react";

function Header() {
  return (
    <header style={{ background: "#f5f5f5", padding: "15px", textAlign: "center" }}>
      <h1 style={{ margin: 0 }}>Library Management</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#f5f5f5", padding: "10px", textAlign: "center", marginTop: "20px" }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} My Library. All rights reserved.</p>
    </footer>
  );
}

export default function LibraryManagement() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Filter books by search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Add a new book
  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  // Remove a book
  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        color: "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",   // Centers horizontally
        alignItems: "center",       // Centers vertically
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",   // keeps it neat
          minHeight: "100vh",  // full height
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          background: "#fff",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          {/* Search box */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #aaa",
            }}
          />

          {/* Add book form */}
          <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="New book title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: 1, padding: "8px", border: "1px solid #aaa" }}
            />
            <input
              type="text"
              placeholder="New book author"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              style={{ flex: 1, padding: "8px", border: "1px solid #aaa" }}
            />
            <button
              onClick={addBook}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                border: "1px solid #666",
                background: "#007bff", // Blue background
                color: "white",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              Add Book
            </button>
          </div>

          {/* Book list */}
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "3px",
                background: "#fff",
              }}
            >
              <span>
                <strong>{book.title}</strong> by {book.author}
              </span>
              <button
                onClick={() => removeBook(index)}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                  border: "1px solid #666",
                  background: "#dc3545", // Red background
                  color: "white",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}
