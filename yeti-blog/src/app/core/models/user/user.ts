import { Visitation } from './visitation';
import { Achievment } from './achievment';

export interface User {
  id?: string;
  firebaseId?: string;
  username: string;
  email: string;
  bio: string;
  imgUrl: string;
  isAdmin?: boolean;
  isFrozen?: boolean;
  visitations?: Visitation[];
  achievements?: Achievment[];
}