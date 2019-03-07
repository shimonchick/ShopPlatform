import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

@Component({
    selector: 'app-upload-task',
    templateUrl: './upload-task.component.html',
    styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

    @Input() file: File;
    @Output() delete = new EventEmitter<File>();
    @Output() finished = new EventEmitter<string>();

    task: AngularFireUploadTask;
    ref: AngularFireStorageReference;
    downloadURL: string;

    percentage: Observable<number>;
    snapshot: Observable<any>;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.startUpload();

    }

    startUpload() {

        // TODO: get user id and replace it with the current time
        // The storage path
        const path = `images/${Date.now()}_${this.file.name}`;

        // Reference to storage bucket
        this.ref = this.storage.ref(path);

        // The main task
        this.task = this.storage.upload(path, this.file);

        // Progress monitoring
        this.percentage = this.task.percentageChanges();

        this.snapshot = this.task.snapshotChanges().pipe(
            tap(upload => console.log(upload)),
            // The file's download URL
            finalize(async () => {
                this.downloadURL = await this.ref.getDownloadURL().toPromise();
                console.log('%c downloadURL: ', 'color: brown');
                console.log(this.downloadURL);
                // this.db.collection('files').add({downloadURL: this.downloadURL, path});
                this.finished.emit(this.downloadURL);
            }),
        );
    }

    remove() {
        this.ref.delete();
        this.delete.emit(this.file);
    }

}

