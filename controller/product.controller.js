import Product from "../model/product.model.js"

export const searching = (request,response,next)=>{
   let input = request.params.input;
   Product.searching(input)
   .then(result=>{
    return response.json(result);
   })
   .catch(err=>{
    console.log(err);
   });
}