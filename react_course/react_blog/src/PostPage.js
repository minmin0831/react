import { useParams, Link } from "react-router-dom"; // react router hooks

const PostPage = ({ posts, handleDelete }) => {
	const { id } = useParams(); // App.js에서 PostPage에 들어갈 매개변수로 id라고 정의하였기 때문에 여기서도 변수명을 id로 정의힌다.
	const post = posts.find(post => (post.id).toString() === id); // posts로 받은 객체 배열을 find 함수로 돌려서 find 함수에 들어온 객체의 id와 위에서 정의한 id변수의 값이 같다면 해당 객체를 post에 저장한다.  

	return (
		<main className="PostPage">
			<article className="post">
				{post && 
					<>
						<h2>{post.title}</h2>
						<p className="postDate">{post.datetime}</p>
						<p className="postBody">{post.body}</p>
						<button onClick={() => handleDelete(post.id)}>
							Delete Post
						</button>
					</>
				}
				{
					!post && 
					<>
						<h2>Post Not Found</h2>
						<p>Well, that's disappointing.</p>
						<p>
							<Link to="/">Visit Our Homepage</Link>
						</p>
					</>
				}
			</article>
		</main>
	)
}



export default PostPage
