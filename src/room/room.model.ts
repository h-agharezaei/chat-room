export enum UserRole {
  Guest = 'Guest',
  Member = 'Member',
  Presenter = 'Presenter',
  Operator = 'Operator',
  Admin = 'Admin',
}

type UserStatus = Record<string | symbol, unknown>;
export interface User {
  readonly sessionId: string; // random uuid
  readonly userId: string; // random uuid
  readonly joinTime: number; // epoch time of login for user
  readonly nickname: string;
  readonly role: UserRole;
  readonly status: UserStatus; // something to make the problem more problematic! 😉
}
