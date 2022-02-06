import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
// 터미널에 npm i react-router-dom -S 명령어를 치고 엔터를 누르면, react router package가 설치된다. (package.json에서 react-router-dom이 dependancies에 추가된 것을 확인할 수 있음.)
import { Route, Switch } from 'react-router-dom'; // react does not request from the server, but it routes within the app that responds faster. 
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy'; // store.js 내 action 속성에 접근할 수 있는 hook.
// import { useStoreState } from 'easy-peasy'; // store.js 내 state 속성에 접근할 수 있는 hook.

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts); // useStoreActions()함수로 actions 배열 내 setPosts 속성을 이용하여 해당 함수를 실행하여 setPosts 변수에 저장한다. 

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts'); // useAxiosFetch() 함수로 헤딩 url에 존재하는 자원에 요청을 한다. 

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
          />
        </Route>
        <Route exact path="/post" component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;