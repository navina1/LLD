// Facade - structural design pattern
// Provides a simplified interface instead of complex classes, library, framework
//ex: matterial ui, axios
//creating outside layer (for all the system having same goal)
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

//google.authenticate("navina")

//facade layer
class Auth{
    constructor(){
        this.googleAuth=new GoogleAuthProvider();
        this.githubAuth=new GithubAuthProvider();
    }
    google(username){
        this.googleAuth.authenticate(username);
    }
    github(username){
        this.githubAuth.authenticate(username);
    }
}
const auth=new Auth();//only once using singleton
auth.github("Navina");

