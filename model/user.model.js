import pool from "../db/dbConfig.js"
export default class User{
    constructor(id,username,gender,contact,email,password){
        this.id=id;
        this.username=username;
        this.gender=gender;
        this.contact=contact;
        this.email= email;
        this.password= password;
    }
    save(){
     return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "insert into user(username,gender,contact,email,password) values(?,?,?,?,?)";
            con.query(sql,[this.username,this.gender,this.contact,this.email,this.password],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release;
            });
          }
          else
            reject(err);

        });

     });

    }
    
    signin(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from user where email=? and password =? ";
                    con.query(sql,[this.email,this.password],(err,result)=>{
                    err? reject(err) : resolve(result);
                    con.release;
                    });
                }
                else
                  reject(err);
            }
            );
        });
    }
}