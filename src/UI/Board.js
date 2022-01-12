import "./Board.css";
const Board = (props) => {
  return (
    <div className="board">
      <p className="board--group">{props.group}</p>
      <div className="board--body">{props.children}</div>
    </div>
  );
};

export default Board;
