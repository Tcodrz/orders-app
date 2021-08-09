import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';

export interface IFile {
  name: string;
  description: string;
  file: File;
}

const options = ['הזמנת רכש', 'אישור הזמנה', 'רשיון מוזיקה'];

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() update: EventEmitter<IFile[]> = new EventEmitter<IFile[]>();
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef(null);
  displayedColumns = ['remove', 'description', 'file'];
  fileAttr = 'בחר קובץ';
  file: File = new File([], '');
  files: IFile[] = [];
  fileDescription = '';
  fileTypeOptions = options;
  actualFiles: File[] = [];

  uploadFileEvt(event: any): void {
    if (event) {
      this.file = event.target.files[0];
      const iFile: IFile = {
        file: this.file,
        name: this.file.name,
        description: ''
      };
      this.fileAttr = this.file.name;
    }
  }

  addfile(): void {
    if (!this.file.name) { return; }
    else {
      const file: IFile = { name: this.file.name, description: this.fileDescription, file: this.file };
      this.files = [...this.files, file];
      this.update.emit(this.files);
      this.fileAttr = 'בחר קובץ';
      this.file = new File([], '');
      this.fileDescription = '';
    }
    this.update.emit(this.files);
  }

  removeFile(val: File): void {
    const file = this.files.find(f => f.name === val.name);
    if (file) {
      this.files = this.files.filter(f => f.name !== file.name);
    }
    this.update.emit(this.files);
  }

}
