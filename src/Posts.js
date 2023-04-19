import { Button, 
    Flex, 
    Card, 
    Text,
    Image, 
    View, 
    Collection, 
    Badge, 
    Divider,
    Heading } from "@aws-amplify/ui-react"
import { API, Storage } from "aws-amplify";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { 
    createPost as createPostMutattion,
    deletePost as deletePostMutation,
    createBlog as createBlogMutation,
  } from './graphql/mutations';
 import { useState, useEffect } from "react"; 
 import {listPosts} from './graphql/queries'
import AddPost from "./AddPost";
  

const Posts = () => {
    const {blogId} = useParams();
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        setPosts([]);
        const data = {
            blogPostsId: {
                eq: blogId
            }    
        }
        
        const apiData = await API.graphql({ 
            query: listPosts,
            variables: {
                filter: data
            }
        });
        const posts = apiData.data.listPosts.items;

        await Promise.all(
            posts.map(async (post) => {
              if (post.image) {
                const url = await Storage.get(post.title);
                post.image = url;
              } else {
                  post.image = "http://via.placeholder.com/640x360";
              }
              return post;
            })
        );

        console.log(posts)

        setPosts(posts);
    }
    
    useEffect(() => {
        fetchPosts();
    }, [blogId]);
      
    return (
 <View>
       
   <NavLink variation="link"
    to={`/posts/${blogId}/new`}
   >Add Post</NavLink>
  <Collection
    items={posts}
    type="list"
    direction="row"
    gap="20px"
    wrap="nowrap"
    searchNoResultsFound={
        <Flex justifyContent="center" position="c">
          <Text fontSize="2rem">
            No Posts
          </Text>
        </Flex>
      }
  >
    {(item, index) => (
      <Card
        key={index}
        borderRadius="medium"
        variation="outlined"
      >
        <Heading padding="medium">{item.title}</Heading>
        <Divider padding="xs" />
        <Image
            src={item.image}
            alt="Glittering stream with old log, snowy mountain peaks tower over a green field."
        />
        <View padding="xs">
          <Flex>
            
          </Flex>
          
        </View>
      </Card>
    )}
  </Collection>
  </View>

)}

export default Posts;