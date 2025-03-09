import "./style.css";
import "virtual:uno.css";

// Définir l'interface pour l'état du jeu
interface GameState {
  joueurEnCours: 1 | 2;
  scoreJ1: number;
  scoreJ2: number;
  matchNuls: number;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
}

// Récupérer les éléments du DOM
const cases = [...document.getElementsByClassName("case")] as HTMLDivElement[];
const joueur = document.getElementById("joueur") as HTMLSpanElement;
const score1 = document.getElementById("score1") as HTMLSpanElement;
const score2 = document.getElementById("score2") as HTMLSpanElement;
const scoreNul = document.getElementById("scoreNul") as HTMLSpanElement;

// État initial du jeu
let state: GameState = {
  joueurEnCours: 1,
  scoreJ1: 0,
  scoreJ2: 0,
  matchNuls: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
};

// Réinitialiser l'état du jeu
const resetState = (): void => {
  state.joueurEnCours = 1;
  state.c1 = 0;
  state.c2 = 0;
  state.c3 = 0;
  state.c4 = 0;
  state.c5 = 0;
  state.c6 = 0;
  state.c7 = 0;
  state.c8 = 0;
  state.c9 = 0;
};

// Vérifier s'il y a une victoire ou un match nul
const verifierVictoire = (): boolean | null => {
  const { c1, c2, c3, c4, c5, c6, c7, c8, c9 } = state;

  // Conditions de victoire
  if (
    (c1 === c2 && c2 === c3 && c1 > 0) ||
    (c4 === c5 && c5 === c6 && c4 > 0) ||
    (c7 === c8 && c8 === c9 && c7 > 0) ||
    (c1 === c4 && c4 === c7 && c1 > 0) ||
    (c2 === c5 && c5 === c8 && c2 > 0) ||
    (c3 === c6 && c6 === c9 && c3 > 0) ||
    (c1 === c5 && c5 === c9 && c1 > 0) ||
    (c3 === c5 && c5 === c7 && c3 > 0)
  ) {
    return true; // Victoire
  }

  // Condition de match nul (toutes les cases sont remplies)
  if (
    c1 !== 0 &&
    c2 !== 0 &&
    c3 !== 0 &&
    c4 !== 0 &&
    c5 !== 0 &&
    c6 !== 0 &&
    c7 !== 0 &&
    c8 !== 0 &&
    c9 !== 0
  ) {
    return null; // Match nul
  }

  return false; // Pas de victoire ni de match nul
};

// Gérer le clic sur une case
const jouerCase = (e: MouseEvent): void => {
  const target = e.target as HTMLDivElement;
  const idCase = target.id as keyof GameState;

  // Vérifier si la case est déjà jouée
  if (state[idCase] !== 0) return;

  // Mettre à jour la case avec le joueur actuel
  state[idCase] = state.joueurEnCours;
  target.textContent = state.joueurEnCours === 1 ? "X" : "O";

  // Vérifier s'il y a une victoire ou un match nul
  const isVictoire = verifierVictoire();

  if (isVictoire === true) {
    alert(`Le gagnant est le joueur ${state.joueurEnCours}`);
    if (state.joueurEnCours === 1) {
      state.scoreJ1++;
      score1.textContent = state.scoreJ1.toString();
    } else {
      state.scoreJ2++;
      score2.textContent = state.scoreJ2.toString();
    }
    resetState();
    cases.forEach((c) => (c.textContent = ""));
  } else if (isVictoire === null) {
    alert("Match Nul !");
    state.matchNuls++;
    scoreNul.textContent = state.matchNuls.toString();
    resetState();
    cases.forEach((c) => (c.textContent = ""));
  } else {
    // Changer de joueur
    state.joueurEnCours = state.joueurEnCours === 1 ? 2 : 1;
    joueur.textContent = state.joueurEnCours.toString();
  }
};

// Ajouter les écouteurs d'événements aux cases
cases.forEach((el) => {
  el.addEventListener("click", jouerCase);
});
