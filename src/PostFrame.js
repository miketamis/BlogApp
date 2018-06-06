import React from 'react';
import styled from 'styled-components'
import { withState } from 'recompose';
const Button = styled.button`
width: 100%;
background: none;
padding: 0;
font: inherit;
cursor: pointer;
height: 50px;
font-size: 24px;
background-color: #48ec74;
border: none;
color: white;
outline: inherit;
font-family: sans-serif;

`

const enhance = withState('postIndex', 'setPostIndex', 0)

const postFrame = ({posts, postIndex, setPostIndex }) => posts[postIndex] ? <div>
    { posts[0].title }
    <webview src={posts[postIndex].url} style={{ height: 'calc(100vh - 68px)' }}></webview>
    <Button onClick={() => setPostIndex(postIndex + 1)}>Next</Button>
</div> : <div>No More Posts D: </div>

export default enhance(postFrame);