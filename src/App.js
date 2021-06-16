import React from "react";

import { List, InputWithLabel, Text } from "components";
import { useSemiPersistentState } from "hooks";

import "./App.css";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case "REMOVE_STORIES":
      return {
        ...state,
        data: state.data.filter(story => action.payload.objectID !== story.objectID)
      }
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "react");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    
    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then((result) => {
        dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.hits })
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORIES",
      payload: item,
    });
  };

  const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        onInputChange={handleSearch}
        label="Search"
        value={searchTerm}
        isFocused
      >
        <Text>
          <strong>Search:</strong>
        </Text>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
