export class User {
  // ASK: should I add property hash here?
  constructor(username, email, credit, hash) {
    this.username = username;
    this.email = email;
    this.credit = credit;
    this.hash = hash;
  }
}
