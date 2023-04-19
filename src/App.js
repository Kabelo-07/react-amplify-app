import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import {Route, Routes, NavLink} from 'react-router-dom';
import {withAuthenticator,
  Button,
  Heading,
  View,
  Flex, Grid} from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react';
import AddBlog from './AddBlog';
import Posts from './Posts';
import {listBlogs } from './graphql/queries';
import {API} from 'aws-amplify';
import AddPost from './AddPost';

function App({ signOut }) {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    const apiData = await API.graphql({ query: listBlogs });
    const blogs = apiData.data.listBlogs.items;
    setBlogs(blogs);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <View className="App">
    <Grid
      columnGap="0.2rem"
      rowGap="0.2rem"
      templateColumns="1fr 3fr 1fr"
      templateRows="1fr 3fr 1fr"
    >
    <Heading 
      columnStart="1"
      columnEnd="4"
      backgroundColor="red"
      level={2}>Current Posts
      </Heading> 

      <Button 
        onClick={signOut}
        columnStart="4"
        columnEnd="-1"
      >
        Sign out
      </Button>
      

      <Flex
      columnStart="1"
      columnEnd="2"
      direction="column"
      backgroundColor="Yellow"
      gap="0.6rem">
        {blogs?.map((blog) => (
          <NavLink 
            key={blog.id}
            to={`/posts/${blog.id}`}
          >
            {blog.name}
        </NavLink>
        ))}
        <NavLink
          to={`/blogs/new`}
        >
          Add New Blog
        </NavLink>
      </Flex>

      <View columnStart="2" columnEnd="-1" >
      
      <Routes>
          <Route path='/posts/:blogId' element={<Posts />} />
          <Route path='/posts/:blogId/new' element={<AddPost />} />
          <Route path='/blogs/new' element={<AddBlog />} />
      </Routes>
     </View>

    </Grid>
    </View>
  );
}

export default withAuthenticator(App);
