import { Component } from '@angular/core';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [ AutoFocusModule, ButtonModule, InputTextModule, PasswordModule, RouterLink ],
  templateUrl: './sing-in.component.html',
  styles: ``
})
export class SingInComponent {

}
