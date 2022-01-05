import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {

	const inputRef = useRef();

	return (
		<form className="addForm" onSubmit={handleSubmit}>
			<label htmlFor="addItem">Add Item</label>
			<input 
				autoFocus
				ref={inputRef}
				id="addItem"
				type="text"
				placeholder="Add Item"
				required
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)} // e.target.value는 input 태그로 들어온 값을 가리킨다.
			/>
			<button
				type="submit"
				aria-label="Add Item"
				onClick={() => inputRef.current.focus()} // 추가 버튼 클릭 시 focus가 input 태그를 가리키도록 하는 코드이다. 
			>
				<FaPlus />
			</button>
		</form>
	)
}

export default AddItem
