import React, {Component} from 'react';
import gql from "graphql-tag";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import PostFrame from './PostFrame'

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const electron = window.require("electron") // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer


const TestComponent = () => (
    <Query
      query={gql`
        {
          posts {
            title
            url
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return <PostFrame posts={data.posts} />
       }}
    </Query>
  );



class App extends Component {
    constructor(props) {
        super(props);

      
        this.state = {
          updateReady:false
        }
        ipcRenderer.on('updateReady', (event, text) => {
            this.setState({updateReady:true})
        })
      

    }

    render() {
        return   <ApolloProvider client={client}>
        <div>
          <TestComponent />
          { this.state.updateReady  &&  <button onClick={()=>ipcRenderer.send('quitAndInstall')}>{"click to update"}</button>}
          
        </div>
        </ApolloProvider>
    }
}

export default App;
