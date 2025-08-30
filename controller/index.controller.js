import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js"
import User from "../model/user.model.js";
import axios from "axios";


export const indexPage = (request, response, next) => {



    const options = {
      method: 'GET',
      url: 'https://distance-calculator.p.rapidapi.com/distance/simple',
      params: {
        lat_1: '47.373535',
        long_1: '8.541109',
        lat_2: '42.335321',
        long_2: '-71.023516',
        unit: 'miles',
        decimal_places: '2'
      },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': ' fb2b018e5dmsh0487dd610440df4p1ebfa7jsnc5f70364e69e',
        'X-RapidAPI-Host': 'driving-distance-calculator-between-two-points.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    if(! request.session.user)
       request.session.user={userId:null}
    Product.fetch()
        .then(result => {
            return response.render("index.ejs", {
                currentUser: request.session.user,
                products: result
            });
        })
        .catch(err => {
            console.log(err);
        })
}
export const signinPage = (request, response, next) => {
    return response.render("login.ejs");
}

export const signupPage = (request, response, next) => {
    return response.render("registration.ejs");
}

export const signup = (request, response, next) => {
    console.log(request.body);
    let user = new User(null, request.body.username, request.body.gender, request.body.contact, request.body.email, request.body.password);
    user.save()
        .then(result => {
            console.log(result);
            return response.render("login.ejs");
        })
        .catch(err => {
            console.log(err);
        })
}

export const signin = (request, response, next) => {
    let { email, password } = request.body;

    let user = new User();
    user.email = email;
    user.password = password;
    user.signin()
        .then(result => {
            if (result.length) {
                request.session.user = {
                    userId: result[0].id,
                    username: result[0].username,
                    email: result[0].email,
                };

                // return response.redirect("/");
                Product.fetch()
                    .then(result => {
                        return response.render("index.ejs", {
                            currentUser: request.session.user,
                            products: result
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else
                return response.render("registration.ejs");


        })
        .catch(err => {
            console.log(err);
        });

}
export const signout = (request, response, next) => {
    request.session.user = null;
    request.session.destroy();
    return response.redirect("/");
}


export const viewmore = (request, response, next) => {

    let pid = request.params.pid;
    Product.fetch()
        .then(result => {
            for (let product of result) {
                if (product.id == pid)
                    return response.render("viewMore.ejs", { productView: product });
            }
        })
        .catch(err => {
            console.log(err);
        })
}


