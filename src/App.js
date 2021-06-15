import React from "react";

import { List, Search, Text } from "components";
import { useSemiPersistentState } from "hooks";

import "./App.css";

const initialStories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "react");
  const [stories, setStories] = React.useState(initialStories);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>

      <Search
        id="search"
        onInputChange={handleSearch}
        label="Search"
        value={searchTerm}
        isFocused
      >
        <Text>
          <strong>Search:</strong>
        </Text>
      </Search>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;
