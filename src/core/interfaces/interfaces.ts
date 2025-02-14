export interface UserRequestLoginBody {
  username: string;
  password: string;
}

export interface UserRequestRegisterBody {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  job: string;
  role: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  // Ajoutez ici d'autres propriétés de l'utilisateur si nécessaire
}
