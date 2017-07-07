class ReconhecerController {

  constructor() {

  }

  init() {

    let $this = this;
    // Elements for taking the snapshot
    var enviar = document.getElementById('enviar');
    enviar.addEventListener("click", function () {
      $this.enviaImgur();
    });

    var snap = document.getElementById('snap');


    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    var context = canvas.getContext('2d');
    var assinatura = document.getElementById("assinatura");


    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0,video.videoWidth,video.videoHeight);

      canvas.style.setProperty("display", "block");
      video.style.setProperty("display", "none");
      snap.style.setProperty("display", "none");
      assinatura.style.setProperty("display", "block");
      enviar.style.setProperty("display", "block");

    });
  }

  enviaImgur() {

    let $this = this;
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
                $this.verificaImagem(response.data.link);
                console.log(response.data.link);

            }
        }
    });

  }

  verificaImagemB64() {

    let $this = this;
                var img = document.getElementById('canvas').toDataURL();

    $.ajax({
        url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=13716f028397a98e84d3ce2c39e672c5e021845e&classifier_ids=pessoas_1190748711&version=2016-05-20',
        type: 'post',
        data: {
            // api_key: "13716f028397a98e84d3ce2c39e672c5e021845e",
            // version: "2016-05-20",
            imgFile: img
            // parameters:{
            //    "classifier_ids":[
            //       "pessoas_1190748711"
            //    ],
            //    "threshold":0.6
            // }
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                $this.verificaImagem(response.data.link);

            }
        }
    });

  }

  verificaImagem(url) {

    let $this = this;

    $.ajax({
        // leone
        // url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=91f2fe550c3c756c2725dde47b62497f92bc6a30&url='+url+'&classifier_ids=PESSOAS_93107418&version=2016-05-20',
        url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=13716f028397a98e84d3ce2c39e672c5e021845e&url='+url+'&classifier_ids=pessoas_1190748711&version=2016-05-20&threshold=0.7',
        type: 'get',
        dataType: 'json',
        success: function(response) {
            $("#resultado").html(JSON.stringify(response));
            //  OBS PODE FAZER LOOP PARA TRAZER TODOS PROXIMOS. DEIXO COM VCS

            var pessoa = {};
            pessoa.id = 4;

            var images = response;
            window.pessoa = response;
  
            $this.buscaDocumentoCloudant('pessoas', pessoa);
        }
    });
  }

  buscaDocumentoCloudant(colecao,id){
    $.ajax({
        url: 'https://3cd45863-ca49-434b-94ec-227ea6fd71d5-bluemix.cloudant.com/'+colecao+'/'+id,
        type: 'get',
        headers: {
            "Authorization": "Basic " + btoa("3cd45863-ca49-434b-94ec-227ea6fd71d5-bluemix" + ":" + "6e748c380babc520ac3e46f106dd6e4b5fd971bf918294b1f94fa3cca4c61b4f")
          },
        dataType: 'json',
        success: function(response) {
            $("#resultado").html(JSON.stringify(response));
            $("#resul_cpf").html(response.cpf);
            $("#resul_nome").html(response.nome);
            $("#result_assinatura").attr("src",response.assinaturas[0].assinatura);

          console.log(response);
        }
    });


  }



}
