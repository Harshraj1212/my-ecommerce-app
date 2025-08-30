import Product from "../model/product.model.js"

export const allProducts = (req, res, next) => {
    if (!req.session.user) req.session.user = { userId: null };

    Product.fetch()
        .then(products => {
            return res.render("products.ejs", {
                products: products,
                currentUser: req.session.user // <-- pass this
            });
        })
        .catch(err => console.log(err));
}

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