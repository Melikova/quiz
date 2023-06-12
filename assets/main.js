$('#main').html(`<div id="question">${data.quiz[0].question}</div><div id="answers">${generate_answers(data.quiz[0].answers)}</div>`);
$('button').attr("disabled", true);
let wrong_answer=[];
let wrong_answers=[];
let answer_id;
choose_answer();


const gen = content_maker();

$('.next').on('click', function(){
  $('button').attr("disabled", true);
  $('#main').html(gen.next().value);
  $(this).removeClass('selected');
  choose_answer();
  $('.restart').on('click', function(){
    location.reload(true);
  })
  
})

function choose_answer(){
  $('#answers div').each(function(){
    $(this).on('click', function(){
      $('button').attr("disabled", false);
      $('#answers div').each(function(){
        $(this).removeClass('selected')
      });
      $(this).addClass('selected');
      $('.next').addClass('selected');
      answer_id = $(this).data('id');
      if(answer_id !=='a'){
        wrong_answer=[$(this).parent().prev().text(), $(this).children()[1].outerText];
      }else{
        wrong_answer=[];
      }
    })
  })
  wrong_answers.push(wrong_answer);
}

function* content_maker() {
  let main_content;
  for(let i=1; i<data.quiz.length; i++){
    main_content=`<div id="question">${data.quiz[i].question}</div><div id="answers">${generate_answers(data.quiz[i].answers)}</div>`;
    yield main_content;
  }
  const filteredArray = wrong_answers.filter( item => item.length !== 0);
  let result='';
  filteredArray.forEach(val=>{
    result+= `<li class="list-group-item d-flex justify-content-between align-items-start mt-3">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${val[0]}</div>
        Your wrong answer: ${val[1]}
      </div>
    </li>`;
  })
  main_content=`<div> 
    Total: 10 questions; 
    Right answers: ${wrong_answers.length - filteredArray.length}; 
    Wrong answers: ${filteredArray.length};
    <ol class="list-group list-group-numbered">${result}</ol>
  </div>`;
  $('.next').text('RESTART');
  $('.next').addClass('restart');
  $('button').attr("disabled", false);
  yield main_content;
}

function generate_answers(object_data){
  const index_array=['a', 'b', 'c', 'd'];
  const array= Object.entries(object_data);
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  let answers='';
  shuffledArray.forEach((val, key)=>{
    answers+=`<div data-id="${val[0]}"><div class="index">${index_array[key].toUpperCase()}</div><span class="answer">${val[1]}</span></div>`;
  });
  return answers;
}

