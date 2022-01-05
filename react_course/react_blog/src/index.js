import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // version 5

// import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 해당 패키지를 importing 시켜야 한다. version 6 

/*
ReactDOM.render( // react-router-dom version 6부터는 아래와 같이 코드 방식이 변경되었다. 본 튜토리얼은 version 5를 사용하여 만든 것이다. 
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} /> 
    </Routes> 
  </BrowserRouter>,
  document.getElementById('root')
);
*/

// path="/"는 root path를 말하는 것이다. html에서 href="#"와 같은 것이다. 
// <Route /> 컴포넌트 내에서 App 컴포넌트를 root path로 지정한다. 
// 참고: https://stackoverflow.com/questions/69832748/error-error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element
// version 6부터는 Parent Route의 path에 / 기호를 넣으면 안된다. chile 페이지로 깊이 들어갈 경우 부모 페이지와 매칭되지 않아 렌더링이 안될 수 있으니, catch all 기호 * 로 코드를 변경해야 한다. 
/* 에러 내용: 
index.tsx:25 You rendered descendant <Routes> (or called `useRoutes()`) at "/" (under <Route path="/">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="/"> to <Route path="*">.

React Version Downgrade: npm install react-router-dom@5.2.0
*/

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);