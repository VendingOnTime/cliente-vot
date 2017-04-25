export interface ServerConfig {
  host : string,
  port : number,
  secure : boolean
  //FIXME: Add more data if necessary
}

//FIXME: Improve format if necessary
export const DEV_CONFIG : ServerConfig = {
  host : 'localhost',
  port : 8080,
  secure : false
};

//TODO: Define production server
export const PROD_CONFIG : ServerConfig = {
  host : 'vot-app-staging.herokuapp.com',
  port : 8080,
  secure : true
};
