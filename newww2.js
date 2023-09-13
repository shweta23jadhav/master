const express = require('express');
const app = express();
const port =  2000;
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'users'
  }
});
setTimeout(async () =>{
      let result= await knex.select("id","userid","name","gender","username",).from("person");
      // console.log(result);
    },2000);
    app.get('/users',async (req, res) => {
      let result= await knex.select("id","userid","name","gender","username",).from("person");
        console.log(result);
        res.send(result);
      });
      app.get('/users/:id/:userid/:name/:gender/:username',async (req, res) => {
        let { id, userid, name, gender, username } = req.params;
      let insert = await knex('person').insert({
          id,
          userid,
          name,
          gender,
          username
        });
        console.log(insert);
        res.send({ id, userid, name, gender, username });
      });
      app.get('/users/:b/:name', async(req,res)=>{
        let  name=req.params.name;
        let  id=req.params.b;
        let up = await knex('person').where({id}).update({name});
        if (up) {
          console.log(`Updated ${up} record`);
          res.send({name:'updated'});
        } else {
          res.send({ message: 'not found' });
        }
      });
      // username?id=7&username=%27shubham%27&name=%27shubham%27
      app.get('/username', async(req,res)=>{
        let  username=req.query.username;
        let  name=req.query.name;
        let  gender=req.query.gender;
        let  id=req.query.id;
        let up = await knex('person').where({id}).update({name, username});
        if (up) {
          console.log(`Updated ${up} record`);
          res.send({usernamename:'updated'});
        } else {
          res.send({ message: 'not found' });
        }
      });
      app.get('/gender/:d/:gender', async(req,res)=>{
        let  gender=req.params.gender;
        let  id=req.params.d;
        let up = await knex('person').where({id}).update({gender});
        if (up) {
          console.log(`Updated ${up} record`);
          res.send({gender:'updated'});
        } else {
          res.send({ message: 'not found' });
        }
      });
      app.get('/users/:e/:name/:gender/:username', async(req,res)=>{
        let {name,gender,username}=req.params;
        let  id=req.params.e;
        let up = await knex('person').where({id}).update({name,gender,username});
        if (up) {
          console.log(`Updated ${up} record`);
          res.send({name:'updated'});
        } else {
          res.send({ message: 'not found' });
        }
      });
      app.get('/users/:b',async (req,res)=>{
        let  id=req.params.b;
        let del=await knex('person').where({id}).delete();
        if(del){
          console.log("deleted",del);
          res.send(`deleted:${del}`);
        }else{
          res.send("not deleted");
        }
      });
      app.get('/products', async (req, res) => {
          let po= await knex.select("id","product_id","product_name","type",).from("products");
            console.log(po);
            res.send(po);
          });
        app.get('/fav', async(req,res)=>{
          let favo=await knex.select("userid","product_id").from("fav");
          console.log(favo);
          res.send(favo);
        });
        app.get('/fav/:s',async (req, res) => {
          let id=req.params.s;
          let next=await knex.select("userid","product_id").from("fav")
            if (next) {
              console.log(next);
            }
            let data=next.filter(e=>e.userid==id);
            res.send(data);
          });
    

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });