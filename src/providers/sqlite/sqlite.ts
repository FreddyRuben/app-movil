
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

  constructor(private platform:Platform, private sqlite:SQLite) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'todos.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;

        this.createTable().then(()=>{     
          //communicate we are ready!
          this.dbReady.next(true);
        });
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
 // let sql = 'DROP TABLE tickets';
  //let sql = 'CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
  let sql = 'CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, subject TEXT, status ENUM, priority ENUM, agent_id INTEGER, channel_id INTEGER, type_id INTEGER, created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)';
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

create(ticket: any){
  let sql = 'INSERT INTO tickets( user_id , subject, status, priority,  type_id, created_at ) VALUES( ?, ?, ?, ?, ?, ?)';
  return this.database.executeSql(sql, ['00001', ticket.subject,'pendiente', ticket.priority, ticket.type_id, ticket.created_at ]);
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