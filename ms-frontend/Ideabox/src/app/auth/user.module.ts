export class User{
  constructor(
    public email: string,
    public name: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ){ 
    console.log("constructor");
    
  }

  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}