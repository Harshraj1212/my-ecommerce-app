import { request, response } from "express"
import Cart from "../model/cart.model.js";
import OrderDetails from "../model/orderDetails.model.js";
import OrderItems from "../model/orderItems.order.js";

export const saveOrder = (request, response, next) => {

  let { contactPerson, contactEmail, contactNumber, deliveryAddress, paymentMode, billAmount } = request.body;
  let orderDetailsId = Date.now();
  let date = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
  let userId = request.session.user.userId;
  let status = "receive";
  const orderDetails = new OrderDetails(orderDetailsId, userId, date, billAmount, contactPerson, contactNumber, deliveryAddress, status, paymentMode, contactEmail);

  orderDetails.save()
    .then(result => {
      console.log("___________________________________");
              console.log(result);
      OrderItems.copy(orderDetailsId, userId)
        .then(result => {
          console.log("___________________________________");
              console.log(result);
            Cart.clearCart(userId)
            .then(result=>{
              console.log("___________________________________");
              console.log(result);
                return response.redirect("/");
            })
            .catch(err=>{
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

}

export const orderDetails = (request,response,next)=>{
  let userId = request.session.user.userId ;
  OrderDetails.orderDetailsByUserId(userId)
  .then(result=>{
    console.log(result);
    return response.render("viewOrder.ejs", {
      currentUser: request.session.user,
      orders: result,
    })
   
  })
  .catch(err=>{
    console.log(err);
  });
}


export const getOrderItems=  (request,response,next)=>{
  console.log("-----------------------------------chala");
  let orderDetailsId = request.params.orderDetailsId ;
  console.log(orderDetailsId);
  OrderItems.orderItems(orderDetailsId)
  .then(result=>{
    console.log("chala");
    console.log(result);
    return response.json(result)
})
.catch(err=>{
  console.log(err);
});

}

