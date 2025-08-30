import pool from "../db/dbConfig.js";

export default class Cart{
    constructor(id, userId, productId,productQty){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.productQty = productQty;
    }
save(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            let sql = "insert into cart(userId,productId) values(?,?)";
            con.query(sql,[this.userId,this.productId],(err,result)=>{
                err? reject(err) : resolve(result);
                con.release();
            });
        }
        else
          reject(err);
        });
    });
}  

isProductExist(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
           if(!err){
             let sql = "select * from cart where userId = ? and productId = ?";
             con.query(sql,[this.userId, this.productId],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
             });
           }
           else
             reject(err);
        })
     });
}

static allCart(userId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
           if(!err){
            let sql = "select product.id,product.title,product.price,product.discountPercentage,product.stock,product.brand,product.thumbnail from product inner join cart on product.id = cart.productId where cart.userId = ?";
            //  let sql = "select * from cart where userId = ?";
             con.query(sql,[userId],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
             });
           }
           else
             reject(err);
        })
     });
}
static updateQty(productQty,userId,productId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            //   let sql = "update category set categoryName = ? where id = ?";
            let sql = "update cart set productQty = ? where userId = ? and productId = ?";
              con.query(sql,[productQty,userId, productId],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              })
            }
            else
              reject(err);
        });
    });
}

static getCart(userId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
           if(!err){
             let sql = "select * from cart where userId = ?";
             con.query(sql,[userId],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
             });
           }
           else
             reject(err);
        })
     });
}

static clearCart(userId){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql = "delete from cart where userId=?";
        con.query(sql,[userId],(err,result)=>{
          err ? reject(err) : resolve(result);
          con.release();
        })
      }
      else
       reject(err);
    })
  });
}

}