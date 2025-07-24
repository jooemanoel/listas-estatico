import { Component, signal } from '@angular/core';
import { Main } from './pages/main/main';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Main],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('listas-estatico');
}
