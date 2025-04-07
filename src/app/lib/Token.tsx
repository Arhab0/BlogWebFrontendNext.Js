export interface Token {
  sid: number;
  name: string;
  role: string;
  checkerId: number;
  sessionId: number;
  nbf: string;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export const defaultTokenObject: Token = {
  sid: -1,
  name: "",
  role: "",
  checkerId: 0,
  sessionId: -1,
  nbf: "",
  iss: "",
  iat: -1,
  exp: -1,
  aud: "",
};
