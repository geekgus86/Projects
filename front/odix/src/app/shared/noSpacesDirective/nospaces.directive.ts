import {
 Directive,
 ElementRef,
 HostListener
} from '@angular/core';

@Directive({
 selector: '[nospaces]'
})
export class NoWhitespaceDirective {
	private specialKeys: Array < string > = ['Backspace', 'Tab', 'End', 'Home', '-'];

	constructor(private el: ElementRef) {}
	@HostListener('input', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if (this.specialKeys.indexOf(event.key) !== -1) {
			return;
		}
		let current: string = this.el.nativeElement.value;
		let next: string = current.concat(event.key);
		if (next && String(next).includes(' ')) {
			this.el.nativeElement.value = this.el.nativeElement.value.replace(/\s/g, "");
			event.preventDefault();
		}
	}
}