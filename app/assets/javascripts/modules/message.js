$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main-chat__messages__messages-box" data-message-id=${message.id}>
          <div class="main-chat__messages__messages-box__messages-info">
            <div class="main-chat__messages__messages-box__messages-info__messages-info-name">
              ${message.user_name}
            </div>
            <div class="main-chat__messages__messages-box__messages-info__messages-info-date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="main-chat__messages__messages-box__messages-content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main-chat__messages__messages-box" data-message-id=${message.id}>
        <div class="main-chat__messages__messages-box__messages-info">
          <div class="main-chat__messages__messages-box__messages-info__messages-info-name">
            ${message.user_name}
          </div>
          <div class="main-chat__messages__messages-box__messages-info__messages-info-date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="main-chat__messages__messages-box__messages-content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.main-chat__form__new-messages').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__messages').append(html);      
      $('form')[0].reset();
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      $('.main-chat__form__new-messages__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  });
});