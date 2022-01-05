import Button from "./Button"

const Form = ({ reqType, setReqType }) => {
	return (
		<form
			onSubmit={(e) => e.preventDefault()} // 버튼이 클릭될 때마다 페이지가 reload 되는 것을 방지
		>
			<Button 
				buttonText="users" // 각각의 buttonText에 값을 정한 이유는 Button 컴포넌트에 속성값으로 넘길 목적으로 만든 것이나, 최종적으로는 버튼 클릭 시 App.js에서 UI 상에 보여줄 db 자료를 설정하기 위한 URL 빌딩에 이용하려는 것이다. 
				reqType={reqType}
				setReqType={setReqType}
			/>
			<Button 
				buttonText="posts"
				reqType={reqType}
				setReqType={setReqType}
			/>
			<Button 
				buttonText="comments"
				reqType={reqType}
				setReqType={setReqType}
			/>
		</form>
	)
}

export default Form
