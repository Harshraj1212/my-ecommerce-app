import pool from "../db/dbConfig.js";

export default class OrderDetails{
    constructor(id,userId,date,billAmount,contactPerson,contactNumber,deliveryAddress,status,paymentMode,contactEmail){
        this.id = id;
        this.userId = userId;
        this.date = date;     
        this.billAmount = billAmount;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber; 
        this.deliveryAddress = deliveryAddress;
        this.status = status;       
        this.paymentMode = paymentMode;
        this.contactEmail = contactEmail;

    }
save(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
            let sql = "insert into order_details(id,userId,date,billAmount,contactPerson,contactNumber,deliveryAddress,status,paymentMode,contactEmail) values(?,?,?,?,?,?,?,?,?,?)";
            con.query(sql,[this.id,this.userId,this.date,this.billAmount,this.contactPerson,this.contactNumber,this.deliveryAddress,this.status,this.paymentMode,this.contactEmail],(err,result)=>{
                err? reject(err) : resolve(result);
                con.release();
            });
        }
        else
          reject(err);
        });
    });
}  

static orderDetailsByUserId(userId){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql = "select * from order_details where userId = ?" ;
                con.query(sql,[userId],(err,result)=>{
                    err ? reject(err) : resolve(result);
                    con.release();
                });
            }
            else
              reject(err);
        });
    });
}


}

