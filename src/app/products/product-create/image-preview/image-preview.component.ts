import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {
    CdkDrag,
    CdkDragStart,
    CdkDropList, CdkDropListGroup, CdkDragMove, CdkDragEnter,
    moveItemInArray
} from '@angular/cdk/drag-drop';
import {ViewportRuler} from '@angular/cdk/overlay';


@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements AfterViewInit {


    constructor(private viewportRuler: ViewportRuler) {
        this.target = null;
        this.source = null;
    }

    @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
    @ViewChild(CdkDropList) placeholder: CdkDropList;

    public target: CdkDropList;
    public targetIndex: number;
    public source: CdkDropList;
    public sourceIndex: number;
    public dragIndex: number;
    public activeContainer;

    @Output()
    filesSelected = new EventEmitter<File[]>();
    @Output()
    urlsSelected = new EventEmitter<string[]>();

    files: File[] = [];
    urls: (string | ArrayBuffer)[] = [];

    indexOf(collection, node) {
        return Array.prototype.indexOf.call(collection, node);
    }


    // drop(event: CdkDragDrop<File>) {
    //     moveItemInArray(this.urls, event.previousIndex, event.currentIndex);
    // }

    /** Determines whether an event is a touch event. */
    isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
        return event.type.startsWith('touch');
    }

    isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
        const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
        return y >= top && y <= bottom && x >= left && x <= right;
    }

    ngAfterViewInit() {
        const phElement = this.placeholder.element.nativeElement;

        phElement.style.display = 'none';
        phElement.parentNode.removeChild(phElement);
    }

    onSelectFile(files: File[]) {
        if (!files) {
            return;
        }
        this.files = this.files.concat(files);
        console.log(this.files);

        for (let i = 0; i < files.length; i++) {

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent) => {
                // console.log(reader.result);
                const content: string | ArrayBuffer = (e.target as FileReader).result;
                this.urls.push(content);

                // this.addItem(content);
            };
            reader.readAsDataURL(files[i]);

        }

        // this.imageChangedEvent = this.displayFiles[0].file;
        this.urlsSelected.emit(this.urls as string[]);
        this.filesSelected.emit(files);
        console.log(this.urls);

    }

    dragMoved(e: CdkDragMove) {
        const point = this.getPointerPositionOnPage(e.event);

        this.listGroup._items.forEach(dropList => {
            if (this.isInsideDropListClientRect(dropList, point.x, point.y)) {
                this.activeContainer = dropList;
                return;
            }
        });
    }

    dropListDropped() {
        if (!this.target) {
            return;
        }

        const phElement = this.placeholder.element.nativeElement;
        const parent = phElement.parentElement;

        phElement.style.display = 'none';

        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

        this.target = null;
        this.source = null;

        if (this.sourceIndex !== this.targetIndex) {
            moveItemInArray(this.urls, this.sourceIndex, this.targetIndex);
        }
    }

    dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
        if (drop === this.placeholder) {
            return true;
        }

        if (drop !== this.activeContainer) {
            return false;
        }

        const phElement = this.placeholder.element.nativeElement;
        const sourceElement = drag.dropContainer.element.nativeElement;
        const dropElement = drop.element.nativeElement;

        const dragIndex = this.indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
        const dropIndex = this.indexOf(dropElement.parentElement.children, dropElement);

        if (!this.source) {
            this.sourceIndex = dragIndex;
            this.source = drag.dropContainer;

            phElement.style.width = sourceElement.clientWidth + 'px';
            phElement.style.height = sourceElement.clientHeight + 'px';

            sourceElement.parentElement.removeChild(sourceElement);
        }

        this.targetIndex = dropIndex;
        this.target = drop;

        phElement.style.display = '';
        dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
            ? dropElement.nextSibling : dropElement));

        this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
        return false;
    }

    getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        const point = this.isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();

        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top
        };
    }


    onDelete(url: string | ArrayBuffer) {
        this.urls.splice(this.urls.indexOf(url), 1);
        this.files.splice(this.urls.indexOf(url), 1);
        this.filesSelected.emit(this.files);
        this.urlsSelected.emit(this.urls as string[]);
    }
}
