class ImagurController {
  constructor() {

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

                }
            }
        });

  }

   verificaImagem(url) {
      $.ajax({
          url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=13716f028397a98e84d3ce2c39e672c5e021845e &url='+url+'&classifier_ids=PESSOAS_1462124818&version=2016-05-20',
          type: 'get',
          dataType: 'json',
          success: function(response) {
            console.log(response);
          }
      });
    }

  init() {
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

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

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
      context.drawImage(video, 0, 0, 640, 480);
    });
  }
}
