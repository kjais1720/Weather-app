function convertDate(unixTime){
    const timeStamp = unixTime*1000;
    
    let date = new Intl.DateTimeFormat('en-In', { 
      month: '2-digit',
      day: '2-digit'
    })
    .format(timeStamp);

    let day = new Date(timeStamp);
    day = String(day)
    day = day.slice(0,3);
    
    return(date+'/'+day);
}

function formatDate(date){
  const months = {
    '01':"Jan",
    '02':"Feb",
    '03':"Mar",
    '04':"Apr",
    '05':"May",
    '06':"Jun",
    '07':"Jul",
    '08':"Aug",
    '09':"Sep",
    '10':"Oct",
    '11':"Nov",
    '12':"Dec"
  }

  const dateSplit = date.split('/');
  let res = '';
  res = dateSplit[2] +", "+dateSplit[0]+' '+ months[dateSplit[1]];
  return res;
}

function parseDate(unixTime){
  let parsedDate = convertDate(unixTime);
  let formattedDate = formatDate(parsedDate);

  return formattedDate;
}

function windDir(deg){
  let degree = Number(deg);
    if(degree === 0)
      return "N";
    else if (degree>=0 && degree<90)
        return "NW";
    else if (degree===90)
        return "W";
    else if (degree>90 && degree<180)
        return "SW";
    else if (degree===180)
        return "S";
    else if (degree>180 && degree<270)
        return "SE";
    else if (degree===270)
        return "E";
    else if (degree>270 && degree<360)
        return "NE";
    else if (degree===360)
          return "N";
}


export {parseDate, convertDate, formatDate, windDir};