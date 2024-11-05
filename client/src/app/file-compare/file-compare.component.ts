import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-compare',
  templateUrl: './file-compare.component.html',
  styleUrls: ['./file-compare.component.scss']
})
export class FileCompareComponent {
  file1: File | null = null;
  file2: File | null = null;
  comparisonResult: any;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any, fileNumber: number): void {
    const file = event.target.files[0];
    if (fileNumber === 1) {
      this.file1 = file;
    } else if (fileNumber === 2) {
      this.file2 = file;
    }
  }

  compareFiles(): void {
    if (!this.file1 || !this.file2) {
      alert('Please select both files.');
      return;
    }

    const formData = new FormData();
    formData.append('file1', this.file1);
    formData.append('file2', this.file2);

    this.http.post('/api/compare', formData).subscribe(
      (response) => {
        this.comparisonResult = response;
      },
      (error) => {
        console.error('Error comparing files:', error);
      }
    );
  }
}
