export const ApiContainer = {

USER:{
    SIGN_UP:"user/signup",
    GET_ALL:"user",
    LOGIN :"user/login",
    DELETE:(userId :number) =>{
return "/user" + userId
    }

},
PRODUCT:{
    GET_ALL:"produit",
    GET_BY_ID:"produit"
},
CART:{
    ADD:"cart",
    GET_BY_ID:"cart",
    DELETE:"cart"
}
}