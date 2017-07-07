(function () {

  var container;
  container = document.getElementById("container");

  var Render = new RenderController(container);

  function addEvents() {

    var cadastrarBTN = document.getElementById("cadastrarBTN");
    cadastrarBTN.addEventListener("click", function(event) {

      event.preventDefault();

      Render.getView("/cadastrar");
    });

    var reconhecerBTN = document.getElementById("reconhecerBTN");
    reconhecerBTN.addEventListener("click", function(event) {

      event.preventDefault();

      Render.getView("/reconhecer");
    });

  }

  try {

    addEvents();

  } catch (e) {

    console.error(e);
  }

})();
