(function($) {

  let $results = $('#results');
  let $loading = $('#loading');
  let $textarea = $results.find('textarea');

  $('form').on('submit', (e) => {
    e.preventDefault();

    let taskGraphId = $('#taskGraphId').val();

    $results.hide();
    $loading.show();

    $.ajax({
      url: `/tasks/${taskGraphId}/task-states`,
      method: 'GET'
    })
    .then((data) => {
      $loading.hide();
      $textarea.val(JSON.stringify(data, null, 2));
      $results.show();
    });

  });

})(jQuery);