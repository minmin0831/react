const Header = ({ title }) => { // _rafce 라고 치면 다음과 같이 기본 컴포넌트 함수가 생성된다. 

	return (
		<header>
			<h1>{title}</h1>
		</header>
	)
}

Header.defaultProps = { // 
	title: "Default Title"
	// title을 App에서 내려받지 못하면 위의 defaultProps가 title 속성으로 default 값을 대입한다.
}

export default Header
