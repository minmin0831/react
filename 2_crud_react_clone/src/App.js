import './App.css';
import { Component } from "react";
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/CreateContent';
import Menu from './components/Menu';
import Control from './components/Control';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 4;
    this.state = {
      mode: "read",
      select_content_id: 1,
      welcome: {
        title: "Welcome, Home",
        desc: "This is Ghana Electronics Home."
      },
      subject: {
        title: "Ghana Electronics", sub: "We are the industry leader."
      },
      contents: [
        {id: 1, title: "Ghana Introduction", desc: "We manufacture electronics and export all over the world."},
        {id: 2, title: "Ghana Vision", desc: "Our vision is helping the world save energy"},
        {id: 3, title: "Ghana Products", desc: "All Ghana electronic products are energy-efficient."},
        {id: 4, title: "Ghana Contact", desc: "We are located in Seongnam, SouthKorea. Let us know if you have any query."},
      ],
    };
  }

  // // json 데이터 가져오기
  // componentDidMount() {
  //   fetch('data.json').then(function(result) {
  //       return result.json();
  //     }).then(function(json) {
  //       console.log(json);
  //       this.setState({contents: json})
  //     }.bind(this));
  // }

  // Read할 content 가져오기
  getReadContent() {
    for(let i=0; i<this.state.contents.length; i++) {
      let data = this.state.contents[i];
      if(data.id === this.state.select_content_id) {
        return data;
      }
    }
  }

  // Content 생성하고 Menu에 추가된 목록 클릭시 해당 내용을 읽어오는 메서드
  getContent() {
    let _title,
    _desc,
    _article = null;

    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read") {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === "create") {
      
      _article = (
        <CreateContent onSubmit={function (_title, _desc) {
          console.log(_title, _desc);
          this.max_content_id = this.max_content_id + 1;

          let _contents = Array.from(this.state.contents);
          _contents.push({
            id: this.max_content_id,
            title: _title,
            desc: _desc,
          });
          this.setState({
            contents: _contents,
            mode: "read",
            select_content_id: this.max_content_id
          });
        }.bind(this)}></CreateContent>
      );
    } else if(this.state.mode === "update") {
      console.log(this.state.mode);
      let _content = this.getReadContent();
      _article = (
        <UpdateContent
          data = {_content} // 가져온 content를 UpdateContent 속성값으로 저장.
          onSubmit = {function(_id, _title, _desc) {
            console.log(_id, _title, _desc);
            let _contents = Array.from(this.state.contents); // contents 통째로 가져오기.
            for(let i=0; i<_contents.length; i++) {
              if(_contents[i] === _id) { // onSubmit 으로 받은 _id와 통째 가져온 _contents 내 객체 중 id가 동일한 객체가 있다면, 그 객체에 onSubmit으로 받은 id, title, desc로 업데이트.
                _contents[i] = {id: _id, title: _title, desc: _desc};
                break;
              }
            }
            this.setState({contents: _contents, mode: "read"});
          }.bind(this)}
        ></UpdateContent>
        );
    } else if(this.state.mode === "delete") {

    }
    return _article;
  }

  render() {
    console.log("App Rendered");
    // 1) 각 컴포넌트에 대한 속성을 정의. (속성 함수 포함): 이러한 속성들은 컴포넌트 내에서 {this.props.속성명} 형식으로 접근하여 생성자 함수 내 값을 가져올 수 있다. 
    // 2) 생성자 함수 내 속성 값 저장 (속성 함수 내에서 생성자 함수 속성 저장 가능)
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode: "welcome"}); // Subject 컴포넌트에서는 이제 welcome 속성 객체의 데이터 접근 가능.
          }.bind(this)}
        ></Subject>
        <Menu data={this.state.contents} onChangePage={function(id) {
          this.setState({mode: "read", select_content_id: Number(id)}); // Menu 컴포넌트에서는 이제 contents("read" 모드에 대한 디폴트 속성 객체) 속성 객체의 데이터 접근 가능.
        }.bind(this)}></Menu>
        <Control onChangeMode={function(_mode) {
          console.log(this.state.mode);
          if(_mode === "delete") {
            if(window.confirm("really want to delete?")) {
              let _contents = Array.from(this.state.contents); // 배열을 복사
              for(let i=0; i < _contents.length; i++) {
                if(_contents[i].id === this.state.select_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
              }
              this.setState({mode: "welcome", contents: _contents});
              alert("The menu is deleted now.");
            }
          } else {
            this.setState({mode: _mode,});
            console.log(this.state.mode);
          }
        }.bind(this)}></Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;
