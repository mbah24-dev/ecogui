import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss']
})
export class AlertNotificationComponent {
    @Input() message: string = '';
    @Input() type: 'success' | 'error' | 'info' = 'success';
    @Output() closeAlert = new EventEmitter<void>();

    visible = true;

    close() {
      this.visible = false;
      this.closeAlert.emit();
    }
}
