import LineItem from './LineItem';

const ItemList = ({ items, handleCheck, handleDelete }) => { // items는 지금 App > Content > ItemList까지 drilling한 속성이다. 이것은 또 다시 mapping 시킨 후에 하나씩 쪼개진 item (단수)이 LineItem.js로 넘어갈 예정이다.
  return (
    <ul>
      {items.map((item) => ( 
        <LineItem 
				key={item.id} // 여러 객체를 갖고 있는 객체를 mapping할 때는 쪼개진 객체마다 key 값을 부여해야 한다는 것을 기억해야 한다. 
				item={item}
				handleCheck={handleCheck}
				handleDelete={handleDelete}
				/>
      ))}
    </ul>
  );
};

export default ItemList;
