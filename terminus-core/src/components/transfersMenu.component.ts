import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FileDownload, FileTransfer, PlatformService } from '../api/platform'

/** @hidden */
@Component({
    selector: 'transfers-menu',
    template: require('./transfersMenu.component.pug'),
    styles: [require('./transfersMenu.component.scss')],
})
export class TransfersMenuComponent {
    @Input() transfers: FileTransfer[]
    @Output() transfersChange = new EventEmitter<FileTransfer[]>()

    constructor (private platform: PlatformService) { }

    isDownload (transfer: FileTransfer): boolean {
        return transfer instanceof FileDownload
    }

    getProgress (transfer: FileTransfer): number {
        return Math.round(100 * transfer.getCompletedBytes() / transfer.getSize())
    }

    showTransfer (transfer: FileTransfer): void {
        const fp = transfer['filePath']
        if (fp) {
            this.platform.showItemInFolder(fp)
        }
    }

    removeTransfer (transfer: FileTransfer): void {
        if (!transfer.isComplete()) {
            transfer.cancel()
        }
        this.transfers = this.transfers.filter(x => x !== transfer)
        this.transfersChange.emit(this.transfers)
    }
}
