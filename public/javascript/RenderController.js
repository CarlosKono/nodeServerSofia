class RenderController {
  constructor(container) {
    this.container = container;
  }

  getView(url) {

    var $this = this;

    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
      $this.container.innerHTML = this.responseText;
    };
    oReq.open("get", url, true);
    oReq.send();

  }

}
