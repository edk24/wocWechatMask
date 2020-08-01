/**
 * 卧槽微信浏览器遮罩
 *
 * @author 余小波
 * @date 2020/08/01
 */

var wocDevice = {
  isAndroid: (function () {
    var u = navigator.userAgent;
    return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // 安卓
  })(),
  isIOS: (function () {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
  })(),
  isWechat: (function () {
    var u = navigator.userAgent.toLowerCase();
    return u.match(/MicroMessenger/i) == "micromessenger";
  })(),
  isQQ: (function () {
    var u = navigator.userAgent.toLowerCase();
    return u.match(/\sQQ/i) == " qq";
  })(),
  isLinux: (function () {
    var u = navigator.userAgent;
    return u.indexOf("Linux") > -1;
  })(),
};

var wocMask = function () {
  if (wocDevice.isWechat) {
    document.body.innerHTML =
      document.body.innerHTML +
      '<div onclick="this.parentNode.removeChild(this)" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;background: #000;filter: alpha(opacity=60);z-index: 1000;opacity: 0.6;">' +
      '<img style="position: fixed;right: 28px;top: 10px;"' +
      'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGG0lEQVR4XuWbe8hlVRnGf4/ibbxU2nhFI8MMdUrzQt7vmpZoXnDEmkgtEtECyRv+oeDAKKmgmDdGRDFRUyotS1HLURCdLo6ZlZpWWFomaVSOMj7y4PrgeOZ839l7n31O853zwvfPt9dea73PXuu9PO97xASI7Z0BSVrara7GXX/bGwFPAqdKunuiALC9GvAAsB/wFUk3ThoAC4HzitLfkvTtiQHA9iHATzsUXiTp3IkAwPZHgF8DH+xQ+HpJXxt7AGyvBTwOfLJL2bskHTMJANwMfLGHd/u5pBjD98lYuUHbOeLXTuPan5a0w9gCYHtT4HlgzjQAvCxps7EFIIrZ/jBwAvAlYNcuZS0pccH4XoEpzWxvCLwKXABsDXwB2CB/kv7dicBY2YAOAGILFgFzJa2wvQZwMLBkUgBIAPSSpJP65TpjdwLK8X8FOELSTyYRgPOBM4BNJb0zUQCU7O9PwC2SzumnfJ6P1RWwfTzwXWBLSX+dRABCfDwjaX4V5cfqBNhOnP8QsIukX4wcANsfBT4NbAP8C/hHXBGwTNJ/q26o6TjbTwBvSDqwzhwD2wDb2wM3BHngMeBtYF1gC2CTsplngKuAayS5zgarjLX9OeAe4FBJ91V5Z2pMYwCKxQ3DErdzO7BQ0h86Fy+5+WeAzwLfBH4DfF5S/HQrUvYRgBP4HFB30kEA+AGwJ7CPpN/2W9j2lsD3gHWA3SX9p987VZ7b/jrwnSQ/de7+QCfA9tlA/Oz+kkI9VRLboageAX4paUGll2YYVFLgZ4HFknLCakvtE2A7RzpK7Cvp0bor2s51+BGwraTn6r7fdcVy7+cBn5D0vyZzNQEgRma5pCOaLJh3bP8duKQXTV11zsL+XF2uUzjARlILANvrxdUAR0n6YaMV3wPgFmDtXiRllTlth9pKmesiSRdVeWe6MXUBOAyI4utLerPpwrYvBg6RtFPdOUq2F7vzK0lH1n2/e3xdAL4BnClpq0EWth2yIu5wJZJypnltfwh4sIzZo+m971yjLgAnx+9LStTXWGxfCUSBVG0rSfnyDxfSMy7vn5Ve7DOoLgDh1uLL50ha3nQDtuMF3pKU+fpKUf5nQLi+xBB/6ftSxQF1AYgf/xtwiqQYskZi+wXgVklThctp5ylMb479B0rQlXy/NakFQFYtFjxJz/ZVGJfundrevCRJx0i6q8+dj9G9CXi9xB1JrlqVJgDEAC5L/N+r2Nhvd7ZTtkqdfkNJcakrie2NgcuAE4F7geO72dx+61R9XhuAcgoOAhIQ3QksqGONbceNrtsrbS3H/VQgofbqxeBeWlWZJuMaAVBASP09diB5/wmSwsbMKLZzjxMFni7pujJP9rA/EAr7OGDNUtf/apvGbrqNNQagbD75/mLg8HIiLpV0/3SL2T4dyBedGxtS3ktSlEwxDG4yzMslLekHZlvPBwJgahMlNA0VnZpc3OPvgd8BL8Zudmw29z8FyhWJJsv/nwLuKEzuH9tSrOo8rQDQAcTahRnaA0jWGL89JanR5Ut/P8QlEA7h8W4SperG2xrXKgAzHP1UZZO3L5UU6nqVkVEBcEppXJhXhT0aJTpDB8B2DF6+/nWSzhqlclXWGgUAKVBuB3x8kBS6ijJNxgwVANvxCgllQ6DExa1yMjQACgv8dOIDSceucpqXDQ0FgNKRkfQ1ecN2w4rj2wB1WAAkRD4a2KsJV9+GYlXnaB0A26kWpUk5lNePq27k/zWuVQBsJ5m5DThrEMp7lGC0BoDtfUpv/p116vOjVLbXWq0AYPtTaUErMX5qhY35wlEDMjAAtpPkpDKTPD9G77VRKzHIegMBUJoi0pWRlHc3SSFHZpU0BsB2OkFSJA2vd8Ao2JthINsIANspaYX5+XNaUNsqUgxDwX5z1gbA9r5Afn6W4mS6MVtpdOi30WE9rwWA7RCX1xRW50RJ6Qea1VIJgNKHcwVwWlrQJV04q7Xu2HxfAEpPQOqBewPze/36cjaDMSMAtj9W2lnSGHG4pFSExkqmBcD2jqVAEfb22Nls6Wf6Yj0BsB2OPz8zTftJ2lD6tp3P1mOxEgCluTEl8C+P233v9ZHeBTlhCV903A4qAAAAAElFTkSuQmCC"' +
      'alt="">' +
      '<div style="text-align: center;margin-top: 25%; color:#fff;font-weight: 600;">微信用户请在右上角选择"在浏览器打开"</div></div>';
  }
  return wocDevice.isWechat;
};
