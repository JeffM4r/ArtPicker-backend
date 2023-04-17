export interface UserIdJWT {
  userId: number;
  iat: number,
  exp: number
}

export interface SigninBody {
  email: string,
  password: string
}

export interface SignupBody {
  userName: string,
  email: string,
  password: string,
  image: string
}

export interface PostBody {
  title: string,
  subtitle: string,
  image: string
}

export interface CommentBody {
  comment:string
}
