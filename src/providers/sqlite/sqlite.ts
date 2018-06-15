import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {



private database: SQLiteObject;
private dbReady = new BehaviorSubject<boolean>(false);

  //...some stuff...
ticketsR = [];


  constructor(private platform:Platform, private sqlite:SQLite,private sqlitePorter: SQLitePorter, public http: Http) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'local.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;

        this.createTable().then(()=>{     
          //communicate we are ready!
          this.dbReady.next(true);
        });
      })

let url = "http://10.10.1.108:81/apiservice/public/api/v1/tickets";
  let headers2 = new Headers();
    headers2.append('Accept','application/json');
    headers2.append('content-type','application/json');
this.http.get(url, {headers: headers2}).subscribe(data => {
this.ticketsR = data.json();
console.log( "test" , data.json());
this.syncLocalToRemote();
this.syncRemoteToLocal(this.ticketsR);
this.deleteTicketsPending()
 })

    });
  }

//...more stuff...



  private isReady(){
    return new Promise((resolve, reject) =>{
      //if dbReady is true, resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){ 
            resolve(); 
          }
        });
      }  
    })
  }

 



 
//funciones CRUD 
 createTable(){
  console.log("creating ticket table if it does not exist");
 // let sql = 'DROP TABLE tickets';
  //let sql = 'CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
  let sql = 'CREATE TABLE IF NOT EXISTS ticketsPending(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, subject TEXT, status ENUM, priority ENUM, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
 // let sql2 ='CREATE TABLE IF NOT EXISTS ticketsPending(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, subject TEXT, status ENUM, priority ENUM, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
 // let sql3= sql + sql2 ;
  return this.database.executeSql(sql, []).catch((err)=>console.log("error detected creating tables", err));
 }


getAll(){
  let sql = 'SELECT * FROM tickets';
  return this.database.executeSql(sql, [])
  .then(response => {
    let tickets = [];
    for (let index = 0; index < response.rows.length; index++) {
      tickets.push( response.rows.item(index) );
    }
    return Promise.resolve( tickets );
  })
  .catch(error => Promise.reject(error));
}

getAll2(){
  let sql = 'SELECT * FROM ticketsPending';
  return this.database.executeSql(sql, [])
  .then(response => {
    let ticketsPending = [];
    for (let index = 0; index < response.rows.length; index++) {
      ticketsPending.push( response.rows.item(index) );
    }
    return Promise.resolve( ticketsPending );
  })
  .catch(error => Promise.reject(error));
}
//sinc functions
syncRemoteToLocal(ticketsR){

 
let sqlJsonBlock = {
   "structure":{
        "tables":{
            "tickets":"([id] INTEGER PRIMARY KEY AUTOINCREMENT, [user_id] INTEGER, [subject] TEXT, [status] ENUM, [priority] ENUM, [agent_id] INTEGER, [channel_id] INTEGER, [type_id] INTEGER, [created_at] TIMESTAMP, [updated_at] TIMESTAMP, [deleted_at] TIMESTAMP )"
        }
       
    },
    "data":{
        "inserts":{
            "tickets":this.ticketsR
        }
    }
};
console.log(sqlJsonBlock);
 this.database.executeSql('DROP TABLE IF EXISTS artists', []).catch((err)=>console.log("tables not droped", err));
 this.sqlitePorter.importJsonToDb( this.database, sqlJsonBlock).then(() => console.log('Imported'))
  .catch(e => console.error(e));;

}




syncLocalToRemote(){
  let sql = 'SELECT * FROM ticketsPending';
  return this.database.executeSql(sql, [])
  .then(response => {
    let ticketsPending = [];
    for (let index = 0; index < response.rows.length; index++) {
      ticketsPending.push( response.rows.item(index) );
    }
    return Promise.resolve( ticketsPending ).then(response=>{ console.log(ticketsPending);
this.http.post("http://10.10.1.108:81/apiservice/public/api/v1/tickets", JSON.stringify(ticketsPending)).subscribe(response => {
    return console.log(JSON.stringify(response));
});

     });
   // 
      //this.http.post("http://10.10.1.108:81/apiservice/public/api/v1/tickets", JSON.stringify(data) }
  })
  .catch(error => Promise.reject(error));
}

deleteTicketsPending(){
let sql = 'DELETE * FROM ticketsPending';
return this.database.executeSql(sql, [])
}
//sinc functions

create(ticket: any){
  console.log(ticket);
  let sql = 'INSERT INTO ticketsPending( user_id , subject , status , priority ,  channel_id , type_id , created_at ) VALUES(  ?, ?, ?, ?, ?, ?, ?)';
  return this.database.executeSql(sql, [  1  , ticket.subject, 'open', ticket.priority, 1 , ticket.type_id, ticket.created_at ]);
}



delete(tickets: any){
  let sql = 'DELETE FROM tickets WHERE id=?';
  return this.database.executeSql(sql, [tickets.id]);
}

update(tickets: any){
    let sql = 'UPDATE tickets SET title=?, completed=? WHERE id=?';
    return this.database.executeSql(sql, [tickets.subject, tickets.priority, tickets.id]);
  }


}





/*
delete(task: any){
  let sql = 'DELETE FROM tasks WHERE id=?';
  return this.db.executeSql(sql, [task.id]);
}

update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }
*/