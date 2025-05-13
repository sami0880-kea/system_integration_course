import { books, authors } from "./database/data.js";
import pubsub from "./database/pubsub.js";

export const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === Number(id)),
    authors: () => authors,
    author: (_, { id }) => authors.find(author => author.id === Number(id)),
  },

  Mutation: {
    createBook: (_, { authorId, title, releaseYear }) => {
      const authorExists = authors.find(
        author => author.id === Number(authorId)
      );
      if (!authorExists) {
        throw new Error(`Author with ID ${authorId} not found`);
      }

      const newBook = {
        id: String(books.length + 1),
        title,
        releaseYear,
        authorId,
      };

      books.push(newBook);

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },

    updateBook: (_, { id, authorId, title, releaseYear }) => {
      const bookIndex = books.findIndex(book => book.id === id);

      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }

      if (authorId) {
        const authorExists = authors.find(author => author.id === authorId);
        if (!authorExists) {
          throw new Error(`Author with ID ${authorId} not found`);
        }
      }

      const updatedBook = {
        ...books[bookIndex],
        ...(title && { title }),
        ...(releaseYear && { releaseYear }),
        ...(authorId && { authorId }),
      };

      books[bookIndex] = updatedBook;

      return updatedBook;
    },

    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);

      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }

      books.splice(bookIndex, 1);

      return { message: `Book with ID ${id} deleted successfully` };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },

  Book: {
    author: book => authors.find(author => author.id === Number(book.authorId)),
  },

  Author: {
    books: author => books.filter(book => book.authorId === Number(author.id)),
  },
};
