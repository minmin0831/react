import { Link } from 'react-router-dom';

const Post = ({ post }) => {
	return (
		<article className="post">
			<Link to={`/post/${post.id}`}>
				<h2>{post.title}</h2>
				<p className="postDate">{post.datetime}</p>
			</Link>
			<p className="postBody">{
				(post.body).length <= 25
					? post.body
					: `${(post.body).slice(0, 25)}...` // post.body는 처음 25자 까지만 잘라서 노출시키고 그 뒤로는 ...으로 elipse 시킨다.
			}</p>
		</article>
	)
}

export default Post

// react router Link를 통해 해당 포스트 클릭 시, id에 맞는 post페이지로 페이지를 넘긴다.