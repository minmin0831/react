import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Header = ({ title }) => {
	const { width } = useWindowSize();

	return (
		<header className="Header">
			<h1>{title}</h1>
			{width < 768 ? <FaMobileAlt />
				: width < 992 ? <FaTabletAlt />
					: <FaLaptop />}
		</header>
	)
}

export default Header

// header에서 width 값을 모니터링 하고 있다가 width가 해당 각 조건에 부합하면 조건문을 수행하여 조건에 맞는 아이콘을 보여준다. 
