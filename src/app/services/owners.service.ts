import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private owners = [
    {   id: 1, 
        nombre: 'IBM', 
        descripcion: 'International Business Machines Corporation es una empresa multinacional estadounidense que ofrece hardware, software y servicios de tecnología, conocida por su innovación en la computación empresarial, inteligencia artificial, y servicios en la nube.', 
        urlImg: '../../../assets/img/Logos/IBM.png',
        codeQR: 'IBM'
    },
    {   id: 2, 
        nombre: 'Red Hat', 
        descripcion: 'Una empresa de software estadounidense que provee soluciones de código abierto, especialmente conocida por su sistema operativo Red Hat Enterprise Linux y su contribución al desarrollo de software basado en Linux y tecnologías de contenedores.', 
        urlImg: '../../../assets/img/Logos/Redhat.png',
        codeQR: 'redhat' 
    },
    {   id: 3, 
        nombre: 'TCS', 
        descripcion: '(Tata Consultancy Services). Es una empresa india multinacional de tecnología de la información y consultoría, perteneciente al conglomerado Tata Group, que ofrece servicios en áreas como desarrollo de software, consultoría tecnológica, y soluciones empresariales.', 
        urlImg: '../../../assets/img/Logos/TCS.png',
        codeQR: 'tcs'
     },
    {   id: 4, 
        nombre: 'Telefonica', 
        descripcion: 'Es una empresa multinacional española de telecomunicaciones, una de las mayores a nivel mundial, que ofrece servicios de telefonía fija y móvil, internet, y televisión digital en varios países.', 
        urlImg: '../../../assets/img/Logos/telefonica.png',
        codeQR: 'telefonica'
     },
    {   id: 5, 
        nombre: 'BMC', 
        descripcion: 'BMC Software es una empresa estadounidense que desarrolla software empresarial para la gestión de sistemas, la automatización de procesos, la administración de servicios y la gestión de la nube.', 
        urlImg: '../../../assets/img/Logos/BMC.png',
        codeQR: 'BCM' 
    },
    {   id: 6, 
        nombre: 'Digitel', 
        descripcion: 'Es una empresa venezolana de telecomunicaciones que ofrece servicios de telefonía móvil, internet y otros servicios de telecomunicaciones en Venezuela. Es conocida por ser una de las principales operadoras móviles en el país.', 
        urlImg: '../../../assets/img/Logos/digitel.png',
        codeQR: 'digitel'  
    },
    {   id: 7, 
        nombre: 'Open Link', 
        descripcion: 'Es una empresa de software conocida por ofrecer soluciones de gestión de comercio de energía, gestión de riesgos y operaciones de materias primas. Sus productos son utilizados por empresas en los sectores de energía, commodities, y servicios financieros para optimizar sus operaciones y gestionar riesgos.', 
        urlImg: '../../../assets/img/Logos/openlink.png',
        codeQR: 'openlink'
    },
    {   id: 8, 
        nombre: 'Vierge Group', 
        descripcion: 'No tengo información específica sobre una empresa ampliamente reconocida con el nombre "Vierge Group". Podría tratarse de una empresa regional o menos conocida. Si tienes más detalles, podría intentar ayudarte mejor.', 
        urlImg: '../../../assets/img/Logos/vierge.png',
        codeQR: 'vierge group' 
    },
    {   id: 9, 
        nombre: 'NetReady', 
        descripcion: '**En construccion**', 
        urlImg: '../../../assets/img/Logos/Netready.png',
        codeQR: 'netready' 
    },
    {   id: 10, 
        nombre: 'IT Servicio', 
        descripcion: '**En Construccion**', 
        urlImg: '../../../assets/img/Logos/itservicio.png',
        codeQR: 'itservicios' 
    },
    {   id: 11, 
        nombre: 'Netview Sistema', 
        descripcion: '**En Construccion**', 
        urlImg: '../../../assets/img/Logos/netview.png',
        codeQR: 'netview' 
    },
  ];

  constructor() { }

  getOwner() {
    return of(this.owners);
  }
}
