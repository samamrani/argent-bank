
  // Déconnecte l'utilisateur en supprimant le token d'authentification des stockages.

export const logout = () => {
  localStorage.removeItem('userToken');
  sessionStorage.clear();
};
