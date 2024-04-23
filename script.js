let themes = {
  dark: ["#262324", "#4D4A59", "#717365", "#0D0C0B", "#403A3A"],
  summer: ["#393459", "#94E1F2", "#81A649", "#F2E2CE", "#D9A273"],
  syntwhere: ["#F21D6B", "#F21B7F", "#8A148C", "#0D1E40", "#F2F0C9"],
  luxury: ["#F3F5EE", "#D18E22", "#BDB1A2", "#A77B55", "#262424"],
  mario: ["#6E34BF", "#04B2D9", "#4CA633", "#F2B705", "#F21616"],
  waves: ["#195973", "#04B2D9", "#3BA7BF", "#053A40", "#63E4F2"],
  fire: ["#F2BB13", "#F2A30F", "#F2780C", "#D9420B", "#0D0D0D"],
  ice: ["#356B8C", "#99B1BF", "#DFEBF2", "#0D3140", "#396273"],
  florest: ["#34AD3C", "#3D7A41", "#16E024", "#324733", "#2E332E"],
  flowers: ["#F294D9", "#BF2CA7", "#471D59", "#552E8C", "#261B40"],
  spiderman: ['#DA2233','#1A2F5A', '#190B0C', '#720A08', '#720A08']
};

let nameTheme = Object.entries(themes);

let color = null;

let row = 4;
let column = 0;

const menu = (easyBtn, mediumBtn, hardBtn) => {
  easyBtn.addEventListener("click", (e) => {
    e.target.parentNode.style = "transform:translate(-1000%); transition: 1s;";
    init(2);
  });

  mediumBtn.addEventListener("click", (e) => {
    e.target.parentNode.style = "transform:translate(-1000%); transition: 1s;";
    init(3);
  });

  hardBtn.addEventListener("click", (e) => {
    e.target.parentNode.style = "transform:translate(-1000%); transition: 5s;";
    init(4);
  });
};

const chooseTheme = (menuDiv) => {
  for (let i = 0; i < Object.keys(themes).length; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "theme");
    div.innerHTML = nameTheme[i][0];
    div.id = i;
    div.style.background = nameTheme[i][1][3];
    div.style.color = nameTheme[i][1][2];

    div.addEventListener("click", (e) => {
      color = nameTheme[i][1];
      e.target.parentNode.style =
        "transform:translate(-1000%); transition: 1s;";
    });

    menuDiv.appendChild(div);
  }
};

const draw = () => {
  for (r = 0; r < row; r++) {
    for (c = 0; c < column; c++) {
      const div = document.createElement("div");
      div.classList.add("draw");
      div.id = c.toString() + "-" + r.toString();
      div.style.background = color[0];

      EventColor(div);
      document.querySelector("#board").appendChild(div);
    }
  }
};

const drawRepeat = () => {
  for (r = 0; r < row; r++) {
    for (c = 0; c < column; c++) {
      const div = document.createElement("div");
      div.classList.add("repeat");
      div.id = c.toString() + "-" + r.toString();

      RandomColor(div);
      document.querySelector("#boardRepeat").appendChild(div);
    }
  }
};

EventColor = (div) => {
  let target = 1;

  div.addEventListener("click", (e) => {
    div.style.background = color[target];
    target++;
    if (target >= color.length) {
      target = 0;
    }
    verifyColor();
  });
};

RandomColor = (div) => {
  div.style.background = color[Math.floor(Math.random() * color.length)];
};

verifyColor = () => {
  let current = document.querySelectorAll(".draw");
  let repeat = document.querySelectorAll(".repeat");

  for (var i = 0; i < repeat.length; i++) {
    if (current[i].style.background !== repeat[i].style.background) {
      return;
    }
  }

  gameWin("voce ganhou");
};

const gameWin = (msg) => {
  let m = msg || "voce perdeu";

  const board = document.querySelector("#board");

  const screenWin = document.createElement("div");
  screenWin.setAttribute("class", "gameWin");
  screenWin.innerHTML = "<p>" + m + "</p>";
  board.parentNode.appendChild(screenWin);
  startGame();
};

const init = (c) => {
  const reset = document.querySelector(".gameWin");
  board.innerHTML = "";
  boardRepeat.innerHTML = "";
  column = c;
  draw();
  drawRepeat();

  if (reset != null) {
    reset.remove();
  }
};

const startGame = () => {
  const menuDiv = document.createElement("div");
  menuDiv.id = "menu";

  const easyBtn = document.createElement("div");

  easyBtn.classList.add("btn", "easy");
  easyBtn.textContent = "EASY";

  const mediumBtn = document.createElement("div");
  mediumBtn.classList.add("btn", "medium");
  mediumBtn.textContent = "MEDIUM";

  const hardBtn = document.createElement("div");
  hardBtn.classList.add("btn", "hard");
  hardBtn.textContent = "HARD";

  const themesDiv = document.createElement("div");
  themesDiv.classList.add("themes");

  menuDiv.appendChild(easyBtn);
  menuDiv.appendChild(mediumBtn);
  menuDiv.appendChild(hardBtn);

  document.body.appendChild(menuDiv);
  document.body.appendChild(themesDiv);

  setInterval(animTitle,500)
  
  menu(easyBtn, mediumBtn, hardBtn);
  chooseTheme(themesDiv);
};

const animTitle = () => {
  const title = [...document.querySelectorAll('.title span')]

  title.map((t,i)=>{

      t.style.color = '#'+ Math.floor(Math.random()*1000000) 
      
    })

} 

startGame();
