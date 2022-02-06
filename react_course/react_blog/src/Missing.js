import { Link } from 'react-router-dom';

const Missing = () => {
	return (
		<main className='Missing'>
			<h2>Page Not Found</h2>
			<p>Well, that's disappointing.</p>
			<p>
				<Link to='/'>Visit Our Homepage</Link>
			</p>
		</main>
	)
}

export default Missing

// Missing page에서 다시 홈으로 돌아가는 버튼을 누르면 App이 reload되면서 이전에 페이지 삭제 또는 생성했던 것들이 취소되면서 초기 json 데이터로 돌아간다. 