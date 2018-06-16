import { ModalComponent } from './modal.component';
import { SelectComponent } from './select.component'

class AppComponent {

    private modal = new ModalComponent();
    private select = new SelectComponent();

    constructor() {
        this.modal.modalLog();
        this.select.selectLog();
    }
}

let app = new AppComponent();