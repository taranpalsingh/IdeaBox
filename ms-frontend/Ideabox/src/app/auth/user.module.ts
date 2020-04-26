export class User{
  constructor(
    public email: string,
    public name: string,
    private _token: string
  ){ 
    console.log("constructor");
    
  }

  get token(){
    if(this._token){
      return this._token;
    }
    return null;
  }
}