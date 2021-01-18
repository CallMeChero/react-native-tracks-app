import { Subject } from 'rxjs';

const subject = new Subject();

export const ModalService = {
    openModal: (bool) => subject.next(bool),
    getIsOpen: () => subject.asObservable()
};