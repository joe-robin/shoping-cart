import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseURL = import.meta.env.VITE_DB_URL;

console.log(firebaseURL, import.meta.env.VITE_DB_URL);
if (!firebaseURL) throw "No FireBase URL Found";

const appConfig = {
  databaseURL: firebaseURL,
};

function initialize() {
  let catched = window.fireBaseConnection;
  if (!catched) {
    catched = initializeApp(appConfig);
  }
  return catched;
}

function pushToDB(db, value) {
  push(db, value);
}

const app = initialize();
const database = getDatabase(app);
const cartDB = ref(database, "cart");
const booksDB = ref(database, "books");

function pushToCart(value) {
  push(cartDB, value);
}

export { cartDB, pushToCart, database };
