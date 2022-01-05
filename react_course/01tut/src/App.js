// 서버에 올려서 data 보기: npx json-server -p 3500 -w data/db.json
/*
  Resources
  http://localhost:3500/items

  Home
  http://localhost:3500
*/

// Components
import Header from "./Header";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import apiRequest from "./apiRequest";

function App() {
  /*
	const [items, setItems] = useState([
    // setItems 속성은 App.js 내에서 함수 평가식에서면 사용되기 때문에, 굳히 Content.js로 drilling해줄 필요는 없다.
    {
      id: 1,
      checked: false,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Dried Mango from the Phillippines",
    },
    {
      id: 3,
      checked: false,
      item: "Seedless Watermelon",
    },
  ]);
	*/

  // fetched data가 있는 url. 변경될 여지가 없기 때문에 상수로 저장한다.
  const API_URL = "http://localhost:3500/items";

  // API가 없기 때문에 useState에 JSON 객체를 넣어 프로그래밍하기
  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []); // 처음 앱을 켠 유저는 list 목록이 없기 때문에 초기값을 빈 array를 갖도록 한다.

  // API 데이터가 있기 때문에 더 이상 localStorage에 저장된 데이터를 사용하지 않는다.
  // localStorage 데이터를 사용하지 않고 json 파일 데이터를 사용할 경우
  const [items, setItems] = useState([]);

  // const [items, setItems] = useState([]);
  // dev tool > Component > App 을 보면 hooks 에서 1 State에 저장된 값이 보인다. 이 배열 값들은 App() 컴포넌트 내에서 생성한 배열값을 가져온 것이다.
  // useState에 넣었던 setItems() 함수를 아래 useEffect로 옮겨놓고 대신에 빈 배열[]을 저장한다.

  /*앱이 기동된 상태에서 (현재 shoppinglist 배열에 값이 저장된 상태에서) 임의 state를 주석처리하고 다음과 같이 현재 application에 저장된 shoppinglist를 파싱하여 state에 저장할 수도 있다. 
	이 경우 페이지 reloading을 수행하더라도 state 데이터가 손상되지 않는다. 현재 저장 상태를 계속 유지한다. */
  const [newItem, setNewItem] = useState(""); // hooks에서 2 State에 입력된 값이 보인다.
  const [search, setSearch] = useState(""); // hooks에서 3 State에 입력된 값이 보인다.
  // SearchItem.js에서 input 태그로 받은 값을 search state 에 저장한다. 해당 state에 저장된 값은 Content 태그 속성에서 UI에 뿌려줄 Items 데이터를 필터링하는데 사용된다.

  // 데이터를 가져오는데 만약에 에러가 발생하면 fetchError 라는 속성에 저장된다. 
  const [fetchError, setFetchError] = useState(null);

  // 데이터를 가져오는데 2초 간의 지연 시간을 두어 데이터를 가지고 있다는 것을 유저가 인지할 수 있도록 한다. 실제 데이터를 가져오는데 시간이 걸리기 때문에 그 시간을 메우기 위한 기능을 UI 상에 표현한다. 
  const [isLoading, setIsLoading] = useState(true);

  //useEffect(() => { console.log("load time") });
  // input 태그에 값이 입력될 때마다 상태가 변경되는데 이것을 state에 바로 반영시켜버린다. re-rendering을 계속 한다.

  console.log("before useEffect");

  
  

  /* 
  useEffect(() => { 
    console.log("inside useEffect: updating items state");
    setItems(JSON.parse(localStorage.getItem('shoppinglist'))); 
  }, []); 
  */
  // 배열 자리에 items를 넣을 경우 반드시 setItems 함수를 함께 사요하면 안된다. 이는 endless loop을 일으킨다.
  // 위와 달리 useEffect에 Array dependacy를 부여하면, load 될 때만 state에 반영시킨다. useEffect가 값을 보는 것이 아닌 array를 보고 있기 때문에, array 상에 값이 변경되어야만 useEffect함수를 수행한다.

  // API가 없기 때문에 useState에 JSON 객체를 넣어 프로그래밍하기
  /*
  useEffect(() => {
    localStorage.setItem("shoppinglist", JSON.stringify(items));
  }, [items])
  */

  // localStorage 데이터를 사용하지 않고 json 파일 데이터를 사용할 경우
  useEffect(() => {

    // 해당 코드는 다른 파일로 이전되지 않기 때문에 데이터를 처음 가져와 로딩할 때만 동작하는 코드이다. 반복되지 않는다. 
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data.");
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // 2초 후에 items를 뿌려준다. 데이터가 로딩되고 있다는 것을 보여주기 위한 기능이다. 
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  console.log("after useEffect");

  /*
  before, inside, afterUseEffect를 콘솔에 찍으면, before > after > inside 순으로 찍히는 것을 확인할 수 있다. 
  모든 함수가 rendering 한 후, useEffect가 렌더링 된다는 사실을 알 수 있으며, 
  또한 searchbox 내 값 입력 시 before, afterUseEffect만 콘솔에 찍히는 것도 확인할 수 있다. 
  이는 useEffect에서 정의한 array state에 변경된 사항이 없기 때문에 useEffect를 수행하지 않기 때문이다. 
  */

  /*
  const setAndSaveItems = (newItems) => {
    // item의 state를 변경하고 localStorage에 저장하는 코드가 반복되기 때문에 따로 빼서 setAndSaveItems 라는 함수를 만들어 필요한 곳에서 호출하도록 한다.
    setItems(newItems);
    //localStorage.setItem("shoppinglist", JSON.stringify(newItems)); // 해당 라인을 useEffect로 옮긴다. 
  };
  */
  // localStorage.setItem (localStorage에 배열 객체 저장) 함수를 useEffect로 옮겨 놓았기 때문에 setAndSaveItems 함수는 필요 없어졌다.

  // handleSubmit() 함수에서 호출 (newItem을 매개변수로 받는 함수이다.)
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // items 배열에 item이 있다면, 해당 배열 마지막 위치값에 1을 더하여 앞으로 들어갈 배열 위치값을 id에 저장한다.
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    //setAndSaveItems(listItems);
    setItems(listItems); // setAndSaveItems 함수가 더 이상 필요하지 않기 때문에 setItems 함수를 바로 호출하여 리스트 변경 시 자동 rerendering 될 수 있도록 한다.

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result); // 304 응답을 보낸다. (괜찮음..) 200 range 안에 들어오는 것이 가장 안전함. 
    // 일단은 newItem을 받아 처리하는데, 201 응답을 받기 때문에 문제는 없다. 
    // 아울러 data.db.json 파일을 열어보면 newItem도 정상적으로 저장되는 것을 볼 수 있다. 
  };

  // LineItem.js에서 호출하는 함수
  const handleCheck = async (id) => {
    console.log(`key : ${id}`);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    //setAndSaveItems(listItems);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id); // check한 item 하나만 필터링되어 myItem 객체 배열에 저장된다. 
    const updateOptions = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked }) // myItem 객체 배열에는 객체 하나가 0번째 위치하기 때문에 checked state 변경을 위해서는 myItem[0] 라고 표현해야 어느 state를 저장할 것인지 찾을 수 있다. 
    }

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if(result) setFetchError(result); // 200 응답을 보낸다. 
    // 변경된 check state를 받아 json 파일에 반영. 
  };

  // LineItem.js에서 호출하는 함수
  const handleDelete = async (id) => {
    console.log(id);
    const listItems = items.filter((item) => item.id !== id); // 저장된 데이터의 id와 매개변수로 들어온, 즉 삭제하려고 선택한 id 간의 id값을 비교하여 같지 않으면 listItems에 저장하지 않음으로써 삭제된 것과 같은 효과를 낼 수 있도록 한다.
    //setAndSaveItems(listItems);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result); 
  };

  // AddItem.js에서 호출하는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 이 함수를 호출한 이유는 이 함수가 없을 경우 form 태그에 내재된 기능, 즉 값을 입력하고 엔터를 치면 html 태그를 reload 시키는 기능이 동작되기 때문이다. 이것을 막고 개발자가 만든 함수를 실행시키기 위해서는 preventDefault() 함수를 선행적으로 호출해야만 한다.
    if (!newItem) return; // newItem 인풋 태그로 들어온 값이 없다면 return하고 있다면 onSubmit 함수 호출 시 setNewItem() 함수를 이용하여 newItem의 값을 비운다. 이로 인해, input 태그에 값을 입력한 후 submit하면 값이 input태그에 잔존하지 않고 사라진다.
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
    console.log(newItem);
    console.log("submitted");
  };

  return (
    <div className="App">
      <Header />
      {/* <Header title="Grocery List"/>  대신에 Header 컴포넌트에서 정의한 Header.defaultProps 객체로 props 를 정의하여 사용할 수도 있다. 다만, Header 태그 내에서 정의한 속성이 있으면 해당 속성이 defualt 속성을 override 한다. */}
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )} // search state에 저장된 값을 이용하여 필터링을 거친 후에 UI에 뿌려줄 데이터를 바꾼다.
          handleCheck={handleCheck}
          handleDelete={handleDelete} // Content.js에 있던 props들(items, setItems, handleCheck, handleDelete)을 모두 App.js로 옮긴 후, 이것을 모두 Content 태그 내 속성으로 Content 컴포넌트로 전달해버린다.
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
