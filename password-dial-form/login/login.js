let yourKey;
  let inputNum = new Array();
  let firstKey = "123456";

  $(document).ready(()=>{
    // 간편 로그인 :: 실패 횟수 조회
    // 간편 로그인 :: 폼 설정
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
      if(inputNum.length >= 6)
      {
        checkResult()
      }
    })

    $(document).on('click', '.del', ()=>{
      inputNum.pop()
      handleDotActive('del')
    })

    $(document).on('click', '.logout', ()=>{
    })

    // 간편 로그인 :: 비밀번호 분실 시 PASS인증 팝업
    $(document).on('click', '.lostKey', ()=>{
    })
  })

  // 간편 로그인 :: 성공 시 처리
  function checkResult(){
    yourKey = inputNum.join('');
    firstKey == yourKey ? alert('비밀번호 일치') : alert('비밀번호 불일치');
    handleDotActive()
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
    $('.numberSection').append(`<button class='number init'>재배열</button>`)
    $('.numberSection').append(`<button class='number key'>${arr[arr.length-1]}</button>`)
    $('.numberSection').append(`<button class='number del'>←</button>`)
  }