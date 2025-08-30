
import Cart from "../model/cart.model.js";

export const addToCart = (request, response, next) => {
    let userId = request.params.userId;
    let productId = request.params.productId;

    let cart = new Cart(null, userId, productId,null);
    cart.isProductExist()
        .then((result) => {
            if (!result.length) {
                cart.save()
                    .then(result => {
                        Cart.allCart(userId)
                            .then((result) => {
                                return response.json(result);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });

                console.log("Successfully Added...");
            }
            else{
                Cart.allCart(userId)
                            .then((result) => {
                                return response.json(result);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                console.log("Already Added...");
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export const loadCarts = (request, response, next) => {
    let userId = request.params.userId;
    Cart.allCart(userId)
        .then((result) => {
            console.log(result);
            return response.json(result);
        })
        .catch(err => {
            console.log(err);
        });
}


export const cartView = (request, response, next) => {
    let uId = request.params.userId;
    Cart.allCart(uId)
        .then((result) => {
            console.log(result);
            console.log("..............................");
            return response.render("addToCart.ejs", {
                currentUser: request.session.user,
                cartItems : result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const updateQty = (request, response, next) => {
    let qty= request.params.qty;
    let uId = request.params.userId;
    let pId = request.params.productId;
    console.log("q "+qty+" u "+uId+" p "+pId)
    Cart.updateQty(qty,uId,pId)
        .then((result) => {

            Cart.getCart(uId)
            .then((result) => {
                return response.json(result)
            })
            .catch(err => {
                console.log(err);
            });

        })
        .catch(err => {
            console.log(err);
        });
}

export const getCart = (request, response, next) => {
    let uId = request.params.userId;
    Cart.getCart(uId)
        .then((result) => {
            console.log(result);
            return response.json(result)
        })
        .catch(err => {
            console.log(err);
        });
}



