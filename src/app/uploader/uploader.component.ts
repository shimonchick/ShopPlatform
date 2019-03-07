import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

    fileURL = new EventEmitter();

    isHovering: boolean;

    @Output() urls = new EventEmitter<string[]>();
    currentURLs: string[] = [];
    files: File[] = [];

    toggleHover(event: boolean) {
        this.isHovering = event;
        console.log(this.isHovering);
    }

    onDrop(files: FileList) {
        if (!files) {
            return;
        }
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }

        console.log(this.files);
    }

    onDelete(file: File) {
        this.files.splice(this.files.indexOf(file), 1);

    }

    onFinished(url: string) {
        this.currentURLs.push(url);
        this.urls.emit(this.currentURLs);
    }
}
