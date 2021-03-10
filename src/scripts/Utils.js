import parse from 'html-react-parser'

export default class Utils {
    static CKEditorTools = ['Bold', 'Italic', 'Underline', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Font', 'FontSize', 'TextColor', 'Link']
        /* static CKEditorTools = ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'TextColor', 'BGColor', 'Maximize', 'ShowBlocks', 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt', 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language', 'Link', 'Unlink', 'Anchor', 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] */
    static createHTML = str => parse(str)
    static removeSharp = str => str.replace(/'#'/)
    static checkEntry = (str = '', entry = '') => {
        if (str == null || entry === '') return
        console.log(str === null, entry, ';ljasdljdsljasdkljadsljdas;lasdlkdfs')
        return str.indexOf(entry) + 1 ? str : `${entry}${str}`
    }
    static checkSocialList = (obj) => {
        const view = false
        Object.keys(obj).forEach(el => el.checked ? view = true : null)
        return view
    }
    static translateMenuDiretion = num => num == 1 ? 'Горизонтальное' : 'Верикальное'
    static getCatalogIdFromUrl = () => window.location.href.split('?')[1].split('&')[1].split('=')[1]
    static threeGenerate(arr = []) {
        let a = arr => arr.filter(item => {
            item['childrenList'] = arr.filter(i => i.parent_id === item.id)
            return arr;
        })
        return a(arr).filter(u => u.parent_id == '0')
    }
}