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

import { format } from 'date-fns'; // npm i date-fns -S

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
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter(post => ( // post를 하나씩 순회하면서
      ((post.body).toLowerCase()).includes(search.toLowerCase()) // post.body가 search를 포함하였는지 확인하고
      || ((post.title).toLowerCase()).includes(search.toLowerCase()) // post.title이 search를 포함하였는지 확인 한 후에, 둘 중 하나라도 search를 포함한 post가 있으면 해당 post는 filteredResults에 배열 객체로 담긴다. 
    ));
    setSearchResults(filteredResults.reverse()); // 배열 객체를 setSearchResult를 통해 저장한 후, 배열 순서를 reverse 시킨다. 
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1; // post 중 가장 마지막 post의 id에 1을 더하면 그 다음 post id가 된다. 
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody }; // NewPost.js에서 정의해준 postTitle과 postBody를 title과 body 속성에 저장해준다. 나머지 id와 datetime은 위에서 정의한 변수를 각 속성에 맞게 저장한다. 
    const allPosts = [ ...posts, newPost ]; // spread 기법으로 이전 post들을 모두 배열에 곱게 담아두고, newPost를 배열 마지막에 위치시킨다. setPosts를 통해 배열을 갈아치워야 하기 때문에 여기서 반드시 배열 기호 [] 를 사용하는 것을 잊으면 안된다. 
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    // new post를 추가하였으니, 나중에 또 새로운 post를 작성할 때 깨끗한 input 필드에 작성할 수 있도록 기존 내용을 비워준다. 
    history.push("/");
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList); // 삭제하고자 하는 post.id와 매칭되는 posts.post.id가 있으면 해당 post는 빠지고 나머지 post들만 setPosts 함수를 통해 posts를 재구성한다. 
    history.push("/"); // 삭제가 되었으니, 해당 post에서 머물면 안되므로 browser history에 접근하는 useHistory hook를 이용해 route 상에서 homepage로 이동하게 한다. push 괄호 안에 넣는 경로로 유저를 이동시킨다. 
  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav 
        search={search} setSearch={setSearch}
      />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
          {/* 결국에는 원래 posts를 받아서 UI에 뿌려주는 것이 아니라 그것을 한번 search filter로 가공하여 저장된 searchResults를 뿌려주는 셈이다. 아울러 속성명에 대해서 원래는 속성명과 state 상수명을 동일하게 하는 것을 원칙으로 해야 가독성이 좋지만, 상기의 경우 posts라는 속성이 Home > Feed > Post까지 파고 들어가기 때문에 여기서만 속성명을 searchResults와 다르게 정의하였다. posts를 받는 속성으로 전달받는 컴포넌트의 가독성 유지 차원에서 이와 같이 코딩함. */}
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
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
