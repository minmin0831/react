

const Button = ({ buttonText, reqType, setReqType }) => {
	return (
		<button 
			className={buttonText === reqType ? "selected" : null} // reqType이랑 buttonText(누른 버튼)가 users로 같다면 className을 selected로 설정. 같지 않다면, className은 null이다. 
			type="button"
			onClick={() => setReqType(buttonText)} // 버튼 클릭 시 reqType을 누른 버튼의 buttonText값으로 변경해준다. 
		>
			{buttonText} 
		</button> // 해당 버튼의 buttonText가 값으로 들어가 UI상에 노출된다. 
	)
}

export 

default Button
