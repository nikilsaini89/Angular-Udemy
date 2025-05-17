import { Directive, ElementRef, inject, Input } from "@angular/core";


@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage'
    }   
})

export class SafeLinkDirective{


    // @Input({alias: 'appSafeLink', required: true}) queryParam!: string;
    // queryParam = input
    private hostEleRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log('In directive')
    }

    private onConfirmLeavePage(event: MouseEvent): void {
        const wantsToLeave = window.confirm('Are you sure you want to leave?')
        
        if(wantsToLeave){
            const link = this.hostEleRef.nativeElement.href;
            this.hostEleRef.nativeElement.href = link + '?from=' + 'queryParam';
            return;
        }
    }

}