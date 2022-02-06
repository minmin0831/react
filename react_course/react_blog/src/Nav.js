import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
	const posts = useStoreState((state) => state.posts);
	const search = useStoreState((state) => state.search);
	const setSearch = useStoreActions((actions) => actions.setSearch);
	const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

	useEffect(() => {
		const filteredResults = posts.filter((post) => // post를 하나씩 순회하면서
			((post.body).toLowerCase()).includes(search.toLowerCase()) // post.body가 search를 포함하였는지 확인하고
			|| ((post.title).toLowerCase()).includes(search.toLowerCase())); // post.title이 search를 포함하였는지 확인 한 후에, 둘 중 하나라도 search를 포함한 post가 있으면 해당 post는 filteredResults에 배열 객체로 담긴다.
		setSearchResults(filteredResults.reverse()); // 배열 객체를 setSearchResult를 통해 저장한 후, 배열 순서를 reverse 시킨다.
	}, [posts, search, setSearchResults])

	return (
		<nav className="Nav">
			<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="search">Search Posts</label>
				<input
					id="search"
					type="text"
					placeholder="Search Posts"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/post">Post</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		</nav>
	)
}

export default Nav
