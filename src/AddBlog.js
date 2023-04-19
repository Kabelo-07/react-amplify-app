import { Button, Flex, TextField, View } from "@aws-amplify/ui-react"
import { API } from "aws-amplify";
import { 
    createPost as createPostMutattion,
    deletePost as deletePostMutation,
    createBlog as createBlogMutation,
  } from './graphql/mutations';

const AddBlog = () => {

    async function createBlog(event) {
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
        event.target.reset();
      }
    

    return (
        <View as="form" margin="3rem 0" onSubmit={createBlog}>
        <Flex direction="column" justifyContent="center">
          <TextField
            name="name"
            placeholder="Blog Name"
            label="Blog Name"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Blog
          </Button>
        </Flex>
      </View>
    )
}

export default AddBlog;