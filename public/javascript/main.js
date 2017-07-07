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



function enviaImgur(){

  try {
      var img = document.getElementById('canvas').toDataURL('image/jpeg', 0.9).split(',')[1];
  } catch(e) {
      var img = document.getElementById('canvas').toDataURL().split(',')[1];
  }

  $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'post',
      headers: {
          Authorization: 'Client-ID 2dee90509667881'
      },
      data: {
          image: img
      },
      dataType: 'json',
      success: function(response) {
          if(response.success) {
              verificaImagem(response.data.link);

          }
      }
  });
}
function verificaImagem(url){
  $.ajax({
      url:  'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=91f2fe550c3c756c2725dde47b62497f92bc6a30&url='+url+'&classifier_ids=PESSOAS_93107418&version=2016-05-20',
      type: 'get',
      dataType: 'json',
      success: function(response) {
        console.log(response);
      }
  });
}

function carregaVideo(){
  console.log("a");
  if(document.getElementById('video') != null){
    var video = document.getElementById('video');
    // Grab elements, create settings, etc.

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
      context.drawImage(video, 0, 0, 640, 480);
    });

  }

}
