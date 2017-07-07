class FirmaController {
  constructor() {

  }

  addFirma(data) {

    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
      $this.container.innerHTML = this.responseText;
    };
    oReq.open("post", "/add", true);
    oReq.send(data);

  }
}
