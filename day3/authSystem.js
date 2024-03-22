class BaseAuthSystem{
    authenticate(username){
        throw new Error("Authenticate method is not implemented");
    }
}
class GoogleAuthProvider extends BaseAuthSystem{
    authenticate(username){
        console.log(`Authenticate user  ${username} using google`);
    }
}

class GithubAuthProvider extends BaseAuthSystem{
    authenticate(username){
        console.log(`Authenticate user  ${username} using github`);
    }
}

const google=new GoogleAuthProvider();
const github=new GithubAuthProvider();
google.authenticate("navina")