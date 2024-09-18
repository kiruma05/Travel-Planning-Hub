import { useState } from "react";
import "./style.css";

// const initialItems = [
//   { id: 1, description: "passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 5, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: false },
//   { id: 4, description: "mswakii", quantity: 2, packed: false },
//   { id: 5, description: "shuka", quantity: 2, packed: false },
//   { id: 6, description: "nguo", quantity: 4, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleTagleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onTagleItem={handleTagleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Kiruma`s Travel SetUp Applicati0n. 🛫</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h3>Items you need for your trip 👀🚌🛫</h3>
      <form>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (c, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter items..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <button>Add</button>
      </form>
    </div>
  );
}

function PackingList({ items, onDeleteItem, onTagleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={items.id}
            onDeleteItem={onDeleteItem}
            onTagleItem={onTagleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onTagleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onTagleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>✖️</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Your have x items for your trip and you have packed x%</em>
    </footer>
  );
}

export default App;
