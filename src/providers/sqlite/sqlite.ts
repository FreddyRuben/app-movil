import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import { Network } from '@ionic-native/network';

@Injectable()
export class SqliteProvider {



private database: SQLiteObject;
private dbReady = new BehaviorSubject<boolean>(false);


ticketsR = [];
ip = "http://10.10.1.86/api/public/index.php/api";
// ip = "http://198.50.116.250/worksuite/apinetwork/public/index.php/api/v1/";
resToken;
responseLocaltoRemote;
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjgsImlzcyI6Imh0dHA6Ly8xMC4xMC4xLjg2L2FwaTAxY29waWEvcHVibGljL2luZGV4LnBocC9hcGkvbG9naW4iLCJpYXQiOjE1MzM5NDEzNzIsImV4cCI6MTUzMzk0MTk3MiwibmJmIjoxNTMzOTQxMzcyLCJqdGkiOiJ6NGVaYzhQdWpvSUZJUnA1In0.-xjD8UOl4g9ZhFC2nUU_nfJw5XnO13iywBxmCGN41XQ";
public online: boolean;


  constructor(private platform:Platform, private sqlite:SQLite,private sqlitePorter: SQLitePorter, public http: Http, private network: Network) {
    this.platform.ready().then(()=>{



this.sqlite.create({ name: 'local.db', location: 'default'})
    .then((db:SQLiteObject)=>{ 
      this.database = db; 
      this.createTable()

      /*.then(()=>{     
          //communicate we are ready!
          this.dbReady.next(true);
        });*/

      })

    

 });  }



//FUNCIONES LOGIN

login(username: string, password: string) :string{

let url = this.ip + "/login";

let result = "false";

  let headers2 = new Headers();

  headers2.append('Content-Type', 'application/json');
  headers2.append('Access-Control-Allow-Origin' , '*');
  headers2.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers2.append('Content-Type','application/x-www-form-urlencoded');

  let data = {
    name: username,
    password: password
  };

  this.http.post(url, JSON.stringify(data) , {headers: headers2})
    .subscribe(data => {
      // console.log(data);
      this.resToken = data.json();
      this.token = this.resToken.token;

      let result = "true";
      console.log(this.resToken.status);


// if (this.resToken.status = "success"){
// this.token = this.resToken.token;
// console.log(this.token);
//NEWCODE
// let url = this.ip +  "tickets";
// let headers2 = new Headers();
// headers2.append('Accept','application/json');
// headers2.append('content-type','application/json');
// headers2.append('Authorization','Bearer '+this.token);
// console.log(headers2);
// return this.http.get(url, {headers: headers2}).subscribe(data => {
// this.ticketsR = data.json();

//console.log( "test" , data.json()); //debug




 
// Sync process
 
//  this.syncFULL();

//sync process
// })//NEWCODE

    //     }
       
       
       
    //  }, error => { console.log(error); })

  }, error => { console.log(error); let result = "false"; });

  return result;
}
       


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
let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
   this.http.post(this.ip + "tasks/" +id +"/registros", registro,{headers: headers2}).subscribe( 
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
this.syncLocalToRemote(); // hacer una promesa  en success delete pending
//this.deleteTicketsPending()
let url = this.ip + "tickets";
let headers2 = new Headers();
//revisar que este bien esto porque no funciona
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
this.http.get(url, {headers: headers2}).subscribe(data => {
this.ticketsR = data.json();
})
// el sinc  con refresh
this.syncRemoteToLocal(this.ticketsR);// este esta bien
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

let headers2 = new Headers();
headers2.append('Accept','application/json');
headers2.append('content-type','application/json');
headers2.append('Authorization','Bearer '+this.token);
console.log(headers2);
console.log(this.token);
console.log(ticketsPending[index2]);
  this.http.post(this.ip + "tickets", ticketsPending[index2], {headers:headers2}).subscribe( 
   data=>{ 
   	this.responseLocaltoRemote = data.json();
    console.log(data.json());
   	if(this.responseLocaltoRemote.created == true){ this.deleteTicketsPending(); }else(console.log("Error on post local to remote" + this.responseLocaltoRemote))

   },
  error => {
            console.log(error );
   }
  
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





