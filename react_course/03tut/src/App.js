import { useState, useEffect } from 'react';

// components
import Form from './Form';
import List from './List';
import Table from './Table';

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState('users');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch(err) {
        console.log(err);
      }
    }

    fetchItems();

  }, [reqType]); 
  // reqType이 변경될 때마다 useEffect가 실행된다. 
  
  return (
    <div className="App">
      <Form // Form 컴포넌트는 세 개의 Button 컴포넌트들로 이루어진다. 
        reqType={reqType}
        setReqType={setReqType} 
      />
      {/*<List 
        items={items}
      />*/}
      <Table 
        items={items}
      />
    </div>
  );
}

export default App;
