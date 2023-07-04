const player = (name, marker, active) => {
  const getName = () => name;
  const getMarker = () => marker;
  const getActive = () => active;

  const setMarker = (newMarker) => (marker = newMarker);
  const setActive = (newActive) => (active = newActive);
  const setName = (newName) => (name = newName);

  return { getName, getMarker, getActive, setActive, setMarker, setName };
};

const gameBoard = (() => {
  let board = [
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
    { marked: false, value: "" },
  ];

  const winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];

  let cells = document.querySelectorAll(".board");

  const renderBoard = () => {
    let count = 0;

    cells.forEach((cell) => {
      cell.textContent = board[count].value;
      count++;
    });
  };

  const validateBoard = (index) => {
    if (board[index].marked) {
      return false;
    }
    return true;
  };

  const markBoard = (index) => {
    if (validateBoard(index)) {
      cells[index].textContent = board[index].value;
      board[index].marked = true;
    }
  };

  const resetBoard = () => {
    board.forEach((item) => {
      item.marked = false;
      item.value = "";
    });
  };

  const addMarker = (index, marker) => {
    board[index].value = marker;
  };

  const winCheck = () => {
    winCombos.forEach((combo) => {
      if (board[combo[0]].value == "") return false;

      if (
        board[combo[0]].value == board[combo[1]].value &&
        board[combo[1]].value == board[combo[2]].value
      ) {
        game.gameWin(board[combo[0]].value);
        return true;
      }

      return false;
    });
  };

  return {
    renderBoard,
    addMarker,
    markBoard,
    validateBoard,
    resetBoard,
    winCheck,
  };
})();

const game = (() => {
  let cells = document.querySelectorAll(".board");
  const player1 = player("one", "X", true);
  const player2 = player("two", "O", true);
  let active = player();

  const init = () => {
    active.setName(player1.getName());
    active.setMarker(player1.getMarker());
    active.setActive(true);

    cells.forEach((cell) => {
      cell.addEventListener("click", function (event) {
        if (gameBoard.validateBoard(event.target.id)) {
          if (gameBoard.winCheck()) return;
          markable(event.target.id);
        }
      });
    });
  };

  const changeTurn = () => {
    console.log(active.getActive());
    if (active.getActive() === true) {
      active.setMarker(player2.getMarker());
      active.setName(player2.getName());
      active.setActive(false);
    } else {
      active.setMarker(player1.getMarker());
      active.setName(player1.getName());
      active.setActive(true);
    }
  };

  const markable = (index) => {
    gameBoard.addMarker(index, active.getMarker());
    gameBoard.markBoard(index);
    changeTurn();
  };

  const gameWin = (marker) => {
    if (marker == "O") {
      console.log(`${player2.getName()} is the winner!!`);
    } else {
      console.log(`${player1.getName()} is the winner!!`);
    }

    gameBoard.resetBoard();
    gameBoard.renderBoard();
  };

  return { init, gameWin };
})();

game.init();
