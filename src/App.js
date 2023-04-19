import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import {withAuthenticator,Button,Heading,Image,View,Card} from "@aws-amplify/ui-react";


function App({ signOut }) {
  return (
    <View className="App">
      <Card>
      <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>Auth enabled!</Heading>
      </Card>
    </View>
  );
}

export default withAuthenticator(App);
