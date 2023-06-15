  let yourKey;
  let inputNum = new Array();
  let firstKey = "";

  $(document).ready(()=>{
    for (let i = 0; i < 6 ; i++) {
      $('.pwSection').append("<span class='dot'></span>")
    }
    padInit()
    $(document).on('click', ".init", ()=>{
      padInit()
    })
    $(document).on('click', '.key', (event)=>{
      inputNum.push(event.target.innerHTML)
      handleDotActive('add')
      if(inputNum.length == 6)
      {
        checkResult()
      }
    })
    $(document).on('click', '.del', ()=>{
      inputNum.pop()
      handleDotActive('del')
    })
  })

  // 간편인증 체크 / 설정
  function checkResult(type){
    yourKey = inputNum.join('');
    handleDotActive()

    // 간편 로그인 설정
    if(firstKey == ""){
      firstKey = yourKey;
      $('.setKey span').text(`간편 비밀번호 재설정`)
      $('.setKey h5').text(`간편 비밀번호 6자리를 다시 입력해주세요`)
      padInit()
    }
    else if(firstKey == yourKey)
    {
    $('.setKey h5').text(`간편 비밀번호가 설정되었습니다.`)
    setTimeout(()=>{
        $('.setKey h5').text(`간편 비밀번호 6자리를 입력해주세요`)
      }, 500);
      inputNum = new Array()
      yourKey = ""
      firstKey = ""
    }
    else
    {
      inputNum = new Array()
      yourKey = ""
      firstKey = ""
      $('.setKey span').text(`간편 비밀번호 설정`)
      $('.setKey h5').text(`입력하신 비밀번호가 맞지 않습니다.`)
      setTimeout(()=>{
        $('.setKey h5').text(`간편 비밀번호 6자리를 입력해주세요`)
      }, 500);
    }
  }

  // 간편 로그인 :: 현재 입력된 키 횟수 렌더링
  function handleDotActive(type){
    let dots = document.querySelectorAll('.dot')
    if(type == 'add'){
      dots.forEach((dot, i)=>{
        if(i === inputNum.length-1) dot.classList.add('active');
      })
    }
    else if(type == 'del'){
      dots.forEach((dot)=>{
        dot.classList.remove('active');
      })
      dots.forEach((dot, i)=>{
        if(i <= inputNum.length-1) dot.classList.add('active');
      })
    }
    else{
      dots.forEach((dot)=>{
        inputNum = new Array()
        dot.classList.remove('active');

      })
    }
  }

  // 간편 로그인 :: 키패드 재배열
  function padInit (){
    $('.numberSection').empty()
    let arr = new Array(10).fill().map((e,i)=>i).sort(()=>Math.random() - 0.5);
    for (let i = 0; i < 9; i++) {
      $('.numberSection').append(`<button class='number key'>${arr[i]}</button>`)
    }
    $('.numberSection').append(`<button class='number init'>재설정</button>`)
    $('.numberSection').append(`<button class='number key'>${arr[arr.length-1]}</button>`)
    $('.numberSection').append(`<button class='number del'>←</button>`)
  }