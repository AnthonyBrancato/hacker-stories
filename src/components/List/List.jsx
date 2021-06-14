import { Item } from "components";

const List = ({ list }) =>
  list.map((item) => <Item key={item.objectID} {...item} />);

export default List;
