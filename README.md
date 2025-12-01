# Atelier Chaos discret et continu

Support web pour un atelier de 3e autour du chaos :
- Modèle proies-prédateurs discret (Lotka-Volterra simplifié) manipulable.
- Balayage automatique d'un paramètre pour visualiser un diagramme de bifurcation maison.
- Introduction au système de Lorenz avec visualisation de l'attracteur.

## Démarrage
Ouvrez `index.html` (portail) dans un navigateur récent. Les trois ateliers sont sur des pages séparées pour les utiliser l’un après l’autre :
- `predator.html` : atelier 1 (carte logistique simple)
- `bifurcation.html` : atelier 2 (balayage de r → diagramme de bifurcation)
- `lorenz.html` : atelier 3 (Lorenz et attracteur étrange)

## Structure des pages
- **Atelier 1 – Carte logistique** : règle `r` et `x0`, visualise la séquence et le comportement (convergence, cycles, chaos).
- **Atelier 2 – Balayage / bifurcation** : fait varier `r` et trace les valeurs asymptotiques pour donner une intuition du diagramme de bifurcation.
- **Atelier 3 – Lorenz** : rappel des équations, sliders pour `sigma, rho, beta`, intégration numérique simple (Euler) et dessin en 3D projetée (2D) de l'attracteur.

## Fichiers
- `index.html` : portail vers les trois ateliers.
- `predator.html` : atelier 1 (proies/prédateurs).
- `bifurcation.html` : atelier 2 (balayage r).
- `lorenz.html` : atelier 3 (Lorenz).
- `styles.css` : mise en forme légère.
- `utils.js` : fonctions communes (intégrateurs, tracés).
- `logistic.js` : interactions de l'atelier 1.
- `bifurcation.js` : balayage paramétrique de l'atelier 2.
- `lorenz.js` : démonstrateur Lorenz de l'atelier 3.

## Conseils d'usage en classe
- Préparez un QR-code vers le fichier local/serveur contenant `index.html` pour que les élèves ouvrent la page sur téléphone.
- Donnez une grille de tests guidés (ex. augmenter `a`, augmenter `d`, combiner `b` et `c`) et laissez noter stable/oscillant/divergeant.
- Pour le chaos, comparez deux très proches conditions initiales (ex. `P0 = 50` vs `P0 = 50.1`) et affichez les courbes superposées.
- Enchaînez ensuite sur Lorenz : faites varier légèrement `rho` et observez la trajectoire.

## Licence
Libre d'usage pédagogique.
