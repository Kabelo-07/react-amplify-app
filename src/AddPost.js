import { Button, 
    Flex, 
    TextField,
    View
} from "@aws-amplify/ui-react"
import { API, Storage } from "aws-amplify";
import { useParams, useNavigate } from "react-router-dom";
import { createPost as createPostMutattion } from './graphql/mutations';
  
const AddPost = () => {
    const {blogId} = useParams();
    const navigate = useNavigate();

    async function createPost(event) {
      event.preventDefault();
      const form = new FormData(event.target);
      const image = form.get("image");
      const data = {
        title: form.get("title"),
        blogPostsId: blogId,
        image: image.name
      }
      if (!!data.image) await Storage.put(data.title, image);
      await API.graphql({ 
        query: createPostMutattion,
        variables: {
          input: data
        }
      });
  
      event.target.reset();
      navigate(`/blogs/${blogId}`);
    }
      
    return (
      <View as='form' onSubmit={createPost} >
      <Flex direction="column" justifyContent="center">
        <TextField
          placeholder="Enter post title"
          name="title"
          label="Post title"
          labelHidden
          errorMessage="There is an error"
          required={true}
        />
        <View
          name="image"
          as="input"
          type="file"
          required={true}
          style={{ alignSelf: "end" }}
        />
        <Button type="submit" variation="primary">
                  Create Post
        </Button>
       </Flex> 
      </View>

)}

export default AddPost;