function solution(number){
    if(number < 2) return 0
    var s = 0 
    for(let i = 3 ; i <= number ; i++ ){
      if( ( i/3 == 0 ) || ( i/5 == 0 ) )
        s+=i
    }
    return s
  }