import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Input() dropped = new EventEmitter<FileList>();
  @Input() hovered = new EventEmitter<boolean>();

  // Listening to the drop event
  @HostListener('drop', ['$event'])
  // tslint:disable-next-line: typedef
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  // Listening to drag over and drag leave events
  @HostListener('dragover', ['$event'])
  // tslint:disable-next-line: typedef
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  // Listening to drag over and drag leave events
  @HostListener('dragleave', ['$event'])
  // tslint:disable-next-line: typedef
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

  constructor() { }

}
