import { FaTrashAlt } from "react-icons/fa"; // npm i react-icons --save

const LineItem = ({ item, handleCheck, handleDelete }) => { // item은 App > Content > ItemList (mapping items) > LineItem으로 넘어온 속성이다. 다만 
  return (
    <li className="item" key={item.id}>
      {/* li 태그의 key는 삭제해도 무방하다. 이유는 앞서 ItemList에서 mapping할 때 key 값을 이미 부여하였기 때문이다. ItemList에 있을 때는 태그 속성으로 들어가야 하기 때문에 코딩하였지만, LineItem 컴포넌트를 별도로 만들어 ItemList.js 내 선언한 LineItem 속성으로 key를 정의한 이상 해당 키는 더 이상 필요하지 않다. */}
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)} 
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)} // 여기서 handleCheck를 통해 checked의 값을 바꾸고 나중에 App.js에서 setItems로 items state가 변경 저장되면서 다시 리렌더링이 일어나면, 그 때 자연스럽게 LineItem도 rerendering이 일어나는 것이므로 변경된 checked 상태값을 가지고 UI 상에 해당 리스트에 줄을 그을지 말지 결정할 수 있다.
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)} // 클릭 시 handleDelete를 호출하는데, 매개변수 item.id를 통해 삭제 대상을 구분할 수 있다. 매개 변수를 전달하려면, handleDelete 함수만 호출하면 안되고 매개변수를 보내줘야 하기 때문에 익명함수를 선언하고 handleDelete() 함수에 매개변수 item.id를 넣어 호출한다.
        role="button"
        tabIndex="0"
				aria-label={`Delete ${item.item}`}
      />
    </li>
  ); // 최종적으로 handleCheck, handleDelete 함수를 호출하는 위치는 LineItem.js 파일이다. 
};

export default LineItem;
