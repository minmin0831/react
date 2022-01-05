import Post from "./Post"

const Feed = ({ posts }) => {
	return (
		<>
			{posts.map((post) => ( // 태그는 {}가 아니라 () 소괄호를 사용해야 코드가 읽힌다.
				<Post key={post.id} post={post} />
			))}	
		</>
	)
}

export default Feed
