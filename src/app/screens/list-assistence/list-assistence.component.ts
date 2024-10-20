import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { firebaseService } from '../../services/firebase.service';
import { LocalNotificationsService } from '../../services/localnotifications.service';

// Confetto class
class Confetto {
  color: { front: string; back: string };
  dimensions: { x: number; y: number };
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  velocity: { x: number; y: number };
  randomModifier: number;

  constructor(private parent: ListAssistenceComponent) {
    this.randomModifier = this.parent.randomRange(0, 99);
    this.color =
      this.parent.colors[
        Math.floor(this.parent.randomRange(0, this.parent.colors.length))
      ];
    this.dimensions = {
      x: this.parent.randomRange(25, 30),
      y: this.parent.randomRange(31, 36),
    };
    this.position = {
      x: this.parent.randomRange(
        this.parent.canvas.width / 2 - this.parent.button.offsetWidth / 6,
        this.parent.canvas.width / 2 + this.parent.button.offsetWidth / 6
      ),
      y: this.parent.randomRange(
        this.parent.canvas.height / 2 +
          this.parent.button.offsetHeight / 2 +
          10,
        this.parent.canvas.height / 2 +
          1.5 * this.parent.button.offsetHeight -
          10
      ),
    };
    this.rotation = this.parent.randomRange(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = this.parent.initConfettoVelocity([-9, 9], [6, 11]);
  }

  update(): void {
    this.velocity.x -= this.velocity.x * this.parent.dragConfetti;
    this.velocity.y = Math.min(
      this.velocity.y + this.parent.gravityConfetti,
      this.parent.terminalVelocity
    );
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
  }
}

// Sequin class
class Sequin {
  color: string;
  radius: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };

  constructor(private parent: ListAssistenceComponent) {
    this.color =
      this.parent.colors[
        Math.floor(this.parent.randomRange(0, this.parent.colors.length))
      ].back;
    this.radius = this.parent.randomRange(1, 2);
    this.position = {
      x: this.parent.randomRange(
        this.parent.canvas.width / 2 - this.parent.button.offsetWidth / 3,
        this.parent.canvas.width / 2 + this.parent.button.offsetWidth / 3
      ),
      y: this.parent.randomRange(
        this.parent.canvas.height / 2 + this.parent.button.offsetHeight / 2 + 8,
        this.parent.canvas.height / 2 +
          1.5 * this.parent.button.offsetHeight -
          8
      ),
    };
    this.velocity = {
      x: this.parent.randomRange(-6, 6),
      y: this.parent.randomRange(-8, -12),
    };
  }

