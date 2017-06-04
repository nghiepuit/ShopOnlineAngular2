import {
	Component,
	OnDestroy,
	AfterViewInit,
	EventEmitter,
	Input,
	Output
} from '@angular/core';

@Component({
	selector: 'app-tiny-mce',
	templateUrl: './tiny-mce.component.html',
	styleUrls: ['./tiny-mce.component.css']
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {

	@Input() elementId: String;
	@Output() onEditorKeyup = new EventEmitter<any>();
	@Input() content: string;
	editor;

	ngAfterViewInit() {
		tinymce.baseURL = "/assets/tinymce";
		tinymce.init({
			selector: '#' + this.elementId,
			language: 'vi_VN',
			skin_url: '/assets/tinymce/skins/lightgray',
			language_url: '/assets/tinymce/langs/vi_VN.js',
			plugins: "autosave autolink code codesample colorpicker emoticons fullscreen hr image imagetools media preview table textcolor wordcount",
			toolbar: "imageupload forecolor cut copy paste fontselect styleselect bold italic bold link preview code image",
			setup: editor => {
				this.editor = editor;
				editor.on('keyup', () => {
					const content = editor.getContent();
					this.onEditorKeyup.emit(content);
				});
				editor.on('init', () => {
					if (this.content) {
						editor.setContent(this.content);
					}
				});
			},

		});

	}

	ngOnDestroy() {
		tinymce.remove(this.editor);
	}

}
