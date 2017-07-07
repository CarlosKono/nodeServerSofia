var spinner = new Spinner().spin();
(function () {

  var container;
  container = document.getElementById("container");

  var Render = new RenderController(container);
  var Reconhecer = new ReconhecerController();


  function addEvents() {

    var cadastrarBTN = document.getElementById("cadastrarBTN");
    cadastrarBTN.addEventListener("click", function(event) {

      event.preventDefault();

      Render.getView("/cadastrar");
    });

    var reconhecerBTN = document.getElementById("reconhecerBTN");
    reconhecerBTN.addEventListener("click", function(event) {

      event.preventDefault();

      Render.getView("/reconhecer",function() {

        Reconhecer.init();
        spinner.stop();
      });

    });


  }

  try {

    addEvents();

  } catch (e) {

    console.error(e);
  }

})();
