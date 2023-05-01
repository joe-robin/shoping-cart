import { onValue, ref as firebaseRef, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { cartDB, pushToCart, database } from "./lib/firebaseConnect";

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [list, setList] = useState([{ key: "", value: "" }]);

  function handleAddClick() {
    const value = ref.current.value;
    if (value.length > 0) {
      pushToCart(value);
      ref.current.value = "";
    }
  }

  useEffect(() => {
    return onValue(cartDB, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const cartDbValues = Object.entries(snapshot.val());
        const cartContent = cartDbValues.map((item) => {
          const [key, value] = item;
          return {
            key,
            value,
          };
        });
        setList(cartContent);
      } else {
        setList([]);
      }
    });
  }, []);

  function handleListItemClick({ key: id }) {
    const exactRef = firebaseRef(database, `cart/${id}`);
    console.log(exactRef, id);
    remove(exactRef);
  }

  return (
    <div className="App container mx-auto flex max-w-md justify-center">
      <div className="flex w-fit flex-col items-center justify-center gap-5 border-2 border-black p-5 dark:border-white sm:p-20">
        {/* <img
          src="/cart.jpeg"
          loading="lazy"
          className="h-24 w-24 sm:h-52 sm:w-52"
        /> */}
        List
        <input
          ref={ref}
          placeholder="Enter the Item"
          className="h-12 w-full rounded-lg bg-gray-300 p-2 text-center font-medium text-gray-600 focus:outline-none"
        />
        <button
          className="h-12 w-full rounded-lg bg-green-500"
          onClick={handleAddClick}
        >
          Add
        </button>
        <ul className="flex w-full flex-wrap gap-4">
          {list.length === 0 && "No Items Yet"}
          {list.map((item, idx) => (
            <li
              className="my-auto flex h-12 items-center rounded-lg bg-white px-8 text-black"
              key={`${idx}${item.key}`}
              onClick={() => handleListItemClick(item)}
            >
              {/* {console.log(item)} */}
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
