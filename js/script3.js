var videos = [
  {'id': '7uxF9CsxW88', 'start':18.5, 'end' : 28.5},
  {'id': 'EVIe4cPTL3o', 'start':18.5, 'end' : 28.5},
  {'id': 'VYnAUHCU6zk', 'start':18.5, 'end' : 28.5},
  {'id': 'HBp43hgKG5M', 'start':18.5, 'end' : 28.5},
  {'id': 'o50ZkoKx09c', 'start':18.5, 'end' : 28.5},
  {'id': '7uxF9CsxW88', 'start':18.5, 'end' : 28.5},
  {'id': 'EVIe4cPTL3o', 'start':18.5, 'end' : 28.5},
  {'id': 'VYnAUHCU6zk', 'start':18.5, 'end' : 28.5},
  {'id': 'HBp43hgKG5M', 'start':18.5, 'end' : 28.5},
  {'id': 'o50ZkoKx09c', 'start':18.5, 'end' : 28.5},
  {'id': '7uxF9CsxW88', 'start':18.5, 'end' : 28.5},
  {'id': 'EVIe4cPTL3o', 'start':18.5, 'end' : 28.5},
  {'id': 'VYnAUHCU6zk', 'start':18.5, 'end' : 28.5},
  {'id': 'HBp43hgKG5M', 'start':18.5, 'end' : 28.5},
  {'id': 'DRS_PpOrUZ4', 'start':18.5, 'end' : 28.5},
  {'id': 'DRS_PpOrUZ4', 'start':18.5, 'end' : 28.5},
  {'id': 'DRS_PpOrUZ4', 'start':18.5, 'end' : 28.5},
  {'id': 'DRS_PpOrUZ4', 'start':18.5, 'end' : 28.5}
];
var random_list = [];
var main_player, sub_players = [];
var columns;
var w = 168;
var h = 94;
var i_padding = 5;
var body_padding = 15 + 8;
var currentIndex;
var player_state = new Array(videos.length);
// Responsive
function responsive() {
  var width = $('#main_player').width();
  var height = width * 0.5625; // 16:9
  $('#main_player').height(width * 0.5625);

  var window_width = $(window).width() - body_padding * 2;
  columns = Math.floor(window_width / (w + i_padding * 2));
  if (columns > 5) columns = 5;
  $('#video_lists').css('max-width', (w + i_padding * 2) * columns + 'px');
}
$(document).ready(function () {
  responsive();
});
$(window).resize(function () {
  responsive();
});

function shuffle(arra1) {
  var ctr = arra1.length, temp, index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}
function make_video_lists() {
  var html_string = '';
  var cnt = 0;
  for (var i = 0; i < videos.length; i++) {
    html_string += '<div class="item" index="' + i + '"><div id="video-' + i + '" class="video_item">';
    html_string += '</div></div>';
  }
  $('#video_lists').html(html_string);
  $('.item').css('margin', i_padding + 'px');
}
function onYouTubeIframeAPIReady() {
  // main_player = new YT.Player('main_player', {
  //   height: '640',
  //   width: '1024',
  //   videoId: videos[index].id
  // });
  var index = Math.floor(Math.random() * videos.length);
  make_video_lists();
  random_list = shuffle(videos);
  for (var i = 0; i < random_list.length; i++) {
    sub_players[i] = new YT.Player('video-' + i, {
      height: h,
      width: w,
      videoId: random_list[i].id,
      playerVars: { 'controls' : 0 }
    });
  }
  active();
}
function active() {
  $('.item').mouseover(function () {
    index = $(this).attr('index');
    sub_players[index].loadVideoById({'videoId': random_list[index].id,
               'startSeconds': random_list[index].start,
               'endSeconds': random_list[index].end,
               'suggestedQuality': 'large'});
  });
  $('.item').mouseout(function () {
    index = $(this).attr('index');
      sub_players[index].stopVideo();
  });
  $('.item').click(function () {
    console.log('aa');
  });
}