import { Component, effect, signal, ViewChild } from '@angular/core';
import { Home } from './pages/home/home';
import { SideMenu } from './components/side-menu/side-menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { ControleService } from './services/controle-service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Home, SideMenu, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  constructor(private updates: SwUpdate, private _snackBar: MatSnackBar, private controleService: ControleService) {
    effect(() => {
      if(this.controleService.menu()){
        this.drawer?.open();
      }
      else {
        this.drawer?.close();
      }
    });
  }
  ngOnInit(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates
        .pipe(filter((evt) => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this._snackBar
            .open('Nova versão disponível', 'Atualizar')
            .onAction()
            .subscribe(() => {
              this.updates
                .activateUpdate()
                .then(() => document.location.reload());
            });
        });
    }
  }
}
