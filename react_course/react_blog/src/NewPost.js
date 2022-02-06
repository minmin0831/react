import { useHistory } from 'react-router-dom'; // Router (with useHistory hook in React router). useHistory allows to access the browser history
import { format } from 'date-fns'; // npm i date-fns -S
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
	const history = useHistory();

	const posts = useStoreState((state) => state.posts);
	const postTitle = useStoreState((state) => state.postTitle);
	const postBody = useStoreState((state) => state.postBody);

	const savePost = useStoreActions((actions) => actions.savePost);
	const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
	const setPostBody = useStoreActions((actions) => actions.setPostBody);


	const handleSubmit = (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1; // post 중 가장 마지막 post의 id에 1을 더하면 그 다음 post id가 된다. 
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const newPost = { id, title: postTitle, datetime, body: postBody }; // NewPost.js에서 정의해준 postTitle과 postBody를 title과 body 속성에 저장해준다. 나머지 id와 datetime은 위에서 정의한 변수를 각 속성에 맞게 저장한다.
		savePost(newPost);
		history.push('/');
	}

	return (
		<main className="NewPost">
			<h2>New Post</h2>
			<form className="newPostForm" onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Title:</label>
				<input
					id="postTitle"
					type="text"
					required
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
				/>
				<label htmlFor="postBody">Post:</label>
				<textarea
					id="postBody"
					required
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</main>
	)
}

export default NewPost