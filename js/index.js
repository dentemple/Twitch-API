const twitchEndpoint = "https://wind-bow.gomix.me/twitch-api";
const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function generateHTML(status, data) {
  const html = `

<article>
  <div class="row stream ${status ? 'online' : 'offline'}">
    <div class="col-xs-12 col-sm-2 text-center">
      <a href="${data.url}"><img src="${data.logo}" alt="Logo" class="logo img-responsive center-block"></a>
      <p>${status ? '<b>online</b>' : '<i>offline</i>'}</p>
    </div>
    <div class="col-xs-12 col-sm-10 text-center">
      <h2><a href="${data.url}">${data.display_name}</a></h2>
      <p><em>${data.status ? data.status : 'No status'}</em></p>
    </div>
  </div>
</article>

  `;
  return $(html);
}

function listChannel(status, name) {
  $.getJSON(twitchEndpoint + "/channels/" + name + "/", function(data) {
    if (data.status === 404) {
      $(".channels").append("<p>Twitch.tv returned a 404 response.</p>");
      return;
    }
    $(".channels").append(generateHTML(status, data));
  });
}

function updateList() {
  channels.forEach(function(channel) {
    $.getJSON(twitchEndpoint + "/streams/" + channel + "/", function(data) {
      // Not sure why it won't let me truthy test data.stream directly
      const status = (data.stream !== null && data.stream !== undefined);
      listChannel(status, channel);
    });
  });
}

$(document).ready(initializePage);
function initializePage() {
  updateList();
}