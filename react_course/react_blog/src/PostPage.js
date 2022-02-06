import { useParams, Link, useHistory } from "react-router-dom"; // react router hooks
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
	const { id } = useParams(); // App.js에서 PostPage에 들어갈 매개변수로 id라고 정의하였기 때문에 여기서도 변수명을 id로 정의힌다.
	const history = useHistory();
	const deletePost = useStoreActions((actions) => actions.deletePost);
	const getPostById = useStoreState((state) => state.getPostById);
	const post = getPostById(id);

	const handleDelete = (id) => {
		deletePost(id);
		history.push('/');
	}

	return (
		<main className="PostPage">
			<article className="post">
				{post &&
					<>
						<h2>{post.title}</h2>
						<p className="postDate">{post.datetime}</p>
						<p className="postBody">{post.body}</p>
						<Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
						<button className="deleteButton" onClick={() => handleDelete(post.id)}>
							Delete Post
						</button>
					</>
				}
				{!post &&
					<>
						<h2>Post Not Found</h2>
						<p>Well, that's disappointing.</p>
						<p>
							<Link to='/'>Visit Our Homepage</Link>
						</p>
					</>
				}
			</article>
		</main>
	)
}

export default PostPage