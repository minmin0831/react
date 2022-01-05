// 터미널에 npm i react-router-dom -S 명령어를 치고 엔터를 누르면, react router package가 설치된다. (package.json에서 react-router-dom이 dependancies에 추가된 것을 확인할 수 있음.)

// Main Components
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

// Route Components
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

// Router (with useHistory hook in React router). useHistory allows to access the browser history
//import { BrowserRouter, Routes, Route, Link, useHistory } from "react-router-dom"; // version 6
import { Route, Switch, useHistory } from 'react-router-dom'; // version 5
// react does not request from the server, but it routes within the app that responds faster.

// hooks
import { useState, useEffect } from "react";

//import { format } from 'date-fns'; // npm i date-fns

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav 
        search={search} setSearch={setSearch}
      />
      <Switch>
        <Route path="/">
          <Home 
            posts={posts}
          />
        </Route>
        <Route path="/post">
          <NewPost/>
        </Route>
        <Route path="/post/:id">
          <PostPage/>
        </Route>

        <Route path="/about" component={About} />
        <Route path="*" component={Missing}/>
        {/* 매칭되지 않는 페이지는 모두 Missing 페이지로 이동한다. */}
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
