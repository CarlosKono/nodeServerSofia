class RenderController {
  constructor(container) {
    this.container = container;


  }

  getView(url, func) {

    var spinner = new Spinner().spin();
    var target = document.getElementsByTagName("BODY")[0];
    target.appendChild(spinner.el);

    var $this = this;

    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
      $this.container.innerHTML = this.responseText;

      setTimeout(function() {func(spinner)}, 3000);

    };
    oReq.open("get", url, true);
    oReq.send();

  }

}
