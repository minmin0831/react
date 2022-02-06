import { useState, useEffect } from "react";

// Import components
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  // LineItem.js에서 호출
  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  // LineItem.js에서 호출
  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  // handleSubmit() 함수에서 호출. 매개변수로 newItem을 받는다.
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  // AddItem.js에서 호출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  // DOM update가 끝난 후 실행할 함수. 여기서는 항상 변경된 items state를 체크하여 최신 변경 상태를 UI화면에 뿌려줄 수 있도록 한다.
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;

// make sure test and web-vitals packages are cleaned up by cli npm uninstall before releasing to github.

// 1. deploy to Netflify
// git init
// git add .
// git commit -m "first commit" 
// create a new github repository name
// copy the whole codes from "push an existing repository from the command line" and paste it on the terminal in VC code.
// once the project is added to github, log in Netflify to deploy it. 

// pros: environment variables, serveless functions, no extra scripts and dependacies added 

// 2. deploy to github packages
// npm i gh-pages -D 
// gh-pages added to devDependencies in package.json file.
// add "homepage" : "http://github_username.github.io/repository_name", in the curly bracket where project version is in the package.json file.
// add "predeploy": "npm run build", "deploy": "gh-pages -d build" in "scripts" curly bracket in the json file.
// git init
// git add .
// git commit -m "first commit"
// create a new github repository name
// copy the whole codes from "push an existing repository from the command line" and paste it on the terminal in VC code.
// once the project is added to github, log in Netflify to deploy it. 
// npm run deploy (this will absolutely deploy the react application on github page.)
// copy the homepage url and paste it on the url input field on Chrome. 