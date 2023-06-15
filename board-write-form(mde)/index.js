var simplemde = new SimpleMDE({
    element: $("#contents")[0],
    toolbar: [
        {
			name: "bold",
			action: SimpleMDE.toggleBold,
			className: "fa fa-bold",
			title: "Bold",
		},
        {
			name: "italic",
			action: SimpleMDE.toggleItalic,
			className: "fa fa-italic",
			title: "Italic",
		},
        {
			name: "strikethrough",
			action: SimpleMDE.toggleStrikethrough,
			className: "fa fa-strikethrough",
			title: "Strikethrough",
		},
        "|",
        {
			name: "heading",
			action: SimpleMDE.toggleHeadingSmaller,
			className: "fa fa-header",
			title: "Heading",
		},
        {
			name: "heading-smaller",
			action: SimpleMDE.toggleHeadingSmaller,
			className: "fa fa-header",
			title: "Smaller Heading",
		},
        {
			name: "heading-bigger",
			action: SimpleMDE.toggleHeadingBigger,
			className: "fa fa-lg fa-header",
			title: "Bigger Heading",
		},
        "|",
        {
			name: "heading-1",
			action: SimpleMDE.toggleHeading1,
			className: "fa fa-header fa-header-x fa-header-1",
			title: "Big Heading",
		},
        {
			name: "heading-2",
			action: SimpleMDE.toggleHeading2,
			className: "fa fa-header fa-header-x fa-header-2",
			title: "Medium Heading",
		},
        {
			name: "heading-3",
			action: SimpleMDE.toggleHeading3,
			className: "fa fa-header fa-header-x fa-header-3",
			title: "Small Heading",
		},
        "|",
        {
			name: "code",
			action: SimpleMDE.toggleCodeBlock,
			className: "fa fa-code",
			title: "Code",
		},
        {
			name: "quote",
			action: SimpleMDE.toggleBlockquote,
			className: "fa fa-quote-left",
			title: "Quote",
		},
        "|",
        {
			name: "unordered-list",
			action: SimpleMDE.toggleUnorderedList,
			className: "fa fa-list-ul",
			title: "Generic List",
		},
        {
			name: "ordered-list",
			action: SimpleMDE.toggleOrderedList,
			className: "fa fa-list-ol",
			title: "Numbered List",
		},
        "|",
        {
			name: "clean-block",
			action: SimpleMDE.drawLink,
			className: "fa fa-link",
			title: "Create Link",
		},
        {
			name: "link",
			action: SimpleMDE.toggleOrderedList,
			className: "fa fa-list-ol",
			title: "Numbered List",
		},
        {
			name: "image",
			action: SimpleMDE.drawImage,
			className: "fa fa-picture-o",
			title: "Insert Image",
		},
        {
			name: "table",
			action: SimpleMDE.drawTable,
			className: "fa fa-table",
			title: "Insert Table",
		},
        {
			name: "horizontal-rule",
			action: SimpleMDE.drawHorizontalRule,
			className: "fa fa-minus",
			title: "Insert Horizontal Line",
		},
        "|",
        {
			name: "preview",
			action: SimpleMDE.togglePreview,
			className: "fa fa-eye no-disable",
			title: "Toggle Preview",
		},
        {
			name: "guide",
			action: "https://simplemde.com/markdown-guide",
			className: "fa fa-question-circle",
			title: "Markdown Guide",
		},
		{
			name: "custom",
			action: function customFunction(editor){
				// Add your own code
                console.log(editor)
			},
			className: "fa fa-star",
			title: "Custom Button",
		},
    ],
});

// 이미지 드래그 드랍 업로드 + 링크 추가
simplemde.codemirror.on('dragover', (e,ev)=>{
	ev.preventDefault();
})
simplemde.codemirror.on('drop', (e, ev)=>{
	ev.preventDefault();

	let files = ev.dataTransfer?.items ?? ev.dataTransfer?.files;
	let data = new FormData();
	data.append('file', files[0].getAsFile());
	$('#upload')[0].ajax({
		processData: false,
		contentType: false,
		data: data,
		success: res=>{
			toast.show('업로드', res.msg);

			if( res.path )
			{
				simplemde.codemirror.setSelection(simplemde.codemirror.getCursor());
				simplemde.codemirror.replaceSelection(`<img style="width=100% src="${res.path}"/>`);
			}
		}
	})

})

$(document).ready(function(){
    // 삭제
    $('#remove').click(function(){

        let idx = $('form.apply [name=idx]').clone();
        if ( idx.val().length == 0 )
            return;

        $('form.remove').empty().append(idx)[0].ajax({
            success: function(data){
                toast.show('결과',data.msg);
            },
        });
    });

    // 적용
    $('#apply').click(function(e){
        let a = $('[name=category]').val()
        if(a == "")
        {
            alert('카테고리를 선택해주세요!')
            $('select').focus();
        }
        else
        $('form.apply')[0].submit()
    });

    $('select').change((e)=>{
        $('[name=category]').val($(this).find(':selected').val());
    })
});