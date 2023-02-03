import decode from "jwt-decode";

interface MyToken {
  name: string;
  exp: number;
  // whatever else is in the JWT.
}

class AuthService {
  getProfile(): {
    data: { id: string; userName: string; profileAvatar?: string };
  } {
    return decode((this as any).getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    const decoded = decode<MyToken>(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  isOwner(userObject: any) {
    if (this.loggedIn()) {
      let tokenUserId = (this as any).getProfile().data._id;
      let isOwner = userObject._id === tokenUserId;
      return { tokenUserId: tokenUserId, isOwner: !isOwner, logged: true };
    }
    return { tokenUserId: null, isOwner: false };
  }
}

export default new AuthService();
