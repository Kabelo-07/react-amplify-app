import { API } from 'aws-amplify';
import { listPosts, listBlogs } from './graphql/queries';
import { 
  createPost as createPostMutattion,
  deletePost as deletePostMutation,
  createBlog as createBlogMutation,
} from './graphql/mutations';

  export async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    const posts = apiData.data.listPosts.items;
    //setPosts(posts);
  }

  export async function fetchBlogs() {
    const apiData = await API.graphql({ query: listBlogs });
    let blogs = apiData.data.listBlogs.items;
    return blogs;
  }

  export async function createBlog(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name")
    }
    await API.graphql({ 
      query: createBlogMutation,
      variables: {
        input: data
      }
    });

    fetchBlogs();
    event.target.reset();
  }
