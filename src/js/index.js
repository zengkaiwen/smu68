var _avatarBg = null;  // 用户选的头像
var _avatarFn = null;  // 用户选的头像框
var _avatarBase64 = null;  // 拼接生成的图片base64编码
var _bgElem = document.getElementById('bgImg');
var _fnElem = document.getElementById('fnImg');

var _index = 0;  // 用户选的头像框的序号
var _canvas = document.getElementById('toolCanvas');
var _context = _canvas.getContext('2d');

// 裁剪框需要的image
var _tempImgEle = document.getElementById('tempImg');
var _cropper;  // 全局cropper对象

// 点击保存
$('#saveBtn').on('click', function () {
    if ( !_avatarBg ){
        alert('请先上传头像');
        return;
    }
    if ( !_avatarFn ){
        alert('请选择一个像框');
        return;
    }
    $('#saveBtn').text("生成中...");
    composeImage();
});

// 用户选择图片
function changepic(){
    var reads= new FileReader();
    var target = document.getElementById('file');
    var f = target.files[0];
    reads.readAsDataURL(f);
    reads.onload = function (e) {
        target.value = '';   //清空input的value，防止两次不能选择同一张图片
        _avatarBg = this.result;
        $('#loading').toggle();
        clipImg(_avatarBg);  // 裁剪图片
    };
}

// 裁剪图片
function clipImg(imgData){
    _tempImgEle.src =  imgData;
    _tempImgEle.onload = function(){
        _cropper = new Cropper(_tempImgEle, {
            aspectRatio: 1,
            viewMode:0,
            dragMode: 'move',
            minContainerHeight: document.documentElement.clientHeight,
            ready: function (e) {
                // $('#clip_btn').show();  // 显示裁剪按钮
                $('#loading').toggle();
                _fnElem.src = _avatarFn;
            }
        });
    }
}

// 裁剪按钮点击的响应事件
function handleClip(e){
    console.dir(e);
    console.log('点击裁剪');
    e.innerText = "裁剪中...";
    _avatarBg = _cropper.getCroppedCanvas().toDataURL();  // 获取截取的图片内容
    _bgElem.src = _avatarBg;
    _bgElem.onload = function(){
        e.innerText = '裁剪';
        _cropper.destroy();
    };
    $('#saveBtn').text("点我生成你的专属头像");
}
// 监听裁剪按钮点击事件
// $('#clip_btn').on('click', function () {
//     console.log('点击裁剪');
//     console.log($(this));
//     $(this).text('裁剪中...');
//     _avatarBg = _cropper.getCroppedCanvas().toDataURL();  // 获取截取的图片内容
//     _bgElem.src = _avatarBg;
//     _bgElem.onload = function(){
//         $('#clip_btn').text('裁剪');
//     };
//     $('#saveBtn').text("点我生成你的专属头像");
//     _cropper.destroy();
// });

// 监听头像框图片素材点击事件
$('.avatar_border_box img').on('click', function () {
    $(this).addClass('active');
    var index = $('.avatar_border_box img').index(this);
    if( index !== _index ){
        $('.avatar_border_box img').eq(_index).removeClass('active');
    }
    _index = index;
    _avatarFn = $(this).attr('src');
    $('#saveBtn').text("点我生成你的专属头像");
    _fnElem.src = _avatarFn;
});

// 拼合图片
function composeImage(){
    console.log('开始拼合图片');
    _context.clearRect(0,0,600,600);
    var img = new Image();
    img.src = _avatarBg;
    img.onload = function () {
        _context.drawImage(img, 0, 0, 600, 600);
        img.src = _avatarFn;
        img.onload = function () {
            _context.drawImage(img, 0, 0, 600, 600);
            _avatarBase64 = _canvas.toDataURL();
            _fnElem.src = _avatarBase64;
            $('#saveBtn').text("长按上图保存");
        }
    };

}

// 微信相关，清缓存
if ( !window.name ){
    var str = Math.random().toString(36).substr(2);
    window.location.href += '?v='+str;
    window.name = 'isreload';
}