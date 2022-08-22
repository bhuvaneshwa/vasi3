

    $ (document).ready(function(){
        getData()
        // var settings = {
        //     "url": "https://slim.vasishipping.com/SLIMRestService/api",
        //     "method": "POST",
        //     "timeout": 0,
        //     "headers": {
        //       "Content-Type": "application/json"
        //     },
        //     "data": JSON.stringify({
        //       "SP_ID": "106",
        //       "param": "KARTHIK"
        //     }),
        //   };
          
        //   $.ajax(settings).done(function (response) {
        //     console.log(response)
        //     var res=response.json()
        //     console.log(res[0])
        //   });
    });


    const getData = () => {
        const raw = '{"SP_ID": "106","param": "KARTHIK"}'
            const requestOptions ={
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: raw,
            };
            fetch('https://slim.vasishipping.com/SLIMRestService/api', requestOptions)
            .then(response => response.json())
            .then(results => {
                // console.log('*******************Response************************')
                if (results.ErrorCode === 0){
                    // console.log(results)
                    var table1= results.Data.Table
                    document.getElementById('table1').innerHTML = table1.map(InsertToDoc);


                }else{
                    alert('error code: ' + results.ErrorCode)
                }
                
            })
            .catch(error => console.log('error', error));
}

function InsertToDoc(data){



    console.log(data.VesselName);
    var row = '<td>'+data.VesselName+'</td>'+'<td>'+data.VesselFlag+'</td>'+'<td>'+data.NetTonnage+'</td>'+'<td>'+data.IMOCode+'</td>'+'<td>'+data.GrossTonnage+'</td>'+
    '<td'>+data.CallSign+'</td>'+'<td>'+data.BuiltYear+'</td>';
    console.log(row)
    return  row;
}