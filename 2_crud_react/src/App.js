import React from "react";
import "./App.css";
import { Component } from "react";
import Subject from "./components/Subject";
import Menu from "./components/Menu";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 4; // 현재 contents의 최대 개수
    this.state = {
      mode: "read",

      select_content_id: 1,

      welcome: {
        title: "Welcome to the Silent Sea website.",
        desc: "This is a fan-page.",
      },

      subject: {
        title: "The Silent Sea",
        sub: "A ciritical mission to the aerospace base on the moon leads to mysterious incidents.",
      },

      contents: [
        {
          id: 1,
          title: "Background",
          desc: "Background: A ciritical mission to the aerospace base on the moon leads to a mysterious incidents. On arrival, the special mission team found out all the crews gone at the base.",
        },
        {
          id: 2,
          title: "Plot",
          desc: "Plot: A ciritical mission to the aerospace base on the moon leads to a mysterious incidents. On arrival, the special mission team found out all the crews gone at the base.",
        },
        {
          id: 3,
          title: "Merch",
          desc: "Merch: A ciritical mission to the aerospace base on the moon leads to a mysterious incidents. On arrival, the special mission team found out all the crews gone at the base.",
        },
        {
          id: 4,
          title: "Fund for the Next Season",
          desc: "Fund for the Next Season: A ciritical mission to the aerospace base on the moon leads to a mysterious incidents. On arrival, the special mission team found out all the crews gone at the base.",
        },
      ],
    };
  }

  componentDidMount() {
    fetch('data.json').then(function(result) {
        return result.json();
      }).then(function(json) {
        console.log(json);
        this.setState({contents: json})
      }.bind(this));
  }

  //
  getReadContent() {
    for (let i = 0; i < this.state.contents.length; i++) {
      let data = this.state.contents[i];
      if (data.id === this.state.select_content_id) {
        return data;
      }
    }
  }

  // Content를 생성하고 Menu에 추가된 목록을 클릭하였을 때 보여주는 메서드.
  getContent() {
    let _title,
      _desc,
      _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;

    } else if (this.state.mode === "read") {

      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;

    } else if (this.state.mode === "create") {

      // 생성하기 눌렀을 때,
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // CreateContent에서 제출 버튼을 누르면, submit 형식으로 동작. submit 이라는 행위를 받는 함수는 onSubmit()이다.
            // CreateContent 내 form 태그는 해당 onSubmit 함수를 호출하여 submit 할 때 input, textarea에 name이 각각 title, desc로 지정된 태그에 들어온 값을 파라미터로 전달한다.
            console.log(_title, _desc);
            this.max_content_id = this.max_content_id + 1; // 마지막에 빈 배열을 추가할 수 있도록 max id를 1개 늘려준다.
            /*let _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc
            });*/
            // 데이터 추가 시, 원본을 저장하고 배열을 복사하여 원본과 복사본을 유지한다. console.log로 확인하면 newProps.data와 this.props.data의 배열 정보가 동일하지 않은 것을 확인할 수 있다.

            let _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            // concat 함수를 대체하는 방법.
            // 위와 같은 방법으로 from_contents에 복사본을 하나 만들고, 해당 복사본 배열에 push() 함수를 이용하여 신규 컨텐츠를 밀어 넣어준다.

            /*this.state.contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });*/
            // 데이터 추가 시, 원본을 저장하지 않고 그 위에 덮어 씌운다. console.log로 확인하면 newProps.data와 this.props.data의 배열 정보가 동일한 것을 확인할 수 있다.
            this.setState({
              contents: _contents, // concat 또는 Array.from() 배열 복사 방식 사용할 때 다음과 같이 저장.
              mode: "read",
              select_content_id: this.max_content_id
              // contents: this.state.contents
            });
          }.bind(this)}
        ></CreateContent>
      );

    } else if (this.state.mode === "update") {

      let _content = this.getReadContent(); // getReadContent()를 통해 현재 노출된 content 배열의 데이터값들을 _content에 객체로 저장. 즉, 업데이트해야할 내용이 날아온다.
      _article = (
        <UpdateContent
          data={_content} // _content에 있는 데이터값들을 UpdataContent 컴포넌트에 data로 저장.
          onSubmit={function (_id, _title, _desc) {
            console.log(_id, _title, _desc);
            let _contents = Array.from(this.state.contents);
            for(let i=0; i < _contents.length; i++) {
              if(_contents[i].id === _id) {
                _contents[i] = {id: _id, title: _title, desc: _desc};
                break;
              }
            }
            this.setState({
              contents: _contents, // 수정 내용을 업데이트한다. 
              mode: "read" // 업데이트 후에는 mode를 read로 바꿔서 해당 게시물을 볼 수 있게 한다. 
            });
          }.bind(this)}
        ></UpdateContent>
      );
    } else if (this.state.mode === "delete") {

    }
    return _article;
  }

  render() {
    console.log("App Rendered");

    return (
      <div className="App">
        {
          <Subject
            title={this.state.subject.title}
            sub={this.state.subject.sub}
            onChangePage={function () {
              this.setState({ mode: "welcome" });
            }.bind(this)}
          ></Subject>
        }

        <Menu
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              select_content_id: Number(id),
            });
          }.bind(this)}
        ></Menu>

        <Control
          onChangeMode={function (_mode) {
            if(_mode === "delete") {
              if(window.confirm("정말로 삭제하시겠습니까?")) { // yes를 누르면 삭제
                let _contents = Array.from(this.state.contents);
                for(let i=0; i < _contents.length; i++) {
                  if(_contents[i].id === this.state.select_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents
                });

                let delete_title;
                for(let i=0; i < _contents.length; i++) {
                  if(_contents[i].id === this.state.select_content_id) {
                    delete_title = _contents[i].title;
                    break;
                  }
                }
                alert(delete_title, "(이)가 삭제되었습니다.");

              } // no를 누르면 삭제 안함. 삭제 안하기 때문에 따로 else 구문을 만들지 않는다. 

            } else { // if(_mode === "delete") {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>

        {this.getContent()}
      </div>
    );
    // getContent 함수를 호출하여 _article을 반환한다.
    // _article: ReadContent와 CreateContent 컴포넌트를 갖고 이것을 여기에 반환.
  }
}

export default App;
