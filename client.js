const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

prevButton.addEventListener('click', function (e) {
    const videoId = document.getElementById('video-id');
    var data = {
        id: videoId.innerHTML
    }

    console.log(data);

    axios.post('/prev', data)
        .then(function (response) {
            videoIdChanger(JSON.parse(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

});

function videoIdChanger(e) {
    const vid=document.getElementById('video-id');
    vid.innerHTML=e.id;
    const video = document.getElementById('videoPlayer');
    const source = document.getElementById('videoPlayer');

    source.setAttribute('src', '/video/'+e.id);
    video.appendChild(source);
    video.play();

    // setTimeout(function () {
    //     video.pause();

    //     source.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Despicable%20Me%202.mp4');

    //     video.load();
    //     video.play();
    // }, 3000);


}


nextButton.addEventListener('click', function (e) {
    const videoId = document.getElementById('video-id');



    var data = {
        id: videoId.innerHTML
    }


    console.log(data);
    axios.post('/next', data)
        .then(function (response) {
            videoIdChanger(JSON.parse(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

});
