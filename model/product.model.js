import pool from "../db/dbConfig.js";

export default class Product{
    constructor(id,title,description,price,discountPercentage,
        rating,stock,brand,category,thumbnail,imageArray){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.imageArray = imageArray;
    }
    static fetch(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql = "select * from product";
                  
                  con.query(sql,(err,result)=>{
                     err ? reject(err) : resolve(result);
                     con.release(); 
                  });
                }
                else
                  reject(err);
            })
        });
    }

    static searching(input){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql = "SELECT * FROM product WHERE title LIKE ?";
                  con.query(sql,['%'+input+'%'],(err,result)=>{
                     err ? reject(err) : resolve(result);
                     con.release(); 
                  });
                }
                else
                  reject(err);
            })
        });
    }

}