import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService{
    projects = [
        {
        'title': 'Mexichem Altamira',
        'detail' : [
          { 'task' : 'Tarea Altamira 1', 'detail':[
            { 'task' : 'Sub Tarea Altamira', 'detail':[], 'Descrip': 'Subtarea de 2 Nivel. ', 'icon': '' }
          ], 'Descrip': 'Desarrollo de Subtarea 1' },
          { 'task' : 'Tarea Altamira 2', 'detail':[], 'Descrip': 'Desarrollo de tarea 2' },
          { 'task' : 'Tarea Altamira 3', 'detail':[], 'Descrip': 'Desarrollo de tarea 3' },
          { 'task' : 'Tarea Altamira 4', 'detail':[], 'Descrip': 'Desarrollo de tarea 4' },
          { 'task' : 'Tarea Altamira 5', 'detail':[], 'Descrip': 'Desarrollo de tarea 5' },
          { 'task' : 'Tarea Altamira 6', 'detail':[], 'Descrip': 'Desarrollo de tarea 6' }
        ]
        },
        {
          'title': 'Walmart CCTV',
          'detail' : [
            { 'task' : 'Tarea Waltmart 1', 'detail':[], 'Descrip': 'Desarrollo de tarea 7' },
            { 'task' : 'Tarea Waltmart 2', 'detail':[], 'Descrip': 'Desarrollo de tarea 8' },
            { 'task' : 'Tarea Waltmart 3', 'detail':[], 'Descrip': 'Desarrollo de tarea 9' },
            { 'task' : 'Tarea Waltmart 4', 'detail':[], 'Descrip': 'Desarrollo de tarea 10' },
            { 'task' : 'Tarea Waltmart 5', 'detail':[], 'Descrip': 'Desarrollo de tarea 11' },
            { 'task' : 'Tarea Waltmart 6', 'detail':[], 'Descrip': 'Desarrollo de tarea 12' },
            { 'task' : 'Tarea Waltmart 7', 'detail':[], 'Descrip': 'Desarrollo de tarea 13' },
            { 'task' : 'Tarea Waltmart 8', 'detail':[], 'Descrip': 'Desarrollo de tarea 14' }
          ]
        },
        {
          'title': 'Mexichem Coatza',
          'detail' : [
            { 'task' : 'Tarea Coatza 1', 'detail':[], 'Descrip': 'Instalación de camaras, control de acceos, lectoras y controladoras, y mano de obra en planta' },
            { 'task' : 'Tarea Coatza 2', 'detail':[], 'Descrip': 'Desarrollo de tarea 16' },
            { 'task' : 'Tarea Coatza 3', 'detail':[], 'Descrip': 'Desarrollo de tarea 17' },
            { 'task' : 'Tarea Coatza 4', 'detail':[], 'Descrip': 'Desarrollo de tarea 18' },
            { 'task' : 'Tarea Coatza 5', 'detail':[], 'Descrip': 'Desarrollo de tarea 19' },
            { 'task' : 'Tarea Coatza 6', 'detail':[], 'Descrip': 'Desarrollo de tarea 20' },
            { 'task' : 'Tarea Coxatza 7', 'detail':[], 'Descrip': 'Desarrollo de tarea 21' },
            { 'task' : 'Tarea Coatza 8', 'detail':[], 'Descrip': 'Desarrollo de tarea 22' },
            { 'task' : 'Tarea Coatza 9', 'detail':[], 'Descrip': 'Desarrollo de tarea 23' },
            { 'task' : 'Tarea Coatza 10', 'detail':[], 'Descrip': 'Desarrollo de tarea 24' },
            { 'task' : 'Tarea Coatza 11', 'detail':[], 'Descrip': 'Desarrollo de tarea 25' },
            { 'task' : 'Tarea Coatza 12', 'detail':[], 'Descrip': 'Desarrollo de tarea 26' },
            { 'task' : 'Tarea Coatza 13', 'detail':[], 'Descrip': 'Desarrollo de tarea 27' },
            { 'task' : 'Tarea Coatza 14', 'detail':[], 'Descrip': 'Desarrollo de tarea 28' },
            { 'task' : 'Tarea Coatza 15', 'detail':[], 'Descrip': 'Desarrollo de tarea 29' },
            { 'task' : 'Tarea Coatza 16', 'detail':[], 'Descrip': 'Desarrollo de tarea 30' },
            { 'task' : 'Tarea Coatza 17', 'detail':[], 'Descrip': 'Desarrollo de tarea 31' }
          ]
        }
      ];
 



      public getProjects(){
          return this.projects;
      }
}