import {Component, EventEmitter, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

// import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent {
    // @ViewChild('input')
    //     inputRef: ElementRef;

    @Output()
    filesSelected = new EventEmitter<File[]>();
    @Output()
    urlsSelected = new EventEmitter<string[]>();

    files: File[] = [];
    urls: (string | ArrayBuffer)[] = [];
    // imageChangedEvent: any = '';
    // croppedImage: any = '';
    // showCropper = false;
    // cropperSettings: CropperSettings;

    constructor() {
        // this.cropperSettings = new CropperSettings();
        // this.cropperSettings.width = 100;
        // this.cropperSettings.height = 100;
        // this.cropperSettings.croppedWidth = 100;
        // this.cropperSettings.croppedHeight = 100;
        // this.cropperSettings.canvasWidth = 400;
        // this.cropperSettings.canvasHeight = 300;
    }

//  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;


    drop(event: CdkDragDrop<File>) {
        moveItemInArray(this.urls, event.previousIndex, event.currentIndex);
    }

    // imageCropped(event: ImageCroppedEvent) {
    //   this.croppedImage = event.base64;
    //   console.log(event);
//  }
//     imageLoaded() {
//         this.showCropper = true;
//         console.log('Image loaded');
//     }
//
//     cropperReady() {
//         console.log('Cropper ready');
//     }
//
//     loadImageFailed() {
//         console.log('Load failed');
//     }

    onSelectFile(files: File[]) {
        if (!files) {
            return;
        }
        this.files = this.files.concat(files);
        console.log(this.files);
        this.filesSelected.emit(files);

        for (let i = 0; i < files.length; i++) {

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent) => {
                // console.log(reader.result);
                const content: string | ArrayBuffer = (e.target as FileReader).result;
                this.urls.push(content);

            };
            reader.readAsDataURL(files[i]);
        }

        // this.imageChangedEvent = this.displayFiles[0].file;
        this.urlsSelected.emit(this.urls as string[]);
        console.log(this.urls);
    }

    // fileChangeEvent(event: File) {
    //     // this.imageCropped()
    //     console.log(event);
    // }
}
