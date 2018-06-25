import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import { Network } from '@ionic-native/network';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {



private database: SQLiteObject;
private dbReady = new BehaviorSubject<boolean>(false);


ticketsR = [];


  public online: boolean;
//hasTicketsPendings = false;
// 

  constructor(private platform:Platform, private sqlite:SQLite,private sqlitePorter: SQLitePorter, public http: Http, private network: Network) {
    this.platform.ready().then(()=>{

 //FUNCIONES PARA REVISAR CONEXION

/*
this.network.onDisconnect().subscribe(() => {
   this.online = false;
    console.log("Internet =" + this.online);
});

this.network.onConnect().subscribe(() => {
    this.online = true;
    console.log("Internet ="  + this.online);
});*/
//FUNCIONES PARA REVISAR CONEXION

this.sqlite.create({ name: 'local.db', location: 'default'})
    .then((db:SQLiteObject)=>{ 
      this.database = db; 
      this.createTable()

      /*.then(()=>{     
          //communicate we are ready!
          this.dbReady.next(true);
        });*/

      })
let url = "http://10.10.1.136:81/apiservice/public/api/v1/tickets";
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');

this.http.get(url, {headers: headers2}).subscribe(data => {
this.ticketsR = data.json();

//console.log( "test" , data.json()); //debug



 
// Sync process

 this.syncFULL();

//sync process
})
    

 });  }

//...more stuff...

/* unusefullCode

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

 
*/




//FUNCIONES CRUD 
 createTable(){
  //console.log("creating ticket table if it does not exist");
 // let sql = 'DROP TABLE tickets';
  //let sql = 'CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
  //let sql = 'DROP TABLE ticketsPending';
  let sql = 'CREATE TABLE IF NOT EXISTS ticketsPending(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, subject TEXT, status ENUM, priority ENUM, project_id INTEGER,task_id INTEGER, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
  //let sql = 'CREATE TABLE IF NOT EXISTS registro(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, description TEXT, status ENUM, priority ENUM, project_id INTEGER,task_id INTEGER, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
 // let sql2 ='CREATE TABLE IF NOT EXISTS ticketsPending(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, subject TEXT, status ENUM, priority ENUM, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
 // let sql3= sql + sql2 ;
  return this.database.executeSql(sql, []).catch((err)=>console.log("error detected creating tables", err));
 }

//volver esto una sola funcion para hacerla reutilizable
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
/*
getTable(table, row){
  let sql = 'SELECT * FROM '+ table ;
  return this.database.executeSql(sql, [])
  .then(response => {
    let row = [];
    for (let index = 0; index < response.rows.length; index++) {
      row.push( response.rows.item(index) );
    }
    return Promise.resolve( row );
  })
  .catch(error => Promise.reject(error));
}
*/
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

create(ticket: any){
  console.log(ticket);
  let sql = 'INSERT INTO ticketsPending( user_id , subject , status , priority, project_id ,  task_id,  channel_id , type_id , created_at ) VALUES(  ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return this.database.executeSql(sql, [  1  , ticket.subject, 'open', ticket.priority, ticket.project_id , ticket.task_id ,1 , 2 , ticket.created_at ]).catch((err)=>console.log("tables not droped", err));
}

createRegistro( registro: object , id : any){
  console.log("despues sqlite" + registro);
 // console.log("despues sqlite" + id);
   this.http.post("http://10.10.1.108:81/apiservice/public/api/v1/tasks/" +id +"/registros", registro).subscribe( 
   response=>{ console.log( response);  });
     
  /*
  let sql = 'INSERT INTO ticketsPending( user_id , subject , status , priority, project_id ,  task_id,  channel_id , type_id , created_at ) VALUES(  ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return this.database.executeSql(sql, [  1  , ticket.subject, 'open', ticket.priority, ticket.project_id , ticket.task_id ,1 , 2 , ticket.created_at ]);
*/
}


// unused CRUD FUNCTIONS
delete(tickets: any){
  let sql = 'DELETE FROM ticketsPending WHERE id=?';
  return this.database.executeSql(sql, [tickets.id]);
}

update(tickets: any){
    let sql = 'UPDATE tickets SET title=?, completed=? WHERE id=?';
    return this.database.executeSql(sql, [tickets.subject, tickets.priority, tickets.id]);
  }

//
//funciones CRUD 

//FUNCIONES SYNC 

syncFULL(){
  console.log("Checking internet availabilty");
  if (this.network.type != "none"){  
  console.log("Internet available Sync starting");
  this.syncLocalToRemote();
  this.deleteTicketsPending();
let url = "http://10.10.1.108:81/apiservice/public/api/v1/tickets";
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');

this.http.get(url, {headers: headers2}).subscribe(data => {
this.ticketsR = data.json();
})

  this.syncRemoteToLocal(this.ticketsR);
  } else{console.log("No acces to internet");}
}

syncRemoteToLocal(ticketsR){

 
let sqlJsonBlock = {
   "structure":{
        "tables":{
            "tickets":"([id] INTEGER PRIMARY KEY AUTOINCREMENT, [user_id] INTEGER, [subject] TEXT, [status] ENUM, [priority] ENUM, [project_id] INTEGER, [task_id] INTEGER, [agent_id] INTEGER, [channel_id] INTEGER, [type_id] INTEGER, [created_at] TIMESTAMP, [updated_at] TIMESTAMP, [deleted_at] TIMESTAMP )"
        }
       
    },
    "data":{
        "inserts":{
            "tickets":this.ticketsR
        }
    }
};
console.log(sqlJsonBlock);
 this.database.executeSql('DELETE FROM tickets', []).catch((err)=>console.log("tables not droped", err));
 this.sqlitePorter.importJsonToDb( this.database, sqlJsonBlock).then(() => console.log('Imported'))
  .catch(e => console.error(e));;

}



syncLocalToRemote(){
  let sql = 'SELECT * FROM ticketsPending';
  return this.database.executeSql(sql, []).then(response => {

  let ticketsPending = [];

  for (let index = 0; index < response.rows.length; index++) {
      ticketsPending.push( response.rows.item(index) );

    }

  return Promise.resolve( ticketsPending ).then(response=>{ 
    console.log(ticketsPending.length);//debug

if(ticketsPending.length > 0){
   for(let index2 = 0; index2 < ticketsPending.length; index2++){
  
  delete ticketsPending[index2].id;
  this.http.post("http://10.10.1.136:81/apiservice/public/api/v1/tickets", ticketsPending[index2]).subscribe( 
   response=>{ console.log( response);}
   /*

      suc => {
      this.deleteTicketsPending(); 
            console.log(suc);
        },
        err => {
            console.log(err );
        }
*/
        );
      }
  } else{ console.log("No hay tickets pendientes"); }
  
  });
   // 
      //this.http.post("http://10.10.1.108:81/apiservice/public/api/v1/tickets", JSON.stringify(data) }
  })
  .catch(error => Promise.reject(error));
}


deleteTicketsPending(){
let sql = 'DELETE FROM ticketsPending';
return this.database.executeSql(sql, []);
}
//funciones Sync



}





