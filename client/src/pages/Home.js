import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Checkbox } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);
  let {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  const [shownPosts, setShownPosts] = useState(posts)
  useEffect(() => {
    setShownPosts(posts)
  }, [posts])

  const handleCheckboxOnChange = (e, { checked }) => {
    if(checked) {
      posts = posts.filter(post => post.likeCount > 0);
      setShownPosts(posts)
    }else{
      posts = posts.filter(post => post);
      setShownPosts(posts)
    }
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
            <Checkbox label='Show liked comments' onChange={handleCheckboxOnChange}/>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {shownPosts &&
              shownPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
