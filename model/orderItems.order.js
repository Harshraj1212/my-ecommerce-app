import pool from "../db/dbConfig.js";

export default class OrderItems{
    constructor(id,orderDetailsId,productId,productQty){
        this.id = id;        
        this.orderDetailsId = orderDetailsId;
        this.productId = productId;
        this.productQty = productQty;

    }
save(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            let sql = "insert into order_items(orderDetailsId,productId,productQty) values(?,?,?)";
            con.query(sql,[this.orderDetailsId,this.productId,this.productQty],(err,result)=>{
                err? reject(err) : resolve(result);
                con.release();
            });
        }
        else
          reject(err);
        });
    });
}  

static copy(orderDetailsId,userId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            let sql = "insert into order_items(orderDetailsId,productId,productQty) select ?,productId,productQty from cart where userId = ?";
            con.query(sql,[orderDetailsId,userId],(err,result)=>{
                err? reject(err) : resolve(result);
                con.release();
            });
        }
        else
          reject(err);
        });
    });
}  

static orderItems(orderDetailsId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            let sql = " select product.title ,product.thumbnail,product.discountPercentage,product.price, order_items.productQty , product.brand from product inner join order_items on product.id = order_items.productId where order_items.orderDetailsId = ?";
            con.query(sql,[orderDetailsId],(err,result)=>{
                err? reject(err) : resolve(result);
                con.release();
            });
        }
        else
          reject(err);
        });
    });

}


}