  update(): void {
    this.velocity.x -= this.velocity.x * this.parent.dragSequins;
    this.velocity.y += this.parent.gravitySequins;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

@Component({
  selector: 'app-list-assistence',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-assistence.component.html',
  styleUrl: './list-assistence.component.scss',
})
export class ListAssistenceComponent implements OnDestroy, OnInit {
  public transition = false;
  public loading = false;
  public employes: any;
  public codesEmployes: string[] = [];

  // LOTTERY VARIABLE

  selected: string = '';
  public covered: string = '';
  timer: any;
  replacements: string = '0123456789XVEP';
  replacementsLen: number = this.replacements.length;

  // CONFETTI VARIABLE

  confettiCount = 20;
  sequinCount = 10;

  gravityConfetti = 0.3;
  gravitySequins = 0.55;
  dragConfetti = 0.075;
  dragSequins = 0.02;
  terminalVelocity = 3;

  colors = [
    { front: '#7b5cff', back: '#6245e0' }, // Purple
    { front: '#b3c7ff', back: '#8fa5e5' }, // Light Blue
    { front: '#5c86ff', back: '#345dd1' }, // Darker Blue
  ];

  confetti: Confetto[] = [];
  sequins: Sequin[] = [];
  disabled = false;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  cx!: number;
  cy!: number;

  button!: HTMLElement;

  constructor(
    private router: Router,
    private firebaseService: firebaseService,
    public _notifications: LocalNotificationsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.getEmpleados();
  }

  getEmpleados() {
    this.firebaseService.getEmployes().subscribe(
      (employes) => {
        this.employes = employes;

        this.employes.map((el: any) => {
          this.codesEmployes.push(el.codigoEmpleado);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  start() {
    this.selected =
      this.codesEmployes[
        Math.floor(Math.random() * this.codesEmployes.length)
      ].toUpperCase();
    this.covered = this.selected.replace(/[^\s]/g, '_');
    this.timer = setInterval(() => this.decode(), 50);
  }

  decode() {
    const newText = this.covered
      .split('')
      .map(this.changeLetter.bind(this))
      .join('');
    if (this.selected === this.covered) {
      clearInterval(this.timer);
      this.winnerRevealed();
      return;
    }
    this.covered = newText;
  }

  changeLetter(letter: string, index: number) {
    return this.selected[index] === letter
      ? letter
      : this.replacements[Math.floor(Math.random() * this.replacementsLen)];
  }

  winnerRevealed() {
    this.resizeCanvas();
    this.initBurst();
    this.render();
    this._notifications.openToast('Ganador Encontrado');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Solo se ejecuta en el navegador
      console.log(this.platformId);
      this.button = document.getElementById('button') as HTMLElement;
      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      /* this.resizeCanvas();
      this.initBurst();
      this.render(); */
      window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
  }

  randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  initConfettoVelocity(
    xRange: number[],
    yRange: number[]
  ): { x: number; y: number } {
    const x = this.randomRange(xRange[0], xRange[1]);
    const range = yRange[1] - yRange[0] + 1;
    let y =
      yRange[1] -
      Math.abs(this.randomRange(0, range) + this.randomRange(0, range) - range);
    if (y >= yRange[1] - 1) {
      y += Math.random() < 0.25 ? this.randomRange(1, 3) : 0;
    }
    return { x, y: -y };
  }

  initBurst(): void {
    for (let i = 0; i < this.confettiCount; i++) {
      this.confetti.push(new Confetto(this));
    }
    for (let i = 0; i < this.sequinCount; i++) {
      this.sequins.push(new Sequin(this));
    }
  }

  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cx = this.ctx.canvas.width / 2;
    this.cy = this.ctx.canvas.height / 2;
  }

  render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.confetti.forEach((confetto, index) => {
      confetto.update();
      const width = confetto.dimensions.x * confetto.scale.x;
      const height = confetto.dimensions.y * confetto.scale.y;

      this.ctx.translate(confetto.position.x, confetto.position.y);
      this.ctx.rotate(confetto.rotation);
      this.ctx.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
      this.ctx.fillRect(-width / 2, -height / 2, width, height);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (confetto.velocity.y < 0) {
        this.ctx.clearRect(
          this.canvas.width / 2 - this.button.offsetWidth / 2,
          this.canvas.height / 2 + this.button.offsetHeight / 2,
          this.button.offsetWidth,
          this.button.offsetHeight
        );
      }
    });

    this.sequins.forEach((sequin) => {
      sequin.update();
      this.ctx.translate(sequin.position.x, sequin.position.y);
      this.ctx.fillStyle = sequin.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (sequin.velocity.y < 0) {
        this.ctx.clearRect(
          this.canvas.width / 2 - this.button.offsetWidth / 2,
          this.canvas.height / 2 + this.button.offsetHeight / 2,
          this.button.offsetWidth,
          this.button.offsetHeight
        );
      }
    });

    window.requestAnimationFrame(() => this.render());
  }

  clickButton(): void {
    if (!this.disabled) {
      this.disabled = true;
      this.button.classList.add('loading');
      this.button.classList.remove('ready');
      setTimeout(() => {
        this.button.classList.add('complete');
        this.button.classList.remove('loading');
        setTimeout(() => {
          this.initBurst();
          setTimeout(() => {
            this.disabled = false;
            this.button.classList.add('ready');
            this.button.classList.remove('complete');
          }, 4000);
        }, 320);
      }, 1800);
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clickButton();
    }
  }
}
