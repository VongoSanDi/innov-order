- Le serveur dois renvoyer les données sous forme d'un tableau d'objet
- Le client calcul le nombre de propriété dans les objet, mettre un filtre pour ne pas afficher toutes les propriétés ? 
- le nom de colonnes doivent etre dynamique, avoir un objet avec les colonnes pour tous le monde, puis un objet par langue et fusionné les 2 selon le besoin

Passage par le contexte pour utiliser le service d'authentification, je suis obligé car c'est le contexte qui doit gérer l'état authentifier ou non.
L'api ne s'occupe que des appels, c'est le contexte qui s'occupe de gérer l'état de l'authentification
