const List = ({ list }) => {

  return list.map(elem => {
    return(
      <div key={elem.objectID}>
        <span>
          <a href={elem.url}>{elem.title}</a>
        </span>
        <span>{elem.author}</span>
        <span>{elem.num_comments}</span>
        <span>{elem.points}</span>
      </div>
    )
  })
}

export default List