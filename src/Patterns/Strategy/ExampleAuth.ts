interface Strategy {
  authenticate(args: any[]): boolean;
}

class TwitterStrategy implements Strategy {
  authenticate(args: any[]): boolean {
    const [token] = args;
    if (token !== 'tw123') {
      console.error('Twitter account authentication failed!');
      return false;
    }
    console.log('Twitter account authentication succeeded!');
    return true;
  }
}

class LocalStrategy implements Strategy {
  authenticate(args: any[]) {
    const [username, password] = args;
    if (username !== 'bytefer' || password !== '666') {
      console.log('Incorrect username or password!');
      return false;
    }
    console.log('Account and password authentication succeeded!');
    return true;
  }
}

class Authenticator {
  strategies: Record<string, Strategy> = {};

  use(name: string, strategy: Strategy) {
    this.strategies[name] = strategy;
  }

  authenticate(name: string, ...args: any) {
    if (!this.strategies[name]) {
      console.error('Authentication policy has not been set!');
      return false;
    }
    return this.strategies[name].authenticate.apply(null, args);
  }
}

const auth = new Authenticator();
auth.use('twitter', new TwitterStrategy());
auth.use('local', new LocalStrategy());
function login(mode: string, ...args: any) {
  return auth.authenticate(mode, args);
}
login('twitter', '123');
login('local', 'bytefer', '666');
