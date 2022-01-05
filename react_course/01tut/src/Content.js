import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
	
	
	return (
		<>
			{items.length ? ( // 태그를 조건문에 담으려면 소괄호()를 사용한다. 
				<ItemList 
					items={items}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
				/> // ul 태그로 잡았던 내용을 ItemList로 옮긴 후, Content.js에는 ItemList 컴포넌트를 import하여 가져온다. 또한 원래 Content.js에 있을 때 갖고 있던 속성을 모두 ItemList로 옮겼기 때문에 App.js에서 끌어왔던 속성들을 ItemList 태그 내 속성 정의를 다시 해주어야 한다. 
			) : (
				<p style={{ marginTop: '2rem' }}>Your list is empty.</p>
			)
		}
		</>
	)
}

export default Content
