//object based approach
const streamReducer = (state ={},action) =>{
    switch(action.type){
        case EDIT_STREAM: 

        //const newState = {...state};
        //newState[action.payload.id]= action.payload;
        //return newState;
        return {...state,[action.payload.id]:action.payload};//its a 2015 syntax
        
    }
}
// its similar to above code SyntaxError
// const animalSound ={cat:'mewoo',dog:'bark'};
// undefined
// animalSound
// {cat: 'mewoo', dog: 'bark'}
// const animal='lion'
// undefined
// const sound:'roar'
// VM1297:1 Uncaught SyntaxError: Missing initializer in const declaration
// const sound='roar'
// undefined
// {...animalSound,[animal]:sound}
// {cat: 'mewoo', dog: 'bark', lion: 'roar'}